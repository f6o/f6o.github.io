# APUE memo

* My notes on the book, Advanced Programming in the UNIX® Environment, Third Edition
* [Table of Contents](http://apuebook.com/toc3e.html)

## Chapter 2 UNIX Standardization and Imprementations

* Read

## Chapter 3 File I/O

* Do excercises.

## Chapter 4 Files and Directories

## sticky bit `S_ISVTX`
### 歴史
ファイルのtext部分 （=命令列）がメモリのスワップエリアに保存され、プログラムだと起動が早くなる。
スワップエリアに張り付くので sticky
### ディレクトリに対するsticky bit
スティッキービットが設定されているディレクトリでは、書き出し権限を持つユーザで、以下の条件のいずれかを満たすならディレクトリ内のファイルの削除・名前変更をできる
* ファイルの所有者
* ディレクトリの所有者
* スーパーユーザ
典型的な利用例としては `/tmp` などのテンポラリディレクトリ	

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
* TODO: スティッキービットの働き
* TODO: アンリンクするための条件
* リンクカウントが0になったときだけ、ファイルの内容が削除できる
* プロセスがファイルを開いている状態では、ファイルの内容を削除しない
1. ファイルをクローズすると、カーネルは対象のファイルを開いているプロセス数を数える
1. この個数が0になると、次にリンクカウントを検査する
1. そのカウントが0なら削除する

## Chapter 5 Standard I/O Library

* Read

## Chapter 6 System Data Files and Information

* Read
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0ODUwODY0MDAsLTcxMTYyNDQzNiw0Mj
YzOTgwNDcsMTcwOTMzMDIzLC01MzAzNTk0NzQsLTE2MTU1OTk0
NjMsLTIwMDAxMzc5NDQsLTk2Nzk3MzM1NiwtMTY4NDY3MjcxNy
wtMTk5NDUyNjIwMl19
-->