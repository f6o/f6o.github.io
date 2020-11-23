# f6o.github.io

## このサイトについて

お仕事ではQAエンジニアっぽいことやっていますが、このサイトの内容は基礎固めの記録です (2019-07-09)

<ul class="itemlist posts">
{% for post in site.posts %}
<li class="post"><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

{% assign markdown_pages = site.pages | where: "tags", "page" %}

<ul class="itemlist pages">
{% for page in markdown_pages %}
<li class="page"><a href="{{ page.url }}">{{ page.title }}</a></li>
{% endfor %}
</ul>

<ul class="itemlist pages">
{% for page in site.pages %}
<li class="page"><a href="{{ page.url }}">{{ page.title }}</a> <code>{{ page.tags}}</code></li>
{% endfor %}
</ul>