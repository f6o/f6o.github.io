## shell scripts

### アクセスが多いIPを並べる

主に nginx 用デフォルトのログで先頭にIPアドレスがあればいい

```
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -n | tail -n 5
```


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg2MTAxMzZdfQ==
-->