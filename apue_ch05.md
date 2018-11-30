

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

## 5.xx いろいろ

* K&R も合わせて読むと良さそう
* `ungetch` とかの話もある

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
* Krieger, Stumm, and Unrau 1992 メモリマップとファイル `mmap`
	* Alloc Stream ~Interface~ Facility
	* https://ieeexplore.ieee.org/document/268889/authors
* ポータブルなライブラリ
	* uClibc C ライブラリhttps://uclibc.org/
	* Newlibc C ライブラリ https://www.sourceware.org/newlib/libc.html
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTYyNzE1NTE2OCwtMTgwMjg1NzY0MiwtOD
AwNTY0OTIsMTg5Nzc2MjM4MCw4NzYyMDkyNywxMjA3MjEyNDU5
XX0=
-->