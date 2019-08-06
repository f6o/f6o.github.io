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
どうやら riscv-pk (proxy kernel) をわすれているようだ。

https://forums.sifive.com/t/an-error-when-running-spike/1247

### riscv-pk のインストール

```
$ git clone https://github.com/riscv/riscv-pk.git
$ cd riscv-pk
$ mkdir build
$ cd build
$ ../configure --prefix=/opt/riscv --host=riscv64-unknown-elf
$ make
$ sudo make install
```

これでひとあんしん。hello, world ができた。

## 2019/8/7

### bbl loader とはなにか

ハローワールドでもそうだが、なにもしないプログラムでも
`bbl loader` という文字列が標準出力される。

```
$ cat main.c
int main () { return 0; }
$ riscv64-unknown-elf-gcc main.c
$ spike pk ./a.out 
bbl loader
```

pk とはなにかという話になるとおもうんだけど、
pk は Proxy Kernel とのことで、どうやらホストのカーネルで実行させている雰囲気。
`ltrace` でなにが呼ばれているかみようとしたが、6MB程度のファイルになった。

```
$ ltrace -o ltrace.log spike pk ./a.out
$ ls -lh ltrace.log
-rw-r--r-- 1 user user 5.7M Aug  6 23:06 ltrace.log
```

みてみると、`bbl loader` は write システムコールで出力されているようだ。
ちなみに `_Znwm` と `_ZdlPv` は C++ の `new` と `delete` に対応するらしい。
https://stackoverflow.com/questions/47337760/what-does-znwm-and-zdlpv-mean-in-assembly

```
write(1, "b", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ec0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ed0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "b", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ea0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5eb0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "l", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ec0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ed0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, " ", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ea0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5eb0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "l", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ec0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ed0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "o", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ea0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5eb0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "a", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ec0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ed0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "d", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ea0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5eb0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "e", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ec0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ed0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5eb0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "r", 1)                                                                                                     = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ea0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
swapcontext(0x559ed3e7a7c0, 0x559ed3ec5470, 0x7ffc89065028, 0x7f7e2fee5010)                                          = 0
memset(0x7ffc89064940, '\0', 8)                                                                                      = 0x7ffc89064940
_Znwm(16, 0x7ffc89064a60, 2, 0)                                                                                      = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064a80, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5eb0
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064a80, 3, 0x7f7e2f04bb00)                                                            = 0x559ed3ed5ee0
_Znwm(16, 0x7ffc89064ab0, 2, 0x559ed3ed5ee0)                                                                         = 0x559ed3ed5ed0
_Znwm(16, 0x7ffc89064b30, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5ef0
_Znwm(16, 0x7ffc89064a00, 2, 0x7f7e2f04bb00)                                                                         = 0x559ed3ed5f10
write(1, "\r", 1)                                                                                                    = 1
_ZdlPv(0x559ed3ed5f10, 0x7ffc89064960, 3, 0x7f7e2fb021b0)                                                            = 0
_ZdlPv(0x559ed3ed5ef0, 0x7ffc89064a00, 3, 0)                                                                         = 0x559ed3ed5f00
_ZdlPv(0x559ed3ed5ed0, 0x7ffc89064b30, 3, 0x559ed3ed5f00)                                                            = 0x559ed3ed5ee0
_ZdlPv(0x559ed3ed5eb0, 0x7ffc89064ab0, 3, 0x559ed3ed5ee0)                                                            = 0x559ed3ed5ec0
swapcontext(0x559ed3ec5470, 0x559ed3e7a7c0, 0x559ed3ea0ec0, 0x8000a)                                                 = 0
```


