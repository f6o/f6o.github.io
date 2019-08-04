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

## エミュレータのインストール

TODO: Spike?