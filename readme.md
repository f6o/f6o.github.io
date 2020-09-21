# f6o.github.io

## このサイトについて

お仕事ではQAエンジニアっぽいことやっていますが、このサイトの内容は基礎固めの記録です (2019-07-09)

## ブログ

<ul>
{% for post in site.posts %}
<li>
  <a href="{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

## メモ

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
* [Group Theory](./groups)

### etc.

* [スクリプト](./scripts)
