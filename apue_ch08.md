# APUE memo

## Chapter. 8 プロセスの制御

fork, exec 系, _exit, wait, waitpid をマスターすれば良い。
レースコンディションについても fork 関数で学べる

### fork

アドレス空間をコピーする
コピーオンライトで必要になったらコピーする

fork した後、親プロセスが終了したら、子プロセスの親は何に変わるか。

待つ親がいなく、終了していない子プロセスは何というか。

### vfork

親のアドレス空間を共有する
書き換えたらダメ

### exec 関数群

fork で exec するとシェルっぽいことができる。

* execlp/execvp
* execle/exeve
* execl/execv
* fexecve

exec 時オープンしている記述子をどうするかというフラグもある。

### exit

* main からの return は exit
* `exit` では標準入出力の後始末がある
* `_Exit`
`_exit` はシステムコール

### setuid/setgid

setuid でそのプロセスの実効ユーザIDを変えることができる。
スーパユーザ特権があるプロセスなら、3つのIDを変更することができる。
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjg3NTc4MTYwLC0xMDg1MjU0OTgyXX0=
-->