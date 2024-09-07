---
date: 2024-02-05 18:27:51 +0900
title: Palworld Server on GCP (Debian12/bookworm)
tags: [debian, gcp, page]
---

情報が古くなっているかもしれません。
These instruction may be outdated because this doc was updated on Feb 2024.

# Palworld Server on GCP (Debian12/bookworm)

* https://tech.palworldgame.com/dedicated-server-guide#linux
* https://developer.valvesoftware.com/wiki/SteamCMD#Linux

## create palworld user

```
sudo useradd -m palworld
sudo passwd palworld
sudo chsh -s /bin/bash palworld
```

## install steamcmd

```
sudo apt update
sudo apt install tmux emacs-nox

sudo sed -i.bak 's/: main/: main contrib non-free/' /etc/apt/sources.list.d/debian.sources
cat /etc/apt/sources.list.d/debian.sources
...
...
Components: main contrib non-free
...
...

sudo apt install software-properties-common
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install steamcmd
```

## install palworld server

```
su - palworld
steamcmd +login anonymous +app_update 2394010 validate +quit
ln -s ~/.local/share/Steam/steamapps/common/PalServer/ PalWorldServerHome

steamcmd +login anonymous +app_update 1007 +quit
mkdir -p ~/.steam/sdk64/
cd ~/.steam/sdk64/
cp -p ~/.local/share/Steam/steamapps/common/Steamworks\ SDK\ Redist/linux64/steamclient.so ./

cd ~/PalWorldServerHome
./PalServer.sh
... then shutdown
cp -p DefaultPalWorldSettings.ini Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
emacs Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
```

## start the server on 9000/udp

```
./PalServer.sh --port=9000 --publicport=9000
```

and open 9000/udp on GCP console or cli tools

*TODO: write down the gcloud command*

## shell script

### memory check

```
## */5 * * * * bash $HOME/bin/proc-check.sh >> /tmp/palworld-memory.txt
SERVERPID=`pgrep -u palworld 'PalServer-Linux'`
STATFILE=/proc/$SERVERPID/statm
TIMESTAMP=`date '+%m%d %H%M%S'`

echo -n "$TIMESTAMP "
if [[ -e $STATFILE ]]
then
  cat $STATFILE
else
  echo "NF"
fi
```

### backup

```
#!/bin/bash
SERVERPID=`pgrep -u palworld 'PalServer-Linux'`

if [[ -z "$SERVERPID" ]]
then
  echo "server is not running"
  pushd $HOME/PalWorldServerHome/Pal
  ARCHIVEFILE=$HOSTNAME.`date +%s`.tar.gz
  tar czf $ARCHIVEFILE ./Saved
  mv $ARCHIVEFILE /tmp
  ls -l /tmp
else
  echo "error: server is running"
fi
```

## gcp commands

```
GCPZONE='xxx'
GCPPROJECT='yyy'
GCPINSTANCENAME='zzz'

start() {
    gcloud compute instances start --zone $GCPZONE --project $GCPPROJECT $GCPINSTANCENAME
}

stop() {
    gcloud compute instances stop --zone $GCPZONE --project $GCPPROJECT $GCPINSTANCENAME
}

list_backup() {
    gcloud compute ssh --zone $GCPZONE --project $GCPPROJECT $GCPINSTANCENAME --command='ls -lt /tmp'
}

get_backup() {
    TARGETFILE=$GCPINSTANCENAME':/tmp/'$1
    gcloud compute scp --zone $GCPZONE --project $GCPPROJECT $TARGETFILE ./
}

ssh() {
    gcloud compute ssh --zone $GCPZONE --project $GCPPROJECT $GCPINSTANCENAME
}

case "$1" in
    'start') start ;;
    'stop') stop ;;
    'backup') get_backup "$2";;
    'list') list_backup ;;
    'ssh' ) ssh ;;
    *) echo 'no command found' ;;
esac
```
