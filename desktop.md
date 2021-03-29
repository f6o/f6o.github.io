---
title: Desktop
tags: [software, page]
---

# Desktop

## FreeBSD 12.1-RELEASE

```
# pkg install git
# git clone https://github.com/f6o/desktop_setting.git
# sh ./desktop_setting/freebsd/setup.sh username
```

what `setup.sh` does: 

* intall packages
* copy config files into `/home/username`

### links

* https://www.freebsd.org/doc/handbook/
* https://www.togaware.com/linux/survivor/

## OpenBSD settings

### links

* https://kuchikuu.xyz/openbsd.html
* http://astro-gr.org/openbsd-after-install/
* https://www.k58.uk/openbsd.html
* https://zakaria.org/posts/2021-01-04-xenodm.html

### Secure screen after suspending

```
xmodmap -e "keycode 22 = BackSpace BackSpace BackSpace BackSpace BackSpace BackSpace"
pkill xidle
xidle -delay 5 -sw -program "/usr/X11R6/bin/xlock -mode blank" -timeout 90 &
```

### Trackpad scroll direction

```
doas wsconsctl mouse.param=134:-40
```

http://openbsd-archive.7691.n7.nabble.com/trackpad-reversed-scrolling-broken-on-current-td363179.html#a363199
