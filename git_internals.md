# git internals

https://git-scm.com/book/ja/v2

* git は content-addressing file system
* シンプルな key-value data store
* `hash-object` コマンドや `cat-file` コマンドで確認できる

## オブジェクトを作成する

```
$ echo 'hello' | git hash-object -w --stdin
ce013625030ba8dba906f756967f9e9ca394464a

$ find .git -type f
.git/hooks/applypatch-msg.sample
.git/hooks/commit-msg.sample
.git/hooks/post-update.sample
.git/hooks/pre-applypatch.sample
.git/hooks/pre-commit.sample
.git/hooks/pre-push.sample
.git/hooks/pre-rebase.sample
.git/hooks/pre-receive.sample
.git/hooks/prepare-commit-msg.sample
.git/hooks/update.sample
.git/info/exclude
.git/description
.git/HEAD
.git/config
.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a

$ git cat-file -p ce01
hello

$ git cat-file -t ce01
blob
```

## tree

```
$ git cat-file -p master^{tree}
100644 blob b25c15b81fae06e1c55946ac6270bfdb293870e8    .gitignore
040000 tree c6c687c34491f596c2e03aecd8edc7ae783774db    src
```

`master^{tree}` という表現は master ブランチ上の最後のコミットが指しているツリーオブジェクト

## git のオブジェクト

* blob オブジェクト（ファイル？）
* tree オブジェクト（UNIXファイルシステムのディレクトリ構造）
* commit オブジェクト

### コミットグラフ

* tree オブジェクトは以下を知っている
	* blob オブジェクトのSHA-1
	* ファイル名
	* ファイルモード
* commit オブジェクトは tree オブジェクトへのポインタ
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzY5NDQ3OF19
-->