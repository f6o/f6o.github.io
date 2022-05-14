---
title: 代数
tags: [math, page]
---

# 代数メモ

{::options parse_block_html="true" /}

## 準備

### 写像

<div class="twocolumn">

<div class="def">
写像とは $S, S'$ を集合とし、$S$の各々の元にそれぞれ$S'$の元1つを対応させる対応のことをいう。
$f: S \to S'$と書く。

このとき、$S$を写像$f$の定義域または始集合、$S'$を終集合という。

$f$によって、$S$の元$x$に対応する$S'$の元を $x$における$f$の値、$f$による$x$の像と呼び、$f(x)$と書く。
</div>

<div class="note"></div>
</div>

<div class="twocolumn">
<div class="def">
$f: S \rightarrow S'$ とする
* 単射 (異なる元の像は異なっている) \\[ \forall x, y \in S \quad x \ne y \Rightarrow f(x) \ne f(y) \\]
* 全射 (像$f(S)$が$S'$と一致する) \\[ \forall x' \in S' \enspace \exists x \in S \quad x' = f(x) \\]
</div>

<div class="note"></div>
</div>

## 定義

### 群

<div class="twocolumn">

<div class="def">
以下の空でない集合 $G$ が3つ条件を満たすとき、 $G$ は算法 $\*$ について群をなすという。

1. 算法 $\*$ は結合的である: $G$ のすべての元 $a, b, c$ について $(a\*b)\*c=a\*(b\*c)$
1. $G$ に1つの元 $e$ が存在して、 $G$ のすべての元 $a$ に対し $e\*a=a\*e=a$
1. $G$ の任意の元 $a$ に対して $b\*a=a\*b=e$ となる $G$ の元 $b$ が存在する
</div>

<div class="note">
* $\*$は省略して、$ab$ とかける。
* 単位元 $e$ のことをどの群かをあらわすため $1_G$ と書くことがある。
* 一般に $a\*b=b\*a$ が成り立つとき、 $a$ と $b$ は可換であるという。
* 群 $G$ の任意の2元がいつも可換であるとき、 $G$ は可換群という。
</div>
</div>

### 部分群

<div class="twocolumn">

<div class="def">
$G$ が群で、$H \subset G$ のとき、$H$は以下の条件を満たすとき、部分群という。

* $1_G \in H$
* $a,b \in H \implies ab \in H$
* $a \in H \implies a^{-1} \in H$
</div>

<div class="note">
</div>

</div>

### 剰余類と正規部分群

<div class="twocolumn">

<div class="def">
$G$ が群で、$H$ を$G$の部分群とする。このとき、$G$のすべての元$a$に対して、
$aH=Ha$ が成り立つとき、$H$は$G$の正規部分群という。
</div>

<div class="note">
* $aH = \\{ah \vert h \in H \\}$ は左剰余類
* $Ha = \\{ha \vert h \in H\\}$ は右剰余類
* 正規部分群は可換なものをあつめたもの
</div>

</div>

<div class="twocolumn">

<div class="def">
<p>
$G$ が群で、$N$ を$G$の正規部分群とする。このとき、 $N$ による剰余類全体は上記の「積」に関して群を
なし、これを商群といい $G/N$ であらわす。
</p>
</div>

<div class="note">
$S, S'$ を群$G$の部分集合とし、 積 $SS'=\\{ss' \vert s \in S, s' \in S'\\}$ と定義する。
</div>

</div>

### 共役

<div class="twocolumn">

<div class="def">
* $a,b \in G$ について $sas^{-1} = b$ となる $s \in G$が存在するとき、$a$は$b$に共役という
* 部分集合でも同様に、 $A,B \subset G$ について $sAs^{-1} = B$ となる $s \in G$が存在するとき、$A$は$B$に共役という
</div>

<div class="note">
ここで $aH = \\{ah|h \in H\\}$ は左剰余類、 $Ha = \\{ha|h \in H\\}$ は右剰余類という
</div>

</div>

### 準同型写像

<div class="twocolumn">

<div class="def">
群 $G, G'$とし、写像 $f: G \rightarrow G'$ が準同型写像であるとは、以下が成立することをいう。
\\[ \forall x,y \in G \quad f(xy)=f(x)f(y) \\]
</div>

<div class="note">
</div>

</div>

### 環

<div class="twocolumn">

<div class="def">
1. $R$ は加法に対して可換群(アーベル群)をなす
1. (両側分配法則) 任意の $a,b,c \in R$ について $a(b+c)=ab+ac$ , $(b+c)a=ba+ca$
1. (積の結合法則) 任意の $a,b,c \in R$ について $(ab)c=a(bc)$
1. (積の単位元) $R$ に1つの元 $e$ が存在して、 $R$ のすべての元 $a$ に対し、 $ea=ae=a$ が成り立つ
</div>

<div class="note">
* 乗法についての逆元の存在は仮定していない
* 環 $R$ の乗法が可換であるとき、 $R$ を可換環という
</div>
</div>

### 環上の加群

<div class="twocolumn">
<div class="def">
$R$ を環, $M$をアーベル群とする。 $R \times M$から$M$への写像
$(a,x) \mapsto ax$が定義され、次の4つの条件を満たすとき、$M$を$R$上の左加群という。

1. $a \in R$, $x,y \in M$ならば $a(x+y)=ax+ay$ 
1. $a, b \in R$, $x \in M$ならば $(a+b)x=ax+bx$
1. $a, b \in R$, $x \in M$ならば $(ab)x=a(bx)$
1. $x \in M$ ならば $1x=x$
</div>

<div class="note">
</div>
</div>

### 体

<div class="twocolumn">
<div class="def">
1. $K$ が可除環とは、 $K$ が環であり, $a \in K, a \ne 0$ なら
   $\exist b \in K, ab=ba=1$
1. 可換な可除環を体という
</div>

<div class="note">
* 1のみなりたつときは、$K$ を斜体という
</div>
</div>

## 講義メモ

### 第1回

* 対称群
* 置換と互換

### 第2回

* 部分群
* 核と像
* 部分群の例 $SO(S)$, $SO(n)$
* 交代群
* 群の作用と置換表現
* 安定化群, 軌道
* 対称性
* 共役による作用
* 巡回置換
* 置換の型, ヤング図形
* 既約表現
* テンソル積, 環準同型
* 群環
* 環上の加群
* 直和
* 自由加群

## [松坂] s6-6 について

標準的準同型の核がある正規部分群に含まれるときも準同型定理が成立するということ？
これは[雪江]に載っていた。

TODO: 可換図式を載せる

## 剰余類の代表

剰余類も

\\[ xy^{-1} \in H \iff x\sim y \\]

という同値関係からの同値類なので、同値類の代表元と同じと考える。

\\[ [x] =\{ \forall y
\in H | x \sim y \} \\]

左剰余類 $[a] = aH$ とすると、その代表元は $a$

## $(xN)(yN)=xyN$ について

$N$ は $G$ の正規部分群とし、任意の$G$の元$x,y$について
\\[ (xN)(yN)=xyN \\]
はなりたつのか。

左辺の元は $xnyn'$ だが、これは $xyy^{-1}nyn'$ と変形でき$xy(y^{-1}ny)n'$ となる。
$y^{-1}ny$は$N$による共役なので、$y^{-1}ny=n''$となる(ここがポイント!)
よって$xnyn = xyn''n'$とあらわずことができるので、$xNyN \subseteq xyN$

また $xyN$ の任意の元は $xyn$ とあらわされるが、
これは $(xe)(yn)$ と変形でき $xe, yn \in xH$ より
$xyN \subseteq xNyN$ がいえる。

---

商群の説明は[遠山, p.XX]が一番説明がわかりやすかった。

## 参考資料

* [松坂] 代数系入門 松坂和夫 ... これがベース。古典的な教科書。
* [遠山] 代数的構造 遠山啓 ... 読物としての性格が強い。
* 対称性からの群論入門 アームストロング ... 図形を中心に。
* [雪江] 代数学 雪江
* 見える群論入門 ... あまりよんでないが、遠山っぽいかんじ。
* シンメトリーとモンスター マークロナン ... れきしものがたり

## 講義動画

* [基礎数学からの展開A](https://ocw.kyoto-u.ac.jp/course/67/?video_id=819)
  群の表現論が講義の中心テーマ
* [代数学Ⅱ](https://ocw.kyoto-u.ac.jp/course/66/?video_id=800)

## etc

* [KaTeX Supported Functions](https://katex.org/docs/supported.html#overlap-and-spacing)
  KaTeXはこのページでつかっている数式レンダリング

## for fun

* [Group theory, abstraction, and the 196,883-dimensional monster](https://www.youtube.com/watch?v=mH0oCDa74tE)
* [Monster Group (John Conway) - Numberphile](https://www.youtube.com/watch?v=jsSeoGpiWsw)