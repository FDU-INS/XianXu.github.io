---
layout: single
title: "Sitemap"
permalink: /en/sitemap/
author_profile: true
lang: en
locale: en_US
translation_url: /sitemap/
description: "English-language pages on Xian Xu’s academic website."
---

<ul>
  <li><a href="{{ '/en/' | relative_url }}">Home</a></li>
  {% for link in site.data.navigation.en %}
    <li><a href="{{ link.url | relative_url }}">{{ link.title }}</a></li>
  {% endfor %}
</ul>
