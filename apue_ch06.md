# APUE Memo
## Chapter 6. System Data Files And Information

### 6.1 はじめに

* パスワードファイル `/etc/passwd`
* グループファイル `/etc/group`
* などなど

* テキストデータ ASCII で保管している（歴史的に...）
* 大きなシステムだと性能に響く
* テキストじゃない形式でも読み書きしたいよね
* でもポータブルなインターフェースで使いやすいようにしてほしい

ついでに時間・日付関数も.

### 6.2 パスワードファイル

* `pwd.h` で定義されている `struct passwd` のファイル
* POSIX.1 だと5種類のフィールドだけ
* BSD なら10種類フルで使える
* シェルログインさせたくないユーザ
	* 他の選択肢として `/bin/false` や `/bin/true`
	* `nologin` コマンドも使える
* `nobody` ユーザは歴史的に uid/gid=65534 ?

#### `struct passwd` を取得する

* `getpwuid` ユーザID
* `getpwnam` 名前から
* `getpwent` 1つずつエントリを取る
	* いずれも static な領域にあるので、呼び出しごとに上書きされる

### 6.3 シャドーパスワードファイル

* `shadow.h`
* `/etc/shadow`
* ユーザパスワードを一方向性暗号で暗号化したもの
* パスワードを推測するハック
	* Garfinkel et al. [2003] の4章
* ユーザ名・暗号化パスワード
* 他には、パスワードやアカウントの有効期限もある

### 6.4 グループファイル

* `grp.h` の `struct group`
* アクセサ関数も用意している

### 6.5 補助グループID

* UNIXv7以降のお話
* 4.2BSD以降、同時に複数のグループに属するようにできるようになった
* 実効グループIDだけではないよということ。

### 6.6 実装の差異

FreeBSD/Linux/MacOSX/Solaris での比較

### 6.7 その他のデータファイル

* /etc/services
* /etc/protocols
* /etc/networks
* /etc/hosts

* `netdb.h`
* それぞれのファイルに対して関数がある get/set/end

### 6.8 ログイン記録

* `struct utmp` は `man utmp` でわかる
* ログインすると `login` プログラムが `struct utmp` をファイル `utmp` に書き出し、同じものをファイル `wtmp`へも追加書き
* ログアウトすると `init` プロセスが `utmp` の該当エントリを消して、`wtmp` へ追加書き
* `who` プログラムは `utmp` ファイルを読み、読みやすいようにしてくれる
* `last` プログラムは `wtmp` を読み取って、レコードを表示できる

### 6.9 システムの識別

* `man 2 uname`
* OS名やバージョン, ハードウェア種別など
* `struct utsname` は `sys/utsname.h` で定義されている
* ホスト名が知りたい場合は `gethostname`
	* TCP/IP ネットワーク上のホスト名が返ってくる
	* BSD派生のものらしいけど、POSIX.1-2008 にも入っているみたい

### 6.10 時間と日付の routine

* UNIX time `time_t` 型
* 1970/1/1 00:00:00 UTC からの経過秒
* `time.h` の `time` 関数 

#### Unix システムの時間の扱い

* ローカルタイムではなく、UTCで保管する
* 夏時間などの変換を自動的に行う
* 日時をひとつの量として扱う

#### より細かな時間の扱い

これらは `sys/time.h`

* `clock_gettime` クロック時間の取得
* `clock_getres` 精度を指定して、初期化
* `clock_settime` 任意の時間への設定

#### 時間の変換 (これは図で)

* `struct tm`
	* `gmtime`
	* `localtime`
	* `strptime` で文字列から読み込む
	* `strftime` で書式付き文字列にする
* `time_t`
	* `mktime`
* `struct timeval`
	* `gettimeofday`
		* 古いけどマイクロ秒も扱えるので、使われているらしい
		* これは `sys/time.h`
* `struct timespec`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUwMzE4OTc2MiwtMTA2NjM2NDYxOF19
-->