---
layout: post
title: "Aurelia Bunder: Bundling Aurelia Application"
date: 2015-06-13 14:34:25
categories: aurelia bundling bundler
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG

---

# What has changed for Aurlia Loader?

Pervisusly our views are being loaded with html import. It looks like the htmlimport spec is not going to standerized. This is why we have already changed the view loding mechanison for aurelia. We now take advantage of SystemJs `text` based loading for both tempaltes and css.  

# Aurelia CLI is deprecated. Is there any bundling solution now?
Since the existing echo system is great for developing aurelia application we decided have a first class support for `gulp` etc. So, we decided to make bundler a seperate lib so that it can be used from gulp or grunt or any other. workflow.

# Can we use aurelia bundler with gup

[Aurelia Bundler](http://github.com/aurelia/bundler) can easily be used within a gulp task. Let's jump right into it. We will use `skeleton-navigation` for our expample. If don't have that setup. Follow these steps.

Let's start by installing `aurelia-bundler`. To do so `cd` into `skeleton-navigation` and run the following command:

```shell
npm install aurelia-bundler --save-dev
```

Now, let's create a `bundle.js` file into `build/tasks/bundle.js`

```javascript
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
      excludes: [
        'npm:core-js',
        'github:jspm/nodelibs-process'
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

gulp.task('bundle', function(cb) {
  bundle(config).then(function() {
    cb();
  }).catch(function(err) {
    console.log(err);
  });
});

/*
var config = {
  force: true,
  packagepath: '.',
  bundles: {
    "dist/app-build": {
      includes: [
        '*',
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
    },
    "dist/view-bundle": {
      htmlimport: true,
      includes: 'dist/*.html',
      options: {
        inject: {
          indexfile : 'index.html',
          destfile : 'dest_index.html',
        }
      }
    }
  }
};

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
      excludes: [
        'npm:core-js',
        'github:jspm/nodelibs-process'
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
    },
    "dist/vendor": {
      includes: [
        'text',
        'github:jspm/nodelibs-process'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};
*/
```

with that in place if you run `gulp bundle` two file will be created. `config.js` will be updated.

Let's analyze what it does. We will skip `force` and `packagePath` for a moment. the configuration is all in `bundles`. You can create as many bundles as you want. Here we have created two. One for our source code and the other for all aurelia libs.

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
          indexfile : 'index.html',
          destfile : 'dest_index.html',
        }
      }
    }
```

If you are previously using `cli` to bundle this may look famalier. 
