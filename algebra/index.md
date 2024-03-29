---
date: 2022-07-20 22:28:09 +0000
title: 代数メモ
tags: [math, page]
---

# 代数メモ

## 目次

* [群論メモ](./group)

## 下書き

内容がふえてきたら、独立したページにする。

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