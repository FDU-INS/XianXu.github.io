---
layout: single
title: "站点导航"
permalink: /sitemap/
author_profile: true
---

<ul>
  <li><a href="{{ '/' | relative_url }}">首页</a></li>
  {% for link in site.data.navigation.main %}
  <li><a href="{{ link.url | relative_url }}">{{ link.title }}</a></li>
  {% endfor %}
</ul>
