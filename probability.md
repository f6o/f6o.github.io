---
title: 『確率と計算』まとめ
layout: default
---

## 『確率と計算』まとめ

Upfal, Mitzenmacher

1 Events and Probability
1.1 Application: Verifying Polynomial Identities

N個の単項式の積を展開するアルゴリズムを考える
そのアルゴリズムから導かれる結果（＝多項式）を検査したい

真面目にやれば、展開後の最高の次数を $d$ とすると $\Theta(d^2)$ の係数同士の掛け算が必要。
じゃあ、 $[1,...,100d]$ の中から _uniformly at random_ (均一的にランダム) に $r$ を選んで（選ぶコストは１ステップとする）、展開前の式と展開後の式に代入し $F(r)=G(r)$ だったら検査OKとみなす。
ただ、これだと間違えることもある。

1. $F \equiv G$ で $F(r)=G(r)$ のとき
2. $F \equiv G$ で $F(r)\not=G(r)$ のとき
3. $F \not\equiv G$ で $F(r)=G(r)$ のとき
4. $F \not\equiv G$ で $F(r)\not=G(r)$ のとき

上の 3. のときはよろしくない。
詳しく見ていくと、このとき、 $F(x)-G(x)=0$ という方程式に少なくとも１つの解 $x=r$ がある。また、最高次数は $d$ なので、この方程式はたかだか $d$ 個の解しか持ちえない。よって $[1,...,100d]$ から選ぶので $d/100d=1/100$ の確率でそうなる。

1.2 Axioms of Probability

確率空間の定義

* 標本空間 $\Omega$
* 標本空間の部分集合の集合 $\mathcal{F}$
	* ある特定の事象を表すように決められる？
* 確率関数 $\text{Pr}: \mathcal{F} \rightarrow \mathbb{R}$

確率関数は以下を満たす

* $0 \le \text{Pr}(E) \le 1$ 
* $\text{Pr}(\Omega) =  1$
* for finite or countably infinite sequence of pairwise mutually disjoint events $E_1, E_2, E_3, ...$

### 流れ

* 1.1 での間違える確率の議論を定式化して確かめる。
* 確率を改善するにはどうすればいいか
	* $[1,...,1000d]$ まで引き上げる
	* 同じアルゴリズムを繰り返す

同じアルゴリズムを繰り返すとき、 $[1,...,100d]$ をランダムに選ぶとき、重複を許すか、許さないか。

* 重複ありの試行のことを sampling with replacement
* 重複なしの場合は、sampling without replacement

それぞれについて、間違える確率を計算する

* 重複ありの場合は $k$ 回繰り返すと、それぞれの試行は独立なので、 $(1/100)^k$ となる
* 重複なしの場合は、条件付き確率を考える

\[
\text{Pr}(E|F)=\text{Pr}(E \cap F)

\\[
\text{Pr}(\bigcup_{i\ge1}{E_i})=\sum_{i\ge1}\text{Pr}(E_i)
\\]

1.3 Application: Verifying Matrix Multiplication
1.4 Application: Naïve Bayesian Classifier
1.5 Application: A Randomized Min-Cut Algorithm
1.6 Exercises

2 Discrete Random Variables and Expectation 23
2.1 Random Variables and Expectation 23
2.1.1 Linearity of Expectations 25
2.1.2 Jensen’s Inequality 26
2.2 The Bernoulli and Binomial Random Variables 27
2.3 Conditional Expectation 29
2.4 The Geometric Distribution 33
2.4.1 Example: Coupon Collector’s Problem 35
2.5 Application: The Expected Run-Time of Quicksort 37
2.6 Exercises

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA2OTExNDYzMywtMjExOTQwNjcyLC02Nj
gwNzE1OTAsLTc5ODYzNTM5Niw1NjAzNTUwMDQsLTIxMTAzMDUw
NTIsMTE0NDEyMzQyOCw4MTI2OTQzNDEsLTMyMjk4NTM3LDgxMj
Y5NDM0MSwtMTY5MzQwMTU3MCwtMTY5MzQwMTU3MCwtOTgxNTQx
NzYwXX0=
-->