---
layout: post
title:  "Bundling Aurelia Application"
date:   2015-06-13 14:34:25
categories: aurelia bundling 
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG
---

#Bundling Aurelia Application

Let's start by saying that bundling is an antipattern. Aurelia is a next generation presentation framework and tryies to promote good design patterns and practises. http2 spec is underway and that will eleminate the need for bundling. But right now we need it. Let's consider our [skeleton-navigation](http://github.com/aurelia/skeleton-navigation) for example.

## Fine grained caching
HTTP2 enables fine grain caching on client side.

While bundling is good for http1 it may be an antipattern for http2. But that is for an ideal world. http2 is still a proposed standerd and will take time probably yeras to arrive. Right now we need bundling.

If you just open the dev tool(assuming you are using chorme) you will see 126+ requests. For developemet it's what you need. It helps us debug issues and what not. But for production, well you are in trouble. We need bundle. So, here is `cli` to the resque. 

##wip
