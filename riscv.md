# RISC-V

## RISC-V 向けのビルドツールのインストール

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

## binaries

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

## エミュレータのインストール

TODO: Spike?
