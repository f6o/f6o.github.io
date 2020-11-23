# f6o.github.io

## このサイトについて

お仕事ではQAエンジニアっぽいことやっていますが、このサイトの内容は基礎固めの記録です (2019-07-09)

## ブログ

<ul class="itemlist posts">
{% for post in site.posts %}
<li class="post" data-post-date="{{ post.date }}">
  <a href="{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

## メモ

<ul class="itemlist pages">
{% for page in site.pages %}
<li class="page" data-post-date="{{ page.date }}">
  <a href="{{ page.url }}">{{ page.title }}</a>
  {% for cat in page.categories %}
  <span class="c">{{ cat }}</span>
  {% endfor %}
</li>
{% endfor %}
</ul>

### Software

* [Advance Programming in the UNIX Environment](./apue)
* [A Fast File System for UNIX](./fastfilesystemforunix)
* Text Classification using String Kernels [Lodhi et al. 2002]
* [Git Internals](./git_internals)
* [Opus](./opus)
* [RISC-V](./riscv)
* [Linux Desktop](./desktop)

### Math

* [Information Theory](./informationtheory)
* [Probability and Computing](./probability)
* [Algebra](./algebra)

### etc.

* [スクリプト](./scripts)
