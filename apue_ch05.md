

# APUE Memo

## Chapter 5 Standard I/O Library

* 3章では I/O の操作にファイル記述子を使っていた
* 今回は stdio なので stream を使う
	* ASCII/多バイト文字か決める: オリエンテーション
		* 関数`freopen` (後述)
		* 関数`fwide`
```
#include <stdio.h>
#include <wchar.h>
int fwide(FILE *stream, int mode);
```

* `fopen` で `FILE *` を返す
* `FILE`  = stdio ライブラリでストリームを管理するための情報
	* ファイル記述子
	* ストリームバッファへのポインタ
	* バッファサイズ
	* バッファ内の文字数
	* エラーフラグ
* `FILE` については `man 3 stdio` をみるといい
	* `stdin`, `stdout`, `stderr` は `stdio.h` で定義済みということもわかる
> A stream is associated with an external file (which may be a physical device) by opening a file, which may involve creating a new file. Creating an 	existing file causes its former contents to be discarded. ...

## 5.4 バッファリング

* 標準入出力ライブラリでは `read` と `write` の呼び出しを減らしたい
* ついでにライブラリを使う側で、バッファリングを気にする必要はなくしたい
	* でも混乱しやすい

### 完全バッファリング

* バッファがいっぱいになったら、実際に入出力をする
* flush は標準入出力バッファを書き出すこと
* `fflush` で明示的にできる
* 使用するバッファはストリームへの入出力時に、ライブラリ関数が `malloc` する

### 行バッファリング

* 改行文字に出会ったら、実際に入出力をする
* バッファサイズは固定なので、行の途中でもバッファがいっぱいになったら、入出力が行われる
* カーネルからデータを要求する必要がある入力に要求する場合、すべての行バッファリングストリームをflushする
	* アンバッファドストリーム
	* 行バッファリング

### アンバッファド

* `fputs`
* 標準エラー出力

### 標準バッファリングの慣習

* 標準エラー出力はアンバッファド
* 端末が絡む標準入出力は行バッファリング
* そうでない場合は完全バッファリング
* ISO C での要求もあるよ

### バッファ方法の設定

* `setbuf` バッファリングのオン・オフ
* `setvbuf` バッファリングのモード変更/バッファ割当 
	* ストリームをオープンした後で、ストリーム操作をする前
* `stdio.h` に `BUFSIZ` を定義している
* バッファの自動割付をした場合は、`fflush` を呼ぶこと

## 5.5 オープン

* `fopen`
* `freopen`閉じて、開き直す
	* 用途: 既に開かれたストリームやstdin, stdout, stderr に対してファイルを割り当てる
* `fdopen` 記述子をストリームに割り当てる	
	* ネットワークソケット, パイプ用

### オープンのモード

* 読み込み/書き出し/追記
* `fdopen` は開かれている記述子に対する操作なので制約がある
	* 書き出しで開いても 0 まで切り詰めはできない
	* 追記で開いても、ファイルは新規作成されない
	* `man fdopen`
> The `fdopen()` function associates a stream with the exsisting file descriptor, `fd`. The `mode` of the stream (...) must be compatible with the mode of the file descriptor.
> The file position indicator of the new stream is set to that belonging to `fd`, and the error and end-of-file indicators are cleared.
> Modes "w" or "w+" do not cause transaction of the file.
> The file descriptor is not dup'ed, and will be closed when the stream created by `fdopen` is closed.  ...

### ファイルのクローズ

* ファイルのクローズ前
	* バッファ内にある出力データは flush, 入力データは破棄
	* ライブラリがストリームにバッファを自動割付した場合は、そのバッファを開放する
* `exit` を呼ぶか, `main` 関数から戻り、プロセスが正常終了する
	* `man 3 exit` によると
	> All open `stdio (3)` streams are flushed and closed.

## 5.6-5.8 文字出力

* 文字単位
* 行単位
* 直接入出力 direct I/O
	* いろいろな呼び方
	* これは ISO C の用語
	* 他にはバイナリ, オブジェクト単位, レコード志向, 構造志向などなど
* 書式付きもあるよ `printf` や `scanf`

### 入力 `getc`, `fgetc`, `getchar`

* `getc(stdin)` = `getchar()`
* `getc` はマクロで実装してもよい
* `fgetc` はマクロで実装してはいけない

* `getc` には副作用のある式は渡さない (マクロ展開で、複数回実行される)
* `fgetc` は関数であることが保証されるので、そのアドレスを他の関数に渡せる
* 呼び出しの時間を考えると、`getc` より `fgetc` のほうが時間がかかる（はず）

* エラー判定 `ferror(FILE *fp)`
* ファイル末尾判定 `feof(FILE *fp)`
* フラグのクリア `clearerr(FILE *fp)`

* 読み戻し関数 `ungetc(int c, FILE *fp)`
* ストリームバッファに戻す
* `EOF` は戻せないが、末尾に達したときに文字を戻すことができる。
* `ungetc` に成功すると、フラグはクリアされるから

### 出力 `putc`, `fputc`, `putchar`

* `putchar(c)` = `putc(c,stdout)`
* マクロで実装できるかどうか (入力関数と同様)

### 行単位の入出力

* `gets(char *buf)` はバッファオーバーフローを起こすので使わない
	* [Communications of the ACM vol.32, no.6, 1989](https://cacm.acm.org/magazines/1989/6)
	* fingerd というユーザ情報管理のプログラムで `gets` を使っていた
> This daemon program accepts connection from remote programs, reads a single line of input, and then sends back output matching the received request.
	* ワームはバッファオーバーフローを意図的に引き起こして、スタックフレームを書き換え、プログラムの振る舞いを変えた。

### 効率

* time で計ったけど、`getc`/`putc` は関数とマクロではあんまり大差なさそう
* システムコールはコストがかかる操作
* 実行バイナリの `main` 関数の text 領域のサイズ
	* `objdump -d` でみたけど、差はなかった。

* 読み込んだファイル `5717  34215 387669 /var/log/dpkg.log` 
* `/dev/null` に読み捨て

#### `echof.c`: 関数 ver

| real | user | system | 
|  .068 | .058 | .014 |
|  .057 | .049 | .014 |
|  .058 | .046 | .014 |
|  .065 | .053 | .020 |
|  .065 | .051 | .017 |
|  .058 | .047 | .016 |

#### `echo.c`: 関数かもしれない ver

| real | user | system |
|  .060 | .050 | .015 |
|  .062 | .052 | .014 |
|  .058 | .046 | .016 |
|  .055 | .042 | .018 |
|  .055 | .046 | .013 |
|  .056 | .047 | .012 |

#### `echol.c`: 行バッファ ver

| real | user | system |
| .017 | .003 | .019 |
| .012 | .003 | .013 |
| .019 | .008 | .017 |
| .017 | .004 | .017 |
| .018 | .005 | .018 |
| .015 | .006 | .014 |

#### `echosys.c`: read システムコール, バッファサイズ=1

| real | user | system |
| .724 | .081 | .647 |
| .742 | .092 | .654 |
| .715 | .085 | .632 |
| .721 | .094 | .631 |
| .750 | .084 | .670 |
| .709 | .094 | .618 |
| .743 | .094 | .652 |

## 5.9-5.10 バイナリ操作

* バイナリ配列の読み書き
	* floatの配列の第2要素から第5要素を書き出す
```
float data[10];
if ( fwrite(&data[2], sizeof(float), 4, fp) != 4 ) {
   // error handing...
}
``` 
* 構造体の読み書き
```
struct {
  short count;
  long total;
  char name[NAMESIZE]
} item;
if (fwrite(&item, sizeof(item), 1, fp) != 1) {
   // error handing...
}
```

#### 異なるシステム間で使いにくい

* 構造体のメンバのオフセットは、アラインメント条件が異なるためコンパイラやシステムによって異なることがある
* 複数バイトの整数値とfloat値を保存するバイナリ形式はマシンアーキテクチャによってことなる

chromeos 上で書き出した構造体を gcp のインスタンス上で読み込んでみる
`spit.c`, `slurp.c` を書いた。

## 5.11 書式付き入出力

* printf

## 5.12 FILE ストリームの定義

## 5.13 temp file

## 5.14 メモリストリーム

* 対応するファイルがないファイルストリーム
* バッファを割り当てて、ストリーム操作を行う
* 文字列作成
* ファイルではなく、メモリを使うので、一時ファイルの代わりに使える

## 5.15 欠点

* `fgets` と `fputs` ではデータは2回コピーされる
	* カーネルと標準入出力ライブラリのバッファの間
	* 標準入出力ライブラリのバッファとアプリ側の行バッファ
* AT & T Fast I/O ライブラリ `fio`
	* grep が 3倍
* Korn and Vo 1991 sfio
	* Wikipedia https://en.wikipedia.org/wiki/C_file_input/output
	* http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.51.6574
* Krieger, Stumm, and Unrau 1992 メモリマップとファイル `mmap`
	* Alloc Stream ~~Interface~~ Facility
	* https://ieeexplore.ieee.org/document/268889/
	* http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.28.9828&rep=rep1&type=pdf
* ポータブルなライブラリ
	* uClibc C ライブラリhttps://uclibc.org/
	* Newlibc C ライブラリ https://www.sourceware.org/newlib/libc.html
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MDAyMDAwNzgsNTYyNjA4MDEzLDEwNj
cyMzI5NjksLTEyNDc2NDYxOTAsNTc4NzM5NjMzLDEwODQwOTI4
NDcsMTc1MjQ2MTAyMywtOTg2MzUxOTgsLTc1OTc3ODA3LDEzMD
YxNDgwODMsODQ4NjYxNDc5LDIzMDIyMDc4MSw5NjI0ODYxNzUs
LTExMDQ0OTc1MzQsLTk0NjA0ODM4NSwxMjA3MjE0ODAyLC0xOD
E3NjQ1OTgyLDIxNDA3MTk2NTYsLTU2MDg5NzE0LC05NDg1Nzkx
MDNdfQ==
-->