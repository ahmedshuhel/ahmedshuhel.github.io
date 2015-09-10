---
layout: post
title: "Aurelia Bunder: Bundling Aurelia Application"
date: 2015-06-13 14:34:25
categories: aurelia bundling bundler
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG

---

Previously, Aurelia Loader used HTML Imports to load all  views. Now, as it is apparent that HTML Imports is not going to be standardized, We have replaced our default view loading mechanism with a SystemJS `text` based solution. The same is applied to css as well. To learn more about this change see [this post.](http://blog.durandal.io/2015/09/05/aurelia-early-september-release-notes/)  The reason we are saying it twice is because it changes how we would bundle our app.

Again previously, we were using Aurelia CLI to bundle our apps. Recently, it is been deprecated in favor of providing first class support for tools like gulp, grunt, yo etc. And, we have created a small focused bundling library [Aurelia Bundler.](http://github.com/aurelia/bundler)


In this post we will see how we can easily use [Aurelia Bundler](http://github.com/aurelia/bundler) and create a gulp task for bundling our app. Let's jump right into it. We will use `skeleton-navigation` as our app to bundle. If don't have that setup. Follow [these steps](https://github.com/aurelia/skeleton-navigation#running-the-app).

Now that we have our app running proudly, let's start by installing `aurelia-bundler`. To do so `cd` into `skeleton-navigation` and run the following command:

```shell
npm install aurelia-bundler --save-dev
```

Now, let's create a `bundle.js` file in `build/tasks/bundle.js` as:

```javascript
var gulp = require('gulp');
var bundle = require('aurelia-bundler').bundle;

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "dist/app-build": {
      includes: [
        '*',
        '*.html!text',
        '*.css!text',
        'bootstrap/css/bootstrap.css!text'
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/aurelia": {
      includes: [
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-animator-css',
        'github:aurelia/templating-binding',
        'github:aurelia/templating-resources',
        'github:aurelia/templating-router',
        'github:aurelia/loader-default',
        'github:aurelia/history-browser',
        'github:aurelia/logging-console'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('bundle', function() {
  return bundle(config);
});
```

with that file in place, Let's run the command bellow:

```shell
gulp bundle
```

Here are the things that happed after gulp is finished executing the task:

- A file `dist/app-build.js` is created.
- A file `dist/aurelia.js` is created.
- `config.js` is updated.


Now, if we refresh/reload the app, we will see a lot less network requests and our app is properly bundled.

Let us now take a closer look at the `config` object. We will skip `force` and `packagePath` for a moment. `bundles` is where we will focus now. You can create as many bundles as you want. Here we have created two. One for our source code and the other for all aurelia libs.

```javascript
    "dist/app-build": {
      includes: [
        '*',
        '*.html!text',
        '*.css!text',
        'bootstrap/css/bootstrap.css!text'
      ],
      excludes: [
        'npm:core-js',
        'github:jspm/nodelibs-process'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
```

- **dist/app-build** : This is where the bundle will be placed and the name of the bundle file will be `app-build.js`. As the baseURL for skeleton-navigation poited to `dist` folder, we named it `dist/app-build`.
- **includes** : We will specify all the moduels that we want to bundler here. As all our javascripts are in the `dist` folder and we have `path` rule configured in `config.js` that points to `dist` folder, if we simply specify `*` all our js module will be included. We can specify `*/**/*` here if we want to include all the subfolders.
- **`*.html!text`**: This includes all the templates in the bundle. the `!text` tells the bundler and loader that these will be bundled and loaded using the `text` plugin.   
- **`*.css!text`**: Like html templates, we are including all the css here. If you have previously used `plugin-css`, note that we are not using `!css` here. The aurelia-loader uses `text` plugin for loading css to analyze and do other interesting stuff like `scoping` etc.

- **excludes**: This is where we specify what we want to exclude from the bundle. For example, `*` includes all the js file in the `dist` folder, and we want `app.js` to exclude from the bundle, we would write:

```javascript
excludes : [
   'app',
]
```
- **inject**: If set to true, this will inject the bundle in `config.js`, so whenever the application needs a file within that bundle, the loader will load the entrire bundle, This is how we can achive lazy bundle loading. For a large app with multiple sub section, this we help us avoid loading everything upfront.

- **minify**: As the name sujjest.
> We are using system-builder under the cover. All the systemjs-builder options will work here.


This is all good but we already have developed application that usese `html import` based template loading. How do we bundle them. Here's how:

Let's add another bundle like:

```javascript
    "dist/view-bundle": {
      htmlimport: true,
      includes: 'dist/*.html',
      options: {
        inject: {
          indexFile : 'index.html',
          destFile : 'dest_index.html',
        }
      }
    }
```

If you are previously using `cli` to bundle this may look famalier. Only difference here is that, we have introduced some sort of uniformity in the config api. So let's examine this config:

- **dist/view-bundle** : The bundle file. Will be placed in dist/view-bundle.html.
- **htmlimport** : This is what makes it different from other bundle. If this is set to `true` the bundler will terat is as a html import based bundle and aurelia loader will give it a different treatment as well.
- **includes**: All the glob patters are supported here. Usually we would write a pattern that covers all the templates that we want to include in the bundle. Array of patterns are supported as well:
```javascript
includes : ['dist/**/*.html', '!dist/movie/*.html']
```
- **options** : if `inject` is set to `true` then a `<link rel="import" src="path\of\bundle.html" />` will be injected in the body of `index.html`. If we would like to keep our `index.html` clean and create a separate index file then we would set `indexFile` and `destFile`.

```javascript
destFile : 'dir/dest_index.html'
```
