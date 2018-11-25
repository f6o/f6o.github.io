

# APUE memo

* My notes on the book, Advanced Programming in the UNIX® Environment, Third Edition
* [Table of Contents](http://apuebook.com/toc3e.html)

## Chapter 2 UNIX Standardization and Imprementations

* Read

## Chapter 3 File I/O

* Do excercises.

## Chapter 4 Files and Directories

## ファイルの種類
* レギュラファイル
	* バイナリとテキストの区別はないけど、実行バイナリはカーネルが認識する必要があるので、形式に沿っている
	* ABI?
* ディレクトリファイル
	* ファイル名とファイル情報へのポインタ(=iノードへのポインタ)
* ブロック型特殊ファイル
	* ディスク装置用
	* 固定でbuffered, FreeBSDだと文字型特殊ファイルに移っている
* 文字型特殊ファイル
	* ディスク装置用
	* 可変でunbuffered
* FIFO
	* プロセス間通信
	* 名前付きパイプ (section 15.5)
* ソケット
* シンボリックリンク

## sticky bit `S_ISVTX`
### 歴史
ファイルのtext部分 （=命令列）がメモリのスワップエリアに保存され、プログラムだと起動が早くなる。
スワップエリアに張り付くので sticky
### ディレクトリに対するsticky bit
スティッキービットが設定されているディレクトリでは、書き出し権限を持つユーザで、以下の条件のいずれかを満たすならディレクトリ内のファイルの削除・名前変更をできる
* ファイルの所有者
* ディレクトリの所有者
* スーパーユーザ
典型的な利用例としては `/tmp` などのテンポラリディレクトリ.

* [A fast file system for UNIX](./fastfilesystemforunix) メモ

### hard links
* iノードはディレクトリからの被参照数を表すリンクカウントを持つ
* struct stat では st_nlink (基本システムデータ型 nlink_t)
* リンクカウントが0のときにファイルは削除できる
	* 「ファイルのアンリンク操作」 != 「ファイルに割り当てられたブロックの削除」

### symbolic links
* ファイルの実内容 = データブロックとしてシンボリックファイルが指すファイル名を格納する
* iノード内のファイル種類は S_IFLINK となる

### inodes
ファイルに関するすべての情報は iノードにあるので、ディレクトリエントリにはファイル名とiノード番号（ino_t 型）しかない。
* ファイル種類
* ファイルのアクセス許可ビット
* ファイルサイズ
* ファイルのデータブロックへのポインタ
* etc...

### ln がファイルシステムを跨げないのは inodes のため
ディレクトリエントリ内のiノードは同じファイルシステム内のiノードを指す

### ファイルシステムを変えずにファイル名を変える
* 既存のiノードを指す新たなディレクトリエントリを作成する
* 古いディレクトリエントリをアンリンクする
* リンクカウントは変わらない

### 動作確認

* `stat ./testdir` でファイルについて調べられる
* `stat -f ./testdir` でファイルシステムについて調べられる
* Chrostini 上(Linux penguin 4.14.74-07727-g7815dfea1ba2 #1 SMP PREEMPT Tue Oct 16 17:26:41 PDT 2018 aarch64 GNU/Linux)だとファイルシステムは`btrfs` でリンク数は1だった
* `link` 関数で貼ると 2 になった

#### btrfs
* Linux 向けのfile system
* Ohad Rodeh (IBM の研究者)の2007 USENIX
* Chris Mason (laster joining Oracle, ReiserFS for SUSE の人)
* [本家 Wiki](https://btrfs.wiki.kernel.org/index.php/Main_Page)
* ZSF をもとに [wikipedia](https://en.wikipedia.org/wiki/ZFS), [日本語](https://ja.wikipedia.org/wiki/ZFS)
* [wikipedia](https://en.wikipedia.org/wiki/Btrfs), [日本語](https://ja.wikipedia.org/wiki/Btrfs)

##### クローンニング cloning
ファイルシステム上でみると、ハードリンクだと同じファイルの別名、ということ。
btrfs での cloning はディスクブロックを共有する独立したファイルとなる
	inodesが複数あるということ?
	`cp --reflink` が使えるようになっている

> By cloning, the file system does not create a new link poiting to an existing inode; instead, it creates a new inode tha initially share the same disk blocks with the original file.

> The actual data blocks are not duplicated; at the same time, due to the copy-on-write nature of Btrfs, modifications to any of cloned files are not visible to the original files and vice versa.

### linkat
link は簡単なので、linkat について。
``
int linkat(int olddirfd, const char* oldpath, int newdirfd, const char* newpath, int flags);
``

#### `man 2 linkat`
> If the pathname given in `oldpath` is relative, then it is interpreted relative to the directory reffered to by the file descriptor, `olddirfd`  (rather than relative to the c.w.d. of the calling process, as is done by link() for a relative path name).
> 
> If `oldpath` is relative and `olddirfd` is special value `AT_FDCWD`, then `oldpath` is interpreted relative to the c.w.d. of the calling process.
> 
> If `oldpath` is absolute, then `olddirfd` is ignored.
> 
> The interpretation of `newpath` is as for `oldpath`, except that a relative pathname is interpreted relative to the directory referered to by the file descriptor `newdirfd`.

最後の部分は、newpath の解釈について、 `newdirfd` が参照するディレクトリに対して relative だというところ以外は `oldpath` と一緒。

### unlink もしくはファイル削除
* リンクカウントが0になったときだけ、ファイルの内容が削除できる
* プロセスがファイルを開いている状態では、ファイルの内容を削除しない
1. ファイルをクローズすると、カーネルは対象のファイルを開いているプロセス数を数える
2. この個数が0になると、次にリンクカウントを検査する
3. そのカウントが0なら削除する

### ファイルの時刻
|フィールド|意味|例|`ls (1)`のオプション|
|--|--|--|--|
|`st_atim`|データへの最終アクセス時刻|`read`|`-u`|
|`st_mtim`|データの最終修正時刻|`write`|デフォルト|
|`st_ctim`|iノード状態の変更時刻|`chmod`,`chown`|`-c`|

ファイルシステム上では、ファイルデータとiノードは別に管理しているので、iノードの変更時刻もトラックする必要がある。
また、iノードアクセス時刻は管理しない（また`access` や `stat` はどの時刻も変えない）。

#### ディレクトリエントリへの追加/変更
* ディレクトリはファイルとiノードの対応 = ディレクトリエントリを収めたファイル
* ディレクトリエントリへの追加・変更・削除は、そのディレクトリの a/c/mtime に影響がある。
	* ファイルの新規作成には、ディレクトリエントリの追加を必要とするので、時刻の更新がある
	* ファイルの読み書きでは、そのディレクトリにはなんの影響も与えない

#### 時刻の変更

```
#include <sys/stat.h>
int futimes(int fd, const struct timespec times[2]);
int utimensat(int dirfd, const char *path, const struct timespec times[2], int flags);

stuct timespec {
   time_t tv_sec;
   long   tv_nsec;
};
```

```
#include <sys/time.h>
int utimes(const char *pathname, const struct timeval times[2]);

struct timeval {
	long tv_sec;
	long tv_usec;
}
```
* どの関数も`times[0]`が最終アクセス時刻, `times[1]`が最終変更時刻
* `utimensat`関数はファイルパスを指定する
* `futimens`関数はファイルをオープンし、記述子を指定する
	* これらはPOSIX.1由来
* `utimes` 関数はファイルパスを指定する
	* iノードの状態変更時刻は ctime は、`utimes`を呼び出すと更新されるので、指定できない

#### メモ: 仕様について
　* Portable operating system interfaces, Stallman が IEEE に提案したもの
		* 異なるOSでもアプリケーションを移植性の高いものにするためのOSのAPI仕様
		* IEEE Std 1003.1
		* この本で説明されているのは POSIX.1 2008
　* Single UNIX Specification の XSIオプション
		* POSIX.1のスーパーセット
		* POSIX.1 のオプション: XSI (X/Open System Interface)
		* メッセージキュー, データベース, IPC, syslog など...?
		* UNIXシステムと呼ばれたいなら、XSI適合でなきゃいけない
		* 2008年に改定基本仕様イシュー7 == POSIX.1 2008
		* 2010年にX/Open curses を追加した SUSv4 が公開 (SUSv3 は2001年)

### 4.21 `mkdir`, `mkdirat`, `rmdir`

* 新規作成のときには, 実行フラグも忘れずに (演習4.16)

### 4.22 ディレクトリの読み取り

* ディレクトリを直接 `read` できないようになった
* ファイルシステムの実装依存のところが多い
* POSIX.1 に定義したAPIを使ってね

## Chapter 5 Standard I/O Library

* Read

## Chapter 6 System Data Files and Information

* Read
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5NjMyNDE0NywxNDM0OTY0MDEsLTE4Nz
gwOTM2NDEsLTEyNjIyMTg2NDgsLTM5ODkwNzU5MCwtMTI2MjIx
ODY0OCwyODM3NTE1NjQsMTkzNzIwMjc4Myw3NDk0MDU5NDYsLT
MyNDU5ODM4LDE5NTgxMDA2NjIsLTMyNzgxMjA0MiwtNzExNjI0
NDM2LDQyNjM5ODA0NywxNzA5MzMwMjMsLTUzMDM1OTQ3NCwtMT
YxNTU5OTQ2MywtMjAwMDEzNzk0NCwtOTY3OTczMzU2LC0xNjg0
NjcyNzE3XX0=
-->