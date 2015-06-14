---
layout: post
title:  "Bundling Aurelia Application"
date:   2015-06-13 14:34:25
categories: aurelia bundling 
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG
---

#Bundling Aurelia Application

Let's start by saying that bundling is an antipattern. Aurelia is a next generation presentation framework and tryies to promote good design patterns and practises. http2 spec is underway and that will eleminate the need for bundling. But right now we need it. 

## Fine grained caching
HTTP2 enables fine grain caching on client side.

While bundling is good for http1 it may be an antipattern for http2. But that is for an ideal world. http2 is still a proposed standerd and will take time probably yeras to arrive. Right now we need bundling.


We will use our [skeleton-navigation](http://github.com/aurelia/skeleton-navigation) as the application. Let's just quickly clone it and give it a try.

> I asssume you have git installed on your machine.


```bash
git clone git@github.com:aurelia/skeleton-navigation.git
```

Now, `cd` into the project root and commands

```bash
 npm install 
 jspm install
```

> If you don't have `jspm` installed do `npm install -g jspm` before running these commands. 


At this point we can run the following gulp task to see our application running proudly.

```bash
 gulp serve

```

Up untill now, we have done nothing about bundling, we just setup our project to do that. Now at this point you have decided that enough is enough I want to put my project into production and you open the dev tool to see what's going in there. And you see

[put a image there]


If you just open the dev tool(assuming you are using chorme) you will see 126+ requests. For developemet it's what you need. It helps us debug issues and what not. But for production, well you are in trouble. We need bundle. So, here is `cli` to the resque. 

## Installing `Aurelia CLI`

Building app with aurelia is a treat. Aurelia cli wisesh to take it further.  Let's run the the command bellow:

```bash
npm install -g aurelia-cli
```


Now, let's install it local to our project too.

```bash
npm install aurelia-cli --save-dev
```

Bufore running our bundle command we will tell `cli` what to bundle. Let's add a `aureliafile.js` in the root of our project and use the configuration bellow:

```javascript
var aurelia = require("aurelia-cli");

aurelia.command("bundle", {
    js: {
        "dist/appbundle": {
            modules: [
              "app", "main", "about/**", "movies/**", "resources/**",
              "aurelia-bootstrapper",
              "aurelia-router",
              "aurelia-http-client",
              "aurelia-validation"
            ],
            options: {
                inject: true
            }
        }
    }
});
```

finally let's run the command bellow for the shell

```bash
aurelia bundle
```

We now have two files in `dist` folder

Let's refresh our browser again keeping the dev tool open

> make sure you bust the cache.

Requests came down to 4 which is significantly.

## Paths and maps are important

We have to keep the paths in mind when bundling app with cli. glob paths like `dist/*` or `dist/**/*` We have contributed back to jspm for this functionality. 

## Template bundle

```javascript
var aurelia = require("aurelia-cli");

aurelia.command("bundle", {
    js: {
        "dist/appbundle": {
            modules: [
              "app", "main", "about/**", "movies/**", "resources/**",
              "aurelia-bootstrapper",
              "aurelia-router",
              "aurelia-http-client",
              "aurelia-validation"
            ],
            options: {
                inject: true
            }
        }
    },
    template: {
        "dist/appbundle": {
            pattern: "**/*.html",
            options: {
                inject: true,
            }
        }
    }
});
```

As we can see we have added a template secton. 

- Globs from the `baseURL`
- inject does inject a `<link rel="import" >`
