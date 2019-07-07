# opus codec について

* RFC6716
	* Definition of the Opus Audio Codec
* RFC7845
	* Ogg Encapsulation for the Opus Audio Codec

## パケットについて (RFC6716 3章)

* 所々に出てくる R1 とか R2 とかについて
	* Receiving Malformed Packets (3.4)
		* [R1] Packets are at least one byte
		* [R2] No implicit frame length larger than 1275 bytes
		* [R3] Code 1 packets have an odd total length, N, so that (N-1)/2 is an integer.
		* [R4] Code 2 packets have enough bytes after the TOC for a valid frame length, and that length is no larger than the number of bytes remaining in the packet.
		* [R5] Code 3 packets contain at least one frame, but no more than 120 ms of audio total.
		* [R6] The length of a CBR code 3 packet, N, is at least two bytes, the number of bytes added to indicate the padding size plus the trailing padding bytes themselves, P, is no more than N-2, and the frame count, M, satisfies the constraint that (N-2-P) is a non-negative integer multiple of M.
		* [R7] VBR code 3 packets are large enough to contain all the header bytes (TOC byte, frame count byte, any padding length bytes, and any frame length bytes), plus the length of the first M-1frames, plus any trailing padding bytes.

### TOC Bytes

* バイト列の塊で、一つのユニットとして扱う
* 1つのパケットには、同じパラメータ（チャンネル, ビットレートなど）を持つなら、複数のフレームを含めることができる
*  TOC byte  パケットに少なくとも一つ含まれる (3.1)
	* config (5bit)
		* SILK/CELT
		* bandwidth
		* framesize
	* stereo/mono (1bit)
	* number of frames (2bit)
		* 0 = 1 frame in the packet
		* 1 = 2 frames, each with equal compressed size
		* 2 = 2 frames, each with different compressed size
		* 3 = more than 2 frames

### 3.2.1 packing frames

* パケットが複数のVBRフレームを含む場合 (code 2, 3 のとき)
  * 1バイトか2バイト
  * 先頭のバイトはフレームの長さを表す
    * 0 フレームなし
      * DTX (discontinuous transmission) or ロストフレーム
      * どのモードのフレームも長さは0になりうる
      * 転送途中で落ちたり、エンコーダが故意に transmit しなかったり
        * 1..251
        * 252...255 2バイト目が必要: $\text{second_byte}*4+\text{first_byte}$
        * 最大フレーム数が 1275 なので, 20ms フレームだと 510Kbit/s のビットレートとなる
        * 2550 ms = 2.55 s
        * VBRパケットの最終フレームとCBRパケットの各フレームは長さは含まれない。パケットのサイズと他のフレームのサイズの合計から割り出せるから。
* Code 0: 1 frame in the packet (3.2.2)
	* パケットのサイズを $N$ として、TOC byte のあとに、$N-1$ バイトのフレーム
* Code 1: 2 frames with equal compressed size
	* パケットのサイズを $N$ として、TOC byte のあとに、$(N-1)/2$ バイトのフレームが2つ
		* Code 1 のパケットは $N-1$ は偶数でなければいけない (R3)
* Code 2: 2 frames with different compressed size
	* パケットサイズを $N$ として、TOC byte のあとに、1フレーム目のバイトサイズ $N_1$ が1 or 2バイトあり、その後に $N_1$ バイトのフレームと $N - N_1 - 2$ か $N - N_1 - 3$ バイトのフレームが続く。

## 参考資料

* [https://tools.ietf.org/html/rfc6716#section-1.1](https://tools.ietf.org/html/rfc6716#section-1.1)
* [https://www.opus-codec.org/static/presentations/opus_ccbe2013.pdf](https://www.opus-codec.org/static/presentations/opus_ccbe2013.pdf)
	* opus codec の図が良い
* SILK
	* 線形予測符号の実装
	* [https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E4%BA%88%E6%B8%AC%E6%B3%95](https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E4%BA%88%E6%B8%AC%E6%B3%95)
* CELT: Constrained-Energy Lapped Transform
	* 周波数ごとに分類する
	* MDCT(modified)の実装

DCT (Discrete Cosine Transformation?) について
* [http://www.f-kmr.com/synthesizer/no3.htm](http://www.f-kmr.com/synthesizer/no3.htm)
	* 波の種類を分ける
* [http://mikeo410.minim.ne.jp/cms/~audioDCT](http://mikeo410.minim.ne.jp/cms/~audioDCT)
*  [https://ja.wikipedia.org/wiki/%E4%BF%AE%E6%AD%A3%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B](https://ja.wikipedia.org/wiki/%E4%BF%AE%E6%AD%A3%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B)
* [https://ja.wikipedia.org/wiki/%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B](https://ja.wikipedia.org/wiki/%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NzM1OTI2MF19
-->