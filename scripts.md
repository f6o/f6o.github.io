---
date: 2020-11-23 12:51:00 +0000
title: script
tags: [page]
---

and also https://gist.github.com/f6o

## common lisp for dummies

* Practical Common Lisp
  * http://www.gigamonkeys.com/book/
  * http://www.ohmsha.co.jp/book/9784274067211/
* cl-cookbook
  * https://lispcookbook.github.io/cl-cookbook/
* HyperSpec
  * http://www.lispworks.com/documentation/common-lisp.html
  * http://www.lispworks.com/documentation/HyperSpec/Front/index.htm

## shell scripts

### アクセスが多いIPを並べる

主に nginx 用デフォルトのログで先頭にIPアドレスがあればいい

```
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -n | tail -n 5
```

### nginxログ閲覧用スクリプト

```
#!/bin/bash
set -e

AWKSCRIPT='{print}'
case "$1" in
        "path" ) AWKSCRIPT='{print $7}' ;;
        "ip" ) AWKSCRIPT='{print $1}' ;;
esac

PRINT_LINES="5"
if [ -n "$2" ];
then
        PRINT_LINES="$2"
fi

pushd /var/log/nginx > /dev/null
cat access.log.1 access.log | awk "$AWKSCRIPT" | sort | uniq -c | sort -n | tail -n "$PRINT_LINES"
popd > /dev/null
```