---
layout: post
title: "Bundling Aurelia Application"
date: 2015-06-13 14:34:25
categories: aurelia bundling 
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG

---

# Bundling Aurelia Application

Let's start with a controvertail statement, "*Bundling is an anti-pattern.*" We loose some benefits including fine grained caching for the assets when we bundle our application. Aurelia is a next generation framework that promotes good design patterns and practices. The next version of http, [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) will obsolete the necessecity of crating bundle altogether. But, that's the ideal world scenerio and we are far from it. HTTP/2 is not yet implemented so, bundling is needed right now. Nobody likes to see a production application making 256 requests upon loading. As, Aurelia is also about pargmatism, we have taken bundling seriously.


Let's dive in and create some bundles. We will use our favorite [skeleton-navigation](http://github.com/aurelia/skeleton-navigation) project as the basis of our work. First, we will run it as is and then we will create bundle and see the difference. Let's just quickly clone it with the command bellow:

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


One last thing before bundling `skeleton-navigation`, we need to change the `config.js` file a little bit to switch off building `css`. Add `buildCSS: false` in the `config.js`, so that the file should eventually looks like:

```javascript
System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "es7.decorators",
      "es7.classProperties",
      "runtime"
    ]
  },
  "paths": {
    "*": "dist/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "buildCSS": false
});

System.config({
  "map": {
    "aurelia-animator-css": "github:aurelia/animator-css@0.3.2",
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.13.1",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
 ...
 ...

```


> There is a possible bug in bundling css at the moment even if you try with `jspm bundle app outfile`. Our `src/app.js` is importing `bootstrap.css` with `import 'bootstrap/css/bootstrap.css!';` using `plugin-css`. Without changing `config`, cli or jspm will crash at the moment. We will investigate further about it and let you know as soon as we come up with a solution. Anyways, our focus of this post is bundling `js` and `aurelia templates`. So, we can ignore css for now.


## <a name="installing-cli"></a>Installing Aurelia CLI

Building apps with aurelia is a breeze. [Aurelia CLI](http://github.com/aurelia/cli) wishes to take it even further. This post is all about bundling, one of the features that CLI has. We will be writing a lot about how CLI can make our life even easier with it's interesting features and capabilites. Let's run the command bellow to install it: 


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
          inject: true,
          minify: true
        }
      }
    }
  });
```

finally let's run the command bellow from the shell

```bash
aurelia bundle
```

Everything should go well and We now should have a file named `app-bundle.js` in `dist` folder. As per the configuration in `aureliafile`, we have `inject` set to true. This injects the bundle in `config.js`. Thue the bundle will be automatically loaded  when application rquests any of the bundled modules. We also have `minify` set to `true`. As you can guess, this minifies the created bundle. Thus, reduces the size significatly. 


Let's refresh our browser again keeping the dev tool open and see what what happens:

> Make sure you clear the browser cache to see the result.

![No of requests after bundling](/assets/article_images/2015-06-13-bundling-aurelia-application/after-js-bundling.jpg)


15 requests! That's a significat improvement over 256. But, we can make it even better. As we can see in the picture, we have some requrests for templates, `app.html`, `nav-bar.html` etc. In skeleton-navigation we have only only 5 templates. But, a non trivial app may have 100s or even more such templates. So, we need a way to bundle them as well. And, `Aurelia CLI` does have an answer to that too!


## Bundling Templates 

Let's teach `cli` which templates to bundle. We will add a template configuration section in `arureliafile.js` so that file eventually looks as:

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
          inject: true,
          minify: true
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

Let's run `aurelia bundle` again. This time a new file named `app-bundle.html` should be created in the `dist` folder. This bundle contains/includes all our templates in way that [aurelia-loader](http://github.com/aurelia/loader) knows how to handle. And, as we have set `inject` to true, a `<link aurelia-view-bundle rel="import" href="./dist/app-bundle.html">` tag been injected at the end of the `body` tag in `index.html`. Thus, we don't have to do anyting manually to include the template bundle.

> You may have to run `aurelia bundle --force` as, we alreay have a js bundle at this point in `dist` folder. 

Now, let's reload the application and see the request count again: 

![No of requests after bundling](/assets/article_images/2015-06-13-bundling-aurelia-application/after-bundling-templates.jpg)


10 Requests. That's better, isn't it. 
## Important things to keep in mind when bundling template

- Globs from the `baseURL`
- inject does inject a `<link rel="import" >` with an attribute named `aurelia-view-bundle` 
- That's how the `aurelia-loader` knows it.

## Paths and maps are important

We have to keep the paths in mind when bundling app with cli. glob paths like `dist/*` or `dist/**/*` We have contributed back to jspm for this functionality. 

you can use minify as the option too, it will minify.
