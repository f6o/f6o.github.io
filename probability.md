---
title: 『確率と計算』まとめ
tags: [math, page]
---

## 『確率と計算』まとめ

Upfal, Mitzenmacher

### 1 Events and Probability

#### 1.1 Application: Verifying Polynomial Identities

N個の単項式の積を展開するアルゴリズムを考える。そのアルゴリズムから導かれる結果（＝多項式）を検査したい。たとえば、

\\[
(x - 1) (x^4 + x^3 + 2 x^2 + 2 x - 1) \equiv^{?} x^5 + x^3 -3x + 1 
\\]

であるかということをたしかめたい。

真面目にやれば、展開後の最高の次数を $d$ とすると $\Theta(d^2)$ の係数同士の掛け算が必要。

じゃあ、 $[1,...,100d]$ の中から _uniformly at random_ (均一的にランダム) に $r$ を選んで（選ぶコストは１ステップとする）、
展開前の式と展開後の式に代入し $F(r)=G(r)$ だったら検査OKとみなす。

ただ、これだと間違えることもある。

1. $F(x) \equiv G(x)$ で $F(r)=G(r)$ のとき
2. $F(x) \equiv G(x)$ で $F(r)\not=G(r)$ のとき
3. $F(x) \not\equiv G(x)$ で $F(r)=G(r)$ のとき
4. $F(x) \not\equiv G(x)$ で $F(r)\not=G(r)$ のとき

上の 3. のときはよろしくない。

詳しく見ていくと、このとき、 $F(x)-G(x)=0$ という方程式に少なくとも１つの解 $x=r$ がある。

また、最高次数は $d$ なので、この方程式はたかだか $d$ 個の解しか持ちえない。

よって $[1,...,100d]$ から選ぶので $d/100d=1/100$ の確率でそうなる。

#### 1.2 Axioms of Probability

確率空間の定義

* 標本空間 $\Omega$
* 標本空間の部分集合の集合 $\mathcal{F}$
	* ある特定の事象を表すように決められる？
* 確率関数 $\mathrm{Pr}: \mathcal{F} \rightarrow \mathbb{R}$

確率関数は以下を満たす

* $0 \le \mathrm{Pr}(E) \le 1$ 
* $\mathrm{Pr}(\Omega) =  1$
* for finite or countably infinite sequence of pairwise mutually disjoint events (互いに素である事象) $E_1, E_2, E_3, ...$

\\[
\mathrm{Pr} \left( \bigcup_{i\ge1}{E_i} \right) = \sum_{i\ge1}\mathrm{Pr}(E_i)
\\]

1.1 での間違える確率の議論を定式化して確かめる。

確率を改善するにはどうすればいいか

* $[1,...,1000d]$ まで引き上げる
* 同じアルゴリズムを繰り返す

同じアルゴリズムを繰り返すとき、 $[1,...,100d]$ をランダムに選ぶとき、重複を許すか、許さないか。

* 重複ありの試行のことを sampling with replacement
* 重複なしの場合は、sampling without replacement

それぞれについて、間違える確率を計算する

* 重複ありの場合は $k$ 回繰り返すと、それぞれの試行は独立なので、 $(1/100)^k$ となる
* 重複なしの場合は、条件付き確率を考える

\\[
\mathrm{Pr}(E|F)=\frac{\mathrm{Pr}(E \cap F)}{\mathrm{Pr}(F)}
\\]

これは事象 $F$ が起こったときに、事象 $E$ が起こる確率（＝条件付き確率）と読む。

これをもとに、 $i$ 回目の試行で選ばれた数 $r_i$ が $F(x)-G(x)$ の根になっている事象を $E_i$ とすると、

$k$ 回試行した結果、このアルゴリズムが間違えた答えを出す確率 $P=\mathrm{Pr}(E_1 \cap E_2 \cap ... \cap E_k)$ となる。

条件付き確率を使うと、

\\[
\mathrm{Pr}(E_1 \cap E_2 \cap ... \cap E_k)
=\mathrm{Pr}(E_k|E_1 \cap E_2 \cap ... \cap E_{k-1})\mathrm{Pr}(E_1 \cap E_2 \cap ... \cap E_{k-1})
\\]

これを繰り返すと

\\[
\mathrm{Pr}(E_1 \cap E_2 \cap ... \cap E_k)
=\mathrm{Pr}(E_1)\mathrm{Pr}(E_2|E_1)\mathrm{Pr}(E_3|E_2 \cap E_1)...\mathrm{Pr}(E_k|E_1 \cap E_2 \cap ... \cap E_{k-1})
\\]

たかだか $d$ 個の解しかないので、 $j$ 回目までに $j-1$ 個あれば、

\\[
\mathrm{Pr}(E_j|E_1 \cap E_2 \cap ... \cap E_{j-1}) \le \frac{d-(j-1)}{100d-(j-1)}
\\]

のはず。
あとは確率 $P$ の上限も重複ありのときより「厳しく」見積もれる。

#### 1.3 Application: Verifying Matrix Multiplication

今度は正方行列のかけ算の結果を検証したい。簡単さをもとめて、行列の要素は ${0, 1}$ とする。

* principle of diferred decisions (決定保留の原則？)
* law of total probability $E_1,E_2,...E_n$ を標本空間 $\Omega$ での mutually disjoint events とし

\\[
\bigcup_{i=1}^{n}E_i=\Omega
\\]

とすると

\\[
\mathrm{Pr}(B)
=\sum_{i=1}^n\mathrm{Pr}(B\cap E_i)
=\sum_{i=1}^n\mathrm{Pr}(B|E_i)\mathrm{Pr}(E_i)
\\]

#### 1.4 Application: Naïve Bayesian Classifier
#### 1.5 Application: A Randomized Min-Cut Algorithm

### 2 Discrete Random Variables and Expectation
#### 2.1 Random Variables and Expectation

確率の定義。確率変数 $X$ は標本空間 $\Omega$ から実数への関数で、

\\[
\mathrm{Pr}(X=a) = \sum_{s\in\Omega | X(s)=a}\mathrm{Pr}(s)
\\]

期待値の定義は、確率変数 $X$ のすべての値について、その値になる確率の積の合計になる。

\\[
\mathbf{E}[X] = \sum_{i}i\mathrm{Pr}(X=i)
\\]

#### 2.1.1 Linearity of Expectations

\\[
\mathbf{E}\left[\sum_{i=1}^nX_i\right] = \sum_{i=1}^n\mathbf{E}[X_i]
\\]

また、 $c$ は定数として,

\\[
\mathbf{E}[cX] = c\mathbf{E}[X]
\\]

#### 2.1.2 Jensen's Inequality

$f$ が凸(convex)関数であるなら

\\[
\mathbf{E}[f(X)] = f(\mathbf{E}[X])
\\]

#### 2.2 The Bernoulli and Binomial Random Variables

確率 $p$ で成功し、確率 $1-p$ で失敗する試行のことを、ベルヌーイ試行という。

ベルヌーイ試行が成功するとき 1, そうでないとき 0 をとる確率変数 $Y$ を Bernoulli, もしくは an indicator random variable という。

\\[
\mathbf{E}[Y] = \mathrm{Pr}(Y=1)
\\]

またベルヌーイ試行をくりかえしたとき、確率変数 $X$ を成功した回数とすると、$X$は二項分布となる。

\\[
\mathrm{Pr}(X=j) = {n \choose j}p^j(1-p)^(n-j)
\\]

$X$ の期待値は

\\[
\mathbf{E}[X] = np
\\]

#### 2.3 Conditional Expectation

\\[
\mathbf{E}[Y|Z=z] = \sum_yy\mathrm{Pr}(Y=y|Z=z)
\\]

\\[
\mathbf{E}[X] = \sum_y\mathrm{Pr}(Y=y)\mathbf{E}[X|Y=y]
\\]

他に、確率変数としても $\mathbf{E}[Y\|Z]$ がつかわれる。

\\[
\mathbf{E}[Y] = \mathbf{E}\left[\mathbf{E}[Y|Z]\right]
\\]

#### 2.4 The Geometric Distribution

コイン投げで初めて表がでるまでの試行回数、幾何分布の例の1つ。

\\[
\mathrm{Pr}(X=n) = (1-p)^{(n-1)}p
\\]

#### 2.5 Application: The Expected Run-Time of Quicksort

### 3. Moments and Deviations
#### 3.1 Markov's Inequality

$X$ が負の値をとらない確率変数であるとき、任意の $a > 0$ について

\\[
\mathrm{Pr}(X \geq a) \leq \frac{\mathbf{E}[X]}{a}
\\]

#### 3.2 Variance and Moments of a Random Variable

確率変数のモーメント: $k$ 番目のモーメントは $\mathbf{E}[X^k]$

分散の定義

\\[
\mathbf{Var}[X] = \mathbf{E}[(X-\mathbf{E}[X])^2] = \mathbf{E}[X^2] - (\mathbf{E}[X])^2
\\]

また、標準偏差 $\sigma[X] = \sqrt{\mathbf{Var}[X]}$ と定義する。

さらに、確率変数 $X$, $Y$ について共分散は

\\[
\mathbf{Cov}(X,Y) = \mathbf{E}[(X-\mathbf{E}[X])(Y-\mathbf{E}[Y])]
\\]

分散と共分散の関係式

\\[
\mathbf{Var}[X+Y] = \mathbf{Var}[X] + \mathbf{Var}[Y] + 2\mathbf{Cov}(X,Y)
\\]

$X$, $Y$ が独立なら $\mathbf{E}[X \cdot Y]=\mathbf{E}[X]\cdot\mathbf{E}[Y]$

#### 3.3 Chebyshev's Inequality

任意の $a>0$ について

\\[
\mathrm{Pr}(|X-\mathbf{E}[X]|\geq a) \leq \frac{\mathbf{Var}[X]}{a}
\\]

#### 3.4 Median and Mean
#### 3.5 Application: A Randomized Algorithm for Computing the Median

### 4. Chernoff and Hoeffding Bounds
#### 4.1 Moment Generating Functions
#### 4.2 Deriving and Applying Chernoff Bounds
#### 4.3 Better Bounds for Some Special Cases
#### 4.4 Application: Set Balancing
#### 4.5 The Hoeffding Bound
#### 4.6 Application: Packet Routing in Sparse Networks

### 5 Balls, Bins, and Random Graphs

メモ

\\[
m=n(\mathrm{ln}n+c)
\\]

\\[
\frac{2 \sqrt{2m\mathrm{ln} m}}{n}
\\]


```
(for wolfram)
m=n(ln(n)+5)
2sqrt(2(n(ln(n)+5))ln(n(ln(n)+5)))) / n
```

### 6 The Probabilistic Method

### 7 Markov Chains and Random Walks

### 8 Continuous Distributions and the Poisson Process

### 9 The Normal Distribution

### 10 Entropy, Randomness, and Information

### 11 The Monte Carlo Method

