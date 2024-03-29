---
date: 2022-07-20 22:28:09 +0000
title: 群論メモ
tags: [math]
---

# 群論メモ

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