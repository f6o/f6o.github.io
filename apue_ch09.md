# APUE memo

## Chapter. 9 プロセスの関係


### 端末ログイン

```
init -> login ->

```

### ネットワークログイン
### プロセスグループ
### セッション
### 制御端末
### ジョブコントロール

ジョブの POSIX での定義
http://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap03.html#tag_03_201

> A set of processes, comprising a shell pipeline, and any processes descended from it, that are all in the same process group.

`cat > temp.foo &` というコマンドをシェルで実行すると、cat はバックグラウンドジョブとなる。

* このとき、プロセス間通信が行われるが、どのような通信か。具体的に述べよ。
* fg を入力して、フォアグラウンドジョブにした場合、さらにどのような通信が行われるか、述べよ
** SIGTTIN と SIGCONT の使い方の例にもなる

#### 演習

* 6.8 節のファイル wtmp, utmp の検討にもどって、
なぜプロセス init がログアウト記録を書くのであろうか。
ネットワークログインでも同じ方法で処理できるだろうか。

* fork を呼び、子で新たなセッションを作るプログラムを書きなさい。
子がプロセスグループのリーダーとなり、子に制御端末がないことを確認しなさい。

#### 参考

* 5. Signals https://www.win.tue.nl/~aeb/linux/lk/lk-5.html

### シェルのプログラム実行

TODO: `ps -o pid,ppid,pgid,sid,comm` からプロセスの親子関係を模した図を描くプログラム
pstree コマンドでもよさそう



