---
layout: post
title: "Bundling Aurelia Application"
date: 2015-06-13 14:34:25
categories: aurelia bundling 
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG

---

# Bundling Aurelia Application

Let's start with a controvertail statement, "*Bundling is an anti-pattern.*" We loose some benefits including fine grained caching for the assets when we bundle our application. Aurelia is a next generation framework that promotes good design patterns and practices. The next version of http, [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) will xxx the necessecity of crating bundle altogether. But, that's the ideal world scenerio and we are far from it. HTTP/2 is not yet implemented so bundling is needed right now. Nobody likes to see a production application making 256 requests upon loading. As, Aurelia is also about pargmatism, we have taken bundling seriously.


Let's dive in and create some bundles. We will use our favorite [skeleton-navigation](http://github.com/aurelia/skeleton-navigation) project as the basis of our work. First, we will run it as is and then we create bundle and see the dirrerence. Let's just quickly clone it with the command bellow:

> I asssume you have git installed on your machine. I am using the master branch of the project here. If you already have the latest skeleton-navigation up and running on your machine then skip these steps and go straight to [Installing CLI Section](#installing-cli) instead.


```bash
 git clone git@github.com:aurelia/skeleton-navigation.git
```

Now, `cd` into the project root and run the following commands:

```bash
 cd skeleton-navigation
 npm install 
 jspm install
```

> If you don't have `jspm` installed do `npm install -g jspm` before running these commands. 


At this point we can run the following gulp task to see our application running proudly.

```bash
 gulp serve
```

Up untill now, we have done nothing about bundling, we just setup our project to do that. Let's say, we have decided to put our project into production and we open the `browser dev tool` to see how many request are being made by the application: 

![No of requests been made](/assets/article_images/2015-06-13-bundling-aurelia-application/unbundled-aurelia-application.jpg)

258! Yep, that's a scarry picture for a production scenario. We want to minimize the number of requests. So, Let's call `Aurelia-CLI` to the resque. 


One last thing before bundling `skeleton-navigation`, We will change change `bootstrap.css` loding from `src\app.js` to `index.html` to do so follow these steps:

- Open `src\app.js` and delete line 2:  `import 'bootstrap/css/bootstrap.css!';`
- Open `index.html` and add `<link rel="stylesheet" type="text/css" href="jspm_packages/github/twbs/bootstrap@3.3.4/css/bootstrap.css">` inside the `head` tag.

> There is a possible bug in bundling css at the moment. By doing the above we are excluding css assets from being bundled.


## <a name="installing-cli"></a>Installing Aurelia CLI

Building apps with aurelia is a breeze. [Aurelia CLI](http://github.com/aurelia/cli) wishes to take it even further. This post is all about bundling, one of the features that CLI has. We will be writing a lot about CLI to showcase it's other interesting features and capabilites in the future. Let's run the command bellow to install it: 


```bash
 npm install -g aurelia-cli
```

For bundling, We need to install the tool locally too. To do so `cd` into `skeleton-navigation` project's root and run: 

```bash
 npm install aurelia-cli --save-dev
```

We are all set for creating our frst bundle. Bufore running our bundle command we will tell `cli` what to bundle. Let's add a `aureliafile.js` in the root of our project and use the configuration bellow:

```javascript
  var aurelia = require('aurelia-cli');

  aurelia.command('bundle', {
    js: {
      "dist/app-bundle": {
        modules: [
          '*',
          'aurelia-bootstrapper',
          'aurelia-http-client',
          'aurelia-router',
          'aurelia-animator-css',
          'github:aurelia/templating-binding@0.12.0',
          'github:aurelia/templating-resources@0.12.1',
          'github:aurelia/templating-router@0.13.0',
          'github:aurelia/loader-default@0.8.0',
          'github:aurelia/history-browser@0.5.0'
        ],
        options: {
          inject: true
        }
      }
    },
    template: {
      "dist/app-bundle": {
        pattern: 'dist/*.html',
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

We now should have a file in `dist\app-bundle.js`

Let's refresh our browser again keeping the dev tool open

> make sure you bust the cache.

Requests came down to  which is significant imporvement as far as number of requests are concern.

## Paths and maps are important

We have to keep the paths in mind when bundling app with cli. glob paths like `dist/*` or `dist/**/*` We have contributed back to jspm for this functionality. 

you can use minify as the option too, it will minify.

## Template bundle

This is just the javascript part but what about those views/templates. For a large app that can be quite a big number too. Well let's see how we can bundle them too. Add the template config section in the `arureliafile.js` as:

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

Now run `aurelia bundle` again. This time a new file named `app-bundle.html` should be created in the `dist` folder. And as you have set `inject` to true. A `<link rel="import" href="./dist/app-bundle.html">` tag been injected at the end of the `body` tag.

Now let's reload the application and see the request count. 

## Important things to keep in mind when bundling template

- Globs from the `baseURL`
- inject does inject a `<link rel="import" >` with an attribute named `aurelia-view-bundle` 
- That's how the `aurelia-loader` knows it.
