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
## New file system organization
## Performance
## File system functional enhancements
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI3NDIyMDgzMV19
-->