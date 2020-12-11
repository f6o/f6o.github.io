# f6o.github.io

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
