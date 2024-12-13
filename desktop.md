---
date: '2024-03-18 13:23:52 +0000'
title: Desktop (Linux/BSD)
tags:
  - software
  - page
---

# Desktop (Linux/BSD)

各OSでの設定で迷いそうなところをまとめておく。

* [.Xresources, .emacs, .zshrc](https://gist.github.com/f6o/a3097cc4908a754549021c01d583aabd)
* [.cwmrc, .xinitrc, .Xresources](https://gist.github.com/f6o/953acb72756bc3c9412021b5389c73bd)
* [.Xresources, .xsession, .zshrc](https://gist.github.com/f6o/c918d2c6465ad3989e3c061c14bc5b21)

## Common settings

### uim-skk

`$HOME/.xinitrc`

```
export XCURSOR_SIZE=24

export XMODIFIERS='@im=uim'
export GTK_IM_MODULE='uim'
export QT_IM_MODULE='uim'
export XIM='uim'
export XIM_PROGRAM='uim'
uim-xim &
```

`$HOME/.Xresources`

```
UXTerm*scrollBar: false
UXTerm*cjkWidth: true
UXTerm*locale: UTF-8 
UXTerm*utf8: 1
UXTerm*metaSendsEscape: true
UXTerm*faceSize: 10 
UXTerm*faceName: DejaVu Sans Mono
UXTerm*faceNameDoublesize: M+ 1mn
```

`$HOME/.uim`

```
(define uim-xim-use-xft-font? #t)
(define uim-xim-xft-font-name "M+ 1mn")
```

### openbsd-cwm

```
fontname "Noto Sans CJK JP:bold"
command term uxterm

ignore xclock
ignore feh

## for emacs
unbind-key M-slash
unbind-key C-slash
unbind-key M-right
unbind-key M-Left
unbind-key M-period
unbind-key M-question
unbind-key m-h
unbind-key m-j
unbind-key M-k
unbind-key M-l
unbind-key M-Tab
```

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


## Ubuntu

### Change Window Manager

```
export XIM=ibus
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus

ibus-daemon -r --daemonize --xim --replace
sleep 1

xrdb -merge $HOME/.Xresources

uxterm -geometry 150x60+970+210 -title main &
```

### skk

* https://qiita.com/manzyun/items/744c32541836b7ac7f57

```
sudo apt instal ibus-skk
sudo sed -i.bak "s|<layout>ja</layout>|<layout>default</layout>|"  /usr/share/ibus/component/skk.xml
ibus restart
```

## Chrome OS

### xrdbを読み込んでくれない

.xprofileに書いてみたがうまくいくか。

* https://impsbl.hatenablog.jp/entry/AutoStartAndEnvvarsOnWayland_en#Environment-variables
* https://wiki.archlinux.org/title/Desktop_entries

# Links

## OpenBSD

* [https://kuchikuu.xyz/openbsd.html](https://kuchikuu.xyz/openbsd.html)
* [http://astro-gr.org/openbsd-after-install/](http://astro-gr.org/openbsd-after-install/)
* [https://www.k58.uk/openbsd.html](https://www.k58.uk/openbsd.html)
* [https://zakaria.org/posts/2021-01-04-xenodm.html](https://zakaria.org/posts/2021-01-04-xenodm.html)
* [https://mwl.io/archives/873](https://mwl.io/archives/873)
* [Setting a STATIC IP In OpenBSD](https://brainsnapped.com/2020/10/01/setting-a-static-ip-in-openbsd/)
* <https://www.aeronetworks.ca/2017/02/openbsd-on-netbook.html>

## Others

* [https://www.togaware.com/linux/survivor/](https://www.togaware.com/linux/survivor/)
* [https://www.freebsd.org/doc/handbook/](https://www.freebsd.org/doc/handbook/)
