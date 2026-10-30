---
layout: single
title: "站点导航"
permalink: /sitemap/
author_profile: true
lang: zh
translation_url: /en/sitemap/
---

<ul>
  <li><a href="{{ '/' | relative_url }}">主页</a></li>
  {% for link in site.data.navigation.main %}
  <li><a href="{{ link.url | relative_url }}">{{ link.title }}</a></li>
  {% endfor %}
</ul>
