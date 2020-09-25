---
layout: post
title: GitHub Pages を使う
---

## Hello, Jekyll

GitHub Pages は Jekyll を使っているので、その設定についていろいろ
調べていた。Markdown を書いて HTML を書き出すツールは、以前に [HUGO](https://gohugo.io/) を使っていたので、似たような設定で、とっつきやすい。

Jekyll については詳しくは、[公式ドキュメント](https://jekyllrb.com/docs/) をみてもらうとして、
GitHub Pages 特有の制限もあったと思うので、[GitHub公式のドキュメント](https://docs.github.com/en/github/working-with-github-pages)も目を通すといい。

実践的に GitHub Pages のレポジトリを参考にするのもいいとおもう。[このページのレポジトリ](https://github.com/f6o/f6o.github.io) は参考になる？

これまではまったく設定なしで GitHub Pages を使っていたが、ブログ記事を書くにあたって、設定が必要になった。

## フォルダ構成

```
css
    default.css
_layout
    post.html
    default.html
_posts
    2020-09-25-jekyll.md
_config.yaml
readme.md
scripts.md
```

`readme.md` がトップページ。
Markdown ファイルでも、forループなどのテンプレート構文ががかけるので、便利。

`_config.yaml` は設定ファイルだけど、今のところはRSSフィードのプラグイン設定のみ。

`_layout` 以下のファイルはテンプレートHTMLで、Markdown ファイルの Front Matter (ヘッダ部分) で指定すると、任意のテンプレートHTMLが使える。
`_layout/post.html` はブログ記事用、 `_layout/default.html` は未指定の場合に使われるデフォルトテンプレートHTML。

ブログ記事は `_posts` 以下に入れておく。たとえば、`_posts/2020-09-25-jekyll.html` は `/2020/09/25/jekyll.html` というURLパスで公開できる。

単独のページ、たとえば `scripts.md` は `/scripts/` というURLパスで公開される。

`css/default.css` のように Markdown ファイルや設定ファイル以外は公開される。

## わるいところはないのでは

手元の Jekyll 環境にないときでも、ページを更新ができるのはよい。たとえば、スマートフォンからGitHubにブラウザログインして編集できる。小さな変更ならそれでいいし、メモにためておいてどんと更新するのもあり。ただ、この記事はPCのエディタで書いて、レポジトリにプッシュするつもり。

手元に Jekyll 環境がないと、デザインを仕上げるのに何度もプッシュを繰り返すかもしれない。ここは、頑として Jekyll を入れない立場にたって、回避をしてみよう。

スタイルシートの修正なら Chrome の Local Overrides を使えば解決できた。

Markdown の編集だと GitHub のエディタのプレビューでもできたはずだし、VSCodeで編集していれば、そのプレビュー機能でもいい。たまに [Github Flavored Markdown](https://github.github.com/gfm/) に対応していないプレビュー機能もあるけど、それはご愛敬。

テンプレート構文のミスが、Jekyll で変換しないとわからないので、いちばん多いかもしれない。ただ、編集する頻度は低いので、許容しておこう。

## Hello, GitHub Pages

今回は時系列で書けるようにしたかったので、CSS を書いて、ブログ記事用のHTMLを書いて終わり。あとは、記事を書いていこう。