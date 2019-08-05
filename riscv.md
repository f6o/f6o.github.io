# RISC-V にっき

夏らしく日記っぽく。したのほうがあたらしいです。

## 2019/8/5

### RISC-V 向けのビルドツールのインストール

```
$ sudo apt-get install git autoconf automake autotools-dev curl libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev
$ git clone https://github.com/riscv/riscv-gnu-toolchain
$ git submodule update --init --recursive
  --> 9.2GBくらいになる
$ cd riscv-gnu-toolchain
$ sudo mkdir /opt/riscv
$ ./configure --prefix=/opt/riscv
$ sudo make
```

## 2019/8/6

### インストールできたバイナリたち

```
$ find /opt/riscv/bin -type f
/opt/riscv/bin/riscv64-unknown-elf-addr2line
/opt/riscv/bin/riscv64-unknown-elf-readelf
/opt/riscv/bin/riscv64-unknown-elf-gcc
/opt/riscv/bin/riscv64-unknown-elf-objcopy
/opt/riscv/bin/riscv64-unknown-elf-run
/opt/riscv/bin/riscv64-unknown-elf-size
/opt/riscv/bin/riscv64-unknown-elf-gcc-ar
/opt/riscv/bin/riscv64-unknown-elf-c++
/opt/riscv/bin/riscv64-unknown-elf-gcov-dump
/opt/riscv/bin/riscv64-unknown-elf-strip
/opt/riscv/bin/riscv64-unknown-elf-gcc-ranlib
/opt/riscv/bin/riscv64-unknown-elf-objdump
/opt/riscv/bin/riscv64-unknown-elf-elfedit
/opt/riscv/bin/riscv64-unknown-elf-cpp
/opt/riscv/bin/riscv64-unknown-elf-gdb-add-index
/opt/riscv/bin/riscv64-unknown-elf-strings
/opt/riscv/bin/riscv64-unknown-elf-gcov
/opt/riscv/bin/riscv64-unknown-elf-ld
/opt/riscv/bin/riscv64-unknown-elf-g++
/opt/riscv/bin/riscv64-unknown-elf-gcov-tool
/opt/riscv/bin/riscv64-unknown-elf-gcc-nm
/opt/riscv/bin/riscv64-unknown-elf-nm
/opt/riscv/bin/riscv64-unknown-elf-gcc-8.3.0
/opt/riscv/bin/riscv64-unknown-elf-gprof
/opt/riscv/bin/riscv64-unknown-elf-gdb
/opt/riscv/bin/riscv64-unknown-elf-ld.bfd
/opt/riscv/bin/riscv64-unknown-elf-as
/opt/riscv/bin/riscv64-unknown-elf-ar
/opt/riscv/bin/riscv64-unknown-elf-ranlib
/opt/riscv/bin/riscv64-unknown-elf-c++filt
```

不要な git レポジトリは削除しておくのがいい。
今回はgcp上につくったので、ストレージの費用は大切。

### Spike(エミュレータ)のインストール

ビルド後でも300MBちょっと。おさいふにやさしい。

```
$ sudo apt install device-tree-compiler
$ git clone https://github.com/riscv/riscv-isa-sim.git
$ cd riscv-isa-sim
$ mkdir build
$ cd build
$ ../configure --prefix=/opt/riscv
$ make
$ sudo make install
```

Hello World プログラムをつくって `spike pk hello` とでためしてみるとエラー。
どうやら riscv-tools をわすれているようだ。

https://forums.sifive.com/t/an-error-when-running-spike/1247

