---


---

<h1 id="opus-codec-について">opus codec について</h1>
<ul>
<li>RFC6716
<ul>
<li>Definition of the Opus Audio Codec</li>
</ul>
</li>
<li>RFC7845
<ul>
<li>Ogg Encapsulation for the Opus Audio Codec</li>
</ul>
</li>
</ul>
<p>パケットについて (RFC6716 3章)</p>
<ul>
<li>
<p>所々に出てくる R1 とか R2 とかについて</p>
<ul>
<li>Receiving Malformed Packets (3.4)
<ul>
<li>[R1] Packets are at least one byte</li>
<li>[R2] No implicit frame length larger than 1275 bytes</li>
<li>[R3] Code 1 packets have an odd total length, N, so that (N-1)/2 is an integer.</li>
<li>[R4] Code 2 packets have enough bytes after the TOC for a valid frame length, and that length is no larger than the number of bytes remaining in the packet.</li>
<li>[R5] Code 3 packets contain at least one frame, but no more than 120 ms of audio total.</li>
<li>[R6] The length of a CBR code 3 packet, N, is at least two bytes, the number of bytes added to indicate the padding size plus the trailing padding bytes themselves, P, is no more than N-2, and the frame count, M, satisfies the constraint that (N-2-P) is a non-negative integer multiple of M.</li>
<li>[R7] VBR code 3 packets are large enough to contain all the header bytes (TOC byte, frame count byte, any padding length bytes, and any frame length bytes), plus the length of the first M-1frames, plus any trailing padding bytes.</li>
</ul>
</li>
</ul>
</li>
<li>
<p>バイト列の塊で、一つのユニットとして扱う</p>
</li>
<li>
<p>1つのパケットには、同じパラメータ（チャンネル, ビットレートなど）を持つなら、複数のフレームを含めることができる</p>
</li>
<li>
<p>TOC byte  パケットに少なくとも一つ含まれる (3.1)</p>
<ul>
<li>config (5bit)
<ul>
<li>SILK/CELT</li>
<li>bandwidth</li>
<li>framesize</li>
</ul>
</li>
<li>stereo/mono (1bit)</li>
<li>number of frames (2bit)
<ul>
<li>0 = 1 frame in the packet</li>
<li>1 = 2 frames, each with equal compressed size</li>
<li>2 = 2 frames, each with different compressed size</li>
<li>3 = more than 2 frames</li>
</ul>
</li>
</ul>
</li>
<li>
<p>フレームの詰め込み方 (3.2.1)</p>
<ul>
<li>パケットが複数のVBRフレームを含む場合 (code 2, 3 のとき)
<ul>
<li>1バイトか2バイト</li>
<li>先頭のバイトはフレームの長さを表す
<ul>
<li>0 フレームなし
<ul>
<li>DTX (discontinuous transmission) or ロストフレーム</li>
<li>どのモードのフレームも長さは0になりうる
<ul>
<li>転送途中で落ちたり、エンコーダが故意に transmit しなかったり</li>
</ul>
</li>
</ul>
</li>
<li>1…251</li>
<li>252…255 2バイト目が必要: <span class="katex--inline">KaTeX parse error: Expected '}', got '_' at position 13: \text{second_̲byte}*4+\text{f…</span>
<ul>
<li>最大フレーム数が 1275 なので, 20ms フレームだと 510Kbit/s のビットレートとなる</li>
<li>2550 ms = 2.55 s</li>
</ul>
</li>
</ul>
</li>
<li>VBRパケットの最終フレームとCBRパケットの各フレームは長さは含まれない
<ul>
<li>パケットのサイズと他のフレームのサイズの合計から割り出せるから</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Code 0: 1 frame in the packet (3.2.2)</p>
<ul>
<li>パケットのサイズを <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi></mrow><annotation encoding="application/x-tex">N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span></span></span></span></span> として、TOC byte のあとに、<span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">N-1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.76666em; vertical-align: -0.08333em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">1</span></span></span></span></span> バイトのフレーム</li>
</ul>
</li>
<li>
<p>Code 1: 2 frames with equal compressed size</p>
<ul>
<li>パケットのサイズを <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi></mrow><annotation encoding="application/x-tex">N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span></span></span></span></span> として、TOC byte のあとに、<span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mo stretchy="false">(</mo><mi>N</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi mathvariant="normal">/</mi><mn>2</mn></mrow><annotation encoding="application/x-tex">(N-1)/2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mopen">(</span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mord">/</span><span class="mord">2</span></span></span></span></span> バイトのフレームが2つ
<ul>
<li>Code 1 のパケットは <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">N-1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.76666em; vertical-align: -0.08333em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">1</span></span></span></span></span> は偶数でなければいけない (R3)</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Code 2: 2 frames with different compressed size</p>
<ul>
<li>パケットサイズを <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi></mrow><annotation encoding="application/x-tex">N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.68333em; vertical-align: 0em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span></span></span></span></span> として、TOC byte のあとに、1フレーム目のバイトサイズ <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><msub><mi>N</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">N_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.301108em;"><span class="" style="top: -2.55em; margin-left: -0.10903em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span></span></span></span></span> が1 or 2バイトあり、その後に <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><msub><mi>N</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">N_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.301108em;"><span class="" style="top: -2.55em; margin-left: -0.10903em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span></span></span></span></span> バイトのフレームと <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi><mo>−</mo><msub><mi>N</mi><mn>1</mn></msub><mo>−</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">N - N_1 - 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.76666em; vertical-align: -0.08333em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.301108em;"><span class="" style="top: -2.55em; margin-left: -0.10903em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">2</span></span></span></span></span> か <span class="katex--inline"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>N</mi><mo>−</mo><msub><mi>N</mi><mn>1</mn></msub><mo>−</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">N - N_1 - 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.76666em; vertical-align: -0.08333em;"></span><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.10903em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.301108em;"><span class="" style="top: -2.55em; margin-left: -0.10903em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right: 0.222222em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">3</span></span></span></span></span> バイトのフレームが続く。</li>
</ul>
</li>
</ul>
<h2 id="参考資料">参考資料</h2>
<ul>
<li><a href="https://tools.ietf.org/html/rfc6716#section-1.1">https://tools.ietf.org/html/rfc6716#section-1.1</a></li>
<li><a href="https://www.opus-codec.org/static/presentations/opus_ccbe2013.pdf">https://www.opus-codec.org/static/presentations/opus_ccbe2013.pdf</a>
<ul>
<li>opus codec の図が良い</li>
</ul>
</li>
<li>SILK
<ul>
<li>線形予測符号の実装</li>
<li><a href="https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E4%BA%88%E6%B8%AC%E6%B3%95">https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E4%BA%88%E6%B8%AC%E6%B3%95</a></li>
</ul>
</li>
<li>CELT: Constrained-Energy Lapped Transform
<ul>
<li>周波数ごとに分類する</li>
<li>MDCT(modified)の実装</li>
</ul>
</li>
</ul>
<p>DCT (Discrete Cosine Transformation?) について</p>
<ul>
<li><a href="http://www.f-kmr.com/synthesizer/no3.htm">http://www.f-kmr.com/synthesizer/no3.htm</a>
<ul>
<li>波の種類を分ける</li>
</ul>
</li>
<li><a href="http://mikeo410.minim.ne.jp/cms/~audioDCT">http://mikeo410.minim.ne.jp/cms/~audioDCT</a></li>
<li><a href="https://ja.wikipedia.org/wiki/%E4%BF%AE%E6%AD%A3%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B">https://ja.wikipedia.org/wiki/%E4%BF%AE%E6%AD%A3%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B</a></li>
<li><a href="https://ja.wikipedia.org/wiki/%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B">https://ja.wikipedia.org/wiki/%E9%9B%A2%E6%95%A3%E3%82%B3%E3%82%B5%E3%82%A4%E3%83%B3%E5%A4%89%E6%8F%9B</a></li>
</ul>

