

# APUE Memo

## Chapter 5 Standard I/O Library

* 3章では I/O の操作にファイル記述子を使っていた
* 今回は stdio なので stream を使う
	* ASCII/多バイト文字か決める: オリエンテーション
		* 関数`freopen` (後述)
		* 関数`fwide`
```
#include <stdio.h>
#include <wchar.h>
int fwide(FILE *stream, int mode);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIzMDU3NTc3NSwxMjA3MjEyNDU5XX0=
-->