# Chapter 3 File I/O

## 3.10 ファイル共有 File Sharing

あとの節 3.12 などのための前提知識.

TODO: 別途まとめたが、ここにも図を入れておく.

* プロセステーブルエントリの中の記述子の定義
* ファイルテーブルエントリとvノード/iノードの関係

これらは古く, Ken Thompton 1978 Unix の初期からあるが,
Linux においては vノードはなく, 汎用iノードを使っている.

### Q. 2つのプロセスが独立してファイルを開いているとき、どういう図ができるか.

## 3.12 不可分（アトミック）操作

### 例1. ログファイルの追記

独立した複数のプロセスが同一ファイルへの追記をすることについて.

...

ファイル末尾へのシークと書き込みが, ほかのプロセスに対して不可分であること.
=> UNIX システムではファイルフラグ `O_APPEND` を指定してファイルオープンをすると保証される.
=> pread/pwrite 関数が定義されている.

### 例2. 既存のファイルのオープン

関数 `open` にフラグ `O_CREAT` と `O_EXCL` を両方指定した場合について.

#### Q. open と creat の間で別プロセスが当該ファイルを作成するとどうなるか.

1. open
2. 別プロセスが同じファイルを creat
3. 別プロセスが同じファイルに書き込み
4. creat

結果として, 3. の内容がなくなる

### 不可分操作 atomic operation とは

複数の手順からなる操作で, その操作を行う場合, すべての手順が実行されるか,
どの手順も実行されないかのどちらかが保証されている必要がある.

## 3.13 関数 sync/fsync/fdatasync

* UNIXシステムの従来の実装：遅延書き出し
* カーネル内のバッファキャッシュやページキャッシュを介してディスクIOを行っている

* sync: update というデーモンから定期的に呼び出される
* fsync: 単一のファイルに対してのみディスクの書き出しをする
* fdatasync: fdata とだいたいいっしょ。fsync はファイルの属性も同期するが, fdatasync はデータ部分のみ。

## 3.14 関数 fcntl

オープンしているファイルの記述子を指定し属性の変更する

### コマンド

* FDの複製: `F_DUPFD` or `F_DUPFD_CLOEXEC`
* 記述子フラグの取得と設定: `F_GETFD` or `F_SETFD`
* ステータスフラグの取得と設定: `F_GETFL` or `F_SETFL`
* 非同期入出力の所有者の取得と設定: `F_GETOWN` or `F_SETOWN`
* レコードロックの取得と設定 (これについてはまたあとで: 14.3)

* F_DUPFD/F_DUPFD_CLOEXEC
* F_GETFD/F_SETFD
* F_GETFL/F_SETFL
* F_GETOWN/F_SETOWN
`SIGIO` と `SIGURG` を受け取るプロセスやプロセスグループを取得する see 14.5.2

### 例

* ファイル記述子を指定し、その記述子に設定されているファイルフラグを表示する
  `~/bruce/reference/apue.3e/fileio/fileflags.c`
* ファイルステータスフラグを変更するライブラリ
  これを利用して `O_SYNC` や `fsync` などのディスク同期を利用した場合とそうでない場合について `time` をとる
  => Linux の遅延書き出しと同期書き出しには差がほとんどない
  `~/bruce/copy_with_sync.c`
* 非ブロックパイプに対して使う (パイプは記述子でしかないため)

## 3.15 関数 ioctl

* 記述子に対するIO操作のがらくたいれ
* デバイスドライバでは ioctl コマンドを定義できる
* `man ioctl_list` でコマンドの定数一覧が参照できる

### 例

* 磁気テープ操作 (個人では使わなそう...)
* サウンドデバイス `include/linux/soundcard.h`
* `man socket` の引用

> An fcntl(2) F_SETOWN operation can be used to specify a process or process group to receive a SIGURG signal when the out-of-band data arrives
> or SIGPIPE signal when a SOCK_STREAM connection breaks unexpectedly. This operation may also be used to set the process or process group that receives the I/O and asynchronous notification
> of I/O events via SIGIO. Using F_SETOWN is equivalent to an ioctl(2) call with the FIOSETOWN or SIOCSPGRP argument.

## 3.16 /dev/fd

* /dev/fd/0 などオープンされた記述子に対応するファイルがある
* 記述子 n がオープンしてあるとき, ファイル /dev/fd/n を開くこと == 記述子 n を複製すること
* Tom Duff が開発し, Research UNIX System 8th Edition で導入 [Wikipedia](https://en.wikipedia.org/wiki/Research_Unix#Versions)
* /dev/fd は /proc/self/fd のシンボリックリンクなので, `open('/dev/fd/0')` で得られるファイル記述子のモードと
  /dev/fd/0 のファイル記述子のモードとは異る
 TODO: 実際に確認する
 Linux(Kernel 4.14.74-07727-g7815dfea1ba2, aarch64, Chrome OS 内のVM上) で確認
