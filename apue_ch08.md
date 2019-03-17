# APUE memo

## Chapter. 8 プロセスの制御

fork, exec 系, _exit, wait, waitpid をマスターすれば良い。
レースコンディションについても fork 関数で学べる

### プロセスID

* 一意のもの
* 再利用されるが、すぐにはされないようになっている
* プロセスごとのファイル名などに利用される

* PID=0 はプロセス・スケジューラ
	* カーネル内部のシステムプロセス
* PID=1 は `init` プロセス
	* カーネルがブート手続きの最後によぶ
	* 設定ファイル群を読み込む
	* マルチユーザモードなどに持っていく
	* システムによって`launchd`だったり`systemd`だったりする
	* `top` でみたら `systemd` という名前だけど、実行されているのは`/sbin/init`だったりする
		* `man init` は `systemd` だった

### getpid/getppid

### 実ユーザIDと実効ユーザ ID

`chmod u+s` と実行ファイルにセットユーザIDビットフラグを立てて、
実行すると、そのプロセスのEUIDにファイルのオーナーをセットする。

たとえば、`passwd` や `login`
実行中のプロセスの実効ユーザIDを変えることで、細かな権限処理を行えるようにする `at` コマンド
 `setuid`, `seteuid` で行うことができる。
 
### fork/vfork

* アドレス空間をコピーする
	* データ/スタック/ヒープをコピーするが共有しない
	* テキストセグメントは共有される
	* 効率の観点からCopy on Writeで必要になったらコピーする
* 親と子のどちらが先に呼ばれるかは不定
* 標準入出力のバッファリングに注意
* ファイル記述子もコピーされるけど、（その中の）ファイルポインタは共有される
	* 同じ記述子なら、`wait` で待たないと、たとえば出力内容が混ざる。
	* 親と子で同一のファイルオフセットを持っておくと便利なことがある
		* ログの書き込みとか

### vfork

* ページテーブルをコピーしない `fork`
	* 子は親のページテーブルを参照する
	* `clone` システムコールと似ている？
		* glibc について: [https://linuxjf.osdn.jp/JFdocs/libc-intro.html](https://linuxjf.osdn.jp/JFdocs/libc-intro.html)
* 子は exec を呼ぶなどする
* 親は勝手に sleep するので、子が親の処理を待つと、デッドロックになる
* 子がメモリ内容を書き換えたり、関数を呼び出す（親のスタックを使うことになる？）と結果は不定
	* 子が`exit` を呼んだり、呼んだ関数から戻るのもダメ
	* `_exit` なら呼んでよい

#### fork のポイント

* 子の前に親プロセスが終了するとき
	* init プロセスが子プロセスの親になる
		* プロセスが終わるとき、カーネルはすべての生きているプロセスについて、終了するプロセスが任意のプロセスの親かどうかを調べる
		* もしそうなら、そのプロセスの親プロセスIDを 1 = init に変える
* 親の前に子プロセスが終了するとき
	* カーネルは終了したプロセスに関する情報を保持している
		* プロセスID
		* 終了状態
		* CPU時間
	* `wait`や`waitpid`で取り出せるようにしている
	* カーネルはそのプロセスが使っていたすべてのメモリを開放し、開いているファイル記述子を閉じることができる

#### `man 2 waitpid` の NOTES

> A child that terminates, but has not been waited for becomes a "zombie". The kernel maintains a minimal set of information about the zombie process (PID, termination status, resource usage information) in order to allow the parent to later perform a wait to obtain information about the child.
> As long as a zombie process is not removed from the system via a wait, it will consume a slot in the kernel process table, and if this tables fills, it will not be possible to create further processes.
> If a parent process terminates, them its "zombie" children (if any) are adopt by `init(1)`, which automatically perform a wait to remove zombies

### wait/waitpid/waitid

* プロセスが呼ばれると、その親プロセスに `SIGCHLD` を送る
* そのシグナルは非同期シグナル
* そのシグナルはデフォルトで無視される

#### 単純化した `wait` の動作

* すべての子が動作しているとブロックする
* 子がすでに終了し、終了状態が取得されるのを待っているなら、状態を取得し、`wait` から戻る
* 子がいなければ、エラーで戻る

```
#include <errno.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(int argc, char **argv)
{
  printf("ECHILD=%d\n", ECHILD);
  int stat;
  pid_t w = wait(&stat);

  printf("error no=%d\n", errno);
  printf("done: pid=%ld and stat = %d\n", (long) w, stat);

  return 0;
}
```

#### 違い

* `wait` 子プロセスが終了数まで呼び出し側をブロック
* `waitpid` ブロックを防ぐオプションがあり、どのプロセスを待つかをコントロールできる

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
* `_Exit` はそれをしない。
* `_exit` はシステムコール
	* `man 2 exit` の NOTES
	> but does not call any functions registered with `atexit(3)` or `on_exit(3)`.
	> Open `stdio(3)` streams are not flushed.
	> ... does close open file descriptors, and this may cause unknown delay, waiting for pending output to finish.
* glibc 2.3を境目にして、ただの？システムコールのラッパー関数から、`exit_group(2)`を、プロセス内のスレッドを停止するために、呼ぶ。

### setuid/setgid

* setuid でそのプロセスの実効ユーザIDを変えることができる。
* スーパユーザ特権があるプロセスなら、3つのIDを変更することができる。

### 解釈実行ファイル

* `#!`が最初の行の始まるファイル
* 
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTU2NTEwMTg4LC0zNjQ3NDk2NzUsMTAzMT
Q1MjM1MywtMjEwODQ2MDU5MywtMjA1MjM5NjI4MSwxMTMyMDAy
Mzk4LDE1Mzg0NDQzLC0zNjQ1MjU4OTMsMjA1NzcwNjc4LC0xMD
g1MjU0OTgyXX0=
-->