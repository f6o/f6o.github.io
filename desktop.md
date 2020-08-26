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

## links

* https://www.freebsd.org/doc/handbook/
* https://www.togaware.com/linux/survivor/

## OpenBSD settings

### Trackpad scroll direction

```
doas wsconsctl mouse.param=134:-40
```

http://openbsd-archive.7691.n7.nabble.com/trackpad-reversed-scrolling-broken-on-current-td363179.html#a363199
