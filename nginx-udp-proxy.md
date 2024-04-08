---
date: 2024-02-04 18:38:02 +0900
title: nginx udp proxy
tags: [nginx, udp]
---


## build

```
mkdir $HOME/tools
cd $HOME/tools
wget https://nginx.org/download/nginx-1.25.3.tar.gz
tar xzf nginx-1.25.3.tar.gz
cd ./nginx-1.25.3
./configure --without-http_gzip_module --without-http_rewrite_module --without-pcre --with-stream
make
```

## nginx.conf

https://nginx.org/en/docs/stream/ngx_stream_proxy_module.html

```
worker_processes 1;
pid logs/nginx.pid;

events {
  worker_connections 1024;
}

stream {
  server {
    listen 1111 udp;
    proxy_pass 127.0.0.1:2222;
  }
}
```

## start/stop

* https://nginx.org/en/docs/switches.html

```
./objs/nginx stop -p $HOME/tools/nginx-1.25.3 -c ./nginx.conf
./objs/nginx stop -p $HOME/tools/nginx-1.25.3 -c ./nginx.conf -s stop
```
