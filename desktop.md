---
title: Desktop (Linux/BSD)
tags: [software, page]
---

# Desktop (Linux/BSD)

## Common settings

### MPLUS 1 Code

Download zip from Google Fonts: <https://fonts.google.com/?query=Coji+Morishita&vfonly=true>

```
unzip M_PLUS_1_Code.zip
mv static/*.ttf $HOME/.fonts
fc-cache
fc-list
```

### Unicode fonts on xterm

* <https://www.xmisao.com/2013/08/17/mplus-unicode-font.html>
* <https://www.xmisao.com/2013/08/17/how-to-add-fonts-on-linux.html>
* <http://blawat2015.no-ip.com/~mieki256/diary/201412152.html>
* <https://alpha3166.github.io/blog/20110501.html>

#### Summary

1. Download BDF font files
1. Convert BDF files using `jis2unicode` (aux. tool for monafonts)
1. Concatenate BDF files (alphabets and Japanese chars) and edit BDF headers
1. Convert BDF files into gzipped PCF files using `bdftopcf` and `gzip`
1. Install fonts (gzipped PCF files)

### Secure screen after suspending

```
xmodmap -e "keycode 22 = BackSpace BackSpace BackSpace BackSpace BackSpace BackSpace"
pkill xidle
xidle -delay 5 -sw -program "/usr/X11R6/bin/xlock -mode blank" -timeout 90 &
```

What does xidle do? `man xidle` says

> xidle uses the XScreenSaver(3) extension to receive inactivity events
> when a timeout is specified, running a specific program after the elapsed
> time.

> xidle will also run the program if it is sent a SIGUSR signal, or
> if the pointer sits in a corder of the screen for an amount of time.

## OpenBSD

* [OpenBSD Handbook](https://www.openbsdhandbook.com/)

### Packages

```
pkg_add curl git 

# for desktop
pkg_add firefox ffmpeg vlc
pkg_add emacs
pkg_add st
```

### Static IP

* `/etc/hostname.<if>` [hostname.if(5)](https://man.openbsd.org/hostname.if)
* `/etc/mygate` [mygate(5)](https://man.openbsd.org/mygate.5)
* `sh /etc/netstart` [netstart(8)](https://man.openbsd.org/netstart.8)

for resuming, create a script file,  `/etc/apm/resume`

```
#!/bin/sh
/etc/netstart
```

### (for laptop) Trackpad scroll direction

```
doas wsconsctl mouse.param=134:-40
```

[http://openbsd-archive.7691.n7.nabble.com/trackpad-reversed-scrolling-broken-on-current-td363179.html#a363199](http://openbsd-archive.7691.n7.nabble.com/trackpad-reversed-scrolling-broken-on-current-td363179.html#a363199)

## Links

### OpenBSD

* [https://kuchikuu.xyz/openbsd.html](https://kuchikuu.xyz/openbsd.html)
* [http://astro-gr.org/openbsd-after-install/](http://astro-gr.org/openbsd-after-install/)
* [https://www.k58.uk/openbsd.html](https://www.k58.uk/openbsd.html)
* [https://zakaria.org/posts/2021-01-04-xenodm.html](https://zakaria.org/posts/2021-01-04-xenodm.html)
* [https://mwl.io/archives/873](https://mwl.io/archives/873)
* [Setting a STATIC IP In OpenBSD](https://brainsnapped.com/2020/10/01/setting-a-static-ip-in-openbsd/)
* <https://www.aeronetworks.ca/2017/02/openbsd-on-netbook.html>

### Others

* [https://www.togaware.com/linux/survivor/](https://www.togaware.com/linux/survivor/)
* [https://www.freebsd.org/doc/handbook/](https://www.freebsd.org/doc/handbook/)

