# A Fast File System for UNIX
メモ
## Introduction
* 512 バイトの UNIX ファイルシステムから 4.2BSD のファイルシステムへの変更点
* PDP-11 のために設計されて、VAX-11 上で他のUNIX拡張と組み合わせると辛くなってきた
	* VLSI の設計や画像処理
	* ページインとアウトが頻繁に行われる
> This requires a file system providing higher bandwidth than the original 512 bytes UNIX one that provides about 2% of maximum disk bandwidth or about 20KB per second per arm.
* 1 アームあたり 20KB/秒?
* どれくらいなんだろう

### 読みたい論文
* Symbolics81 こと [Symbolics File System](https://archive.org/details/bitsavers_symbolicsLemAug81_1706305)
* Pechura83 こと [Estimating file access time of floppy disks](https://dl.acm.org/citation.cfm?id=358425&preflayout=flat)

## Old file system
* Bell 研究所で開発された file system
* ドライブは１つ以上のパーティションでわけられる
* パーティションはファイルシステムを持つが、複数のパーティションを跨ぐことはない
### superblock
* file system 内のデータブロック数
* ファイルの最大数 a count of the maximum number of files
* フリーリスト: ファイルシステム内の空きブロックのリスト
### この節内での定義
* ファイルの先頭8バイト: iノード (ファイルの情報, 間接的に furthur data blocks のインデックスを持つ)
* 512 byte ブロックのファイルシステムだと、
* a singly indirect block contains 128 further block addresses
* a doubly indirect block contains 128 addresses of further singly indirect blocks
* a triply indirect block contain 128 

## New file system organization
## Performance
## File system functional enhancements
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUzNzY1MzE3NiwxNDI1MTU5NTE2LDk4Mz
kyMjY4NywtMjc0MjIwODMxXX0=
-->