---
layout: post
title: "Aurelia Bunder: The Documentations"
date: 2015-11-18 14:34:25
categories: aurelia bundling bundler
tags: featured
image: /assets/article_images/2014-11-30-mediator_features/night-track.JPG

---

## Introduction

Most of the current major browsers limit the number of simultaneous connections per each hostname to six. That means that while six requests are being processed, additional requests for assets on a host will be queued by the browser. In the image below, the Chrome F12 developer tools network tabs shows the timing for assets required by the `welcome view` of skeleton-naviagation application.

[Include the image here.]

> We can see there are over 150 requests being made to load the firt view and while the first 6 requests are being processd the others are waiting. 

In the past, the common limit is only 2 connections. This may be sufficient in the beginning days of web pages as most of the contents are delivered in a single page load. However, it soon become the bottleneck when rich client applications like Aurelia are popular.

> You may ask if this limit can have such a great impact to performance, then why don't browser give us a higher limit so that user can enjoy better browsing experience. However, most of the well-known browsers choose not to grant our wish, so that the server will not be overloaded by small amount of browsers and end up classifying user as DDOS attacker.


## Bundling & Minification

This limit will not cause slowness in our application if we can manage the resource well and do not hit connection limit. When the page is first loaded, there is a first request which contain html content. When the browser process html content, it spawn more requests to load resource like js, css, images. It also execute javascript and send Ajax requests to server.

We have to compress the assets and make fewer (possibly less than 6) requests to load all the assests we need.Fortunately, static resources can be cached and only be downloaded the first time. If it cause slowness, it happen only on first page load and is still tolerable.


Bundling and minification is a technique you can use in Aurelia to improve request load time.  Bundling and minification improves load time by reducing the number of requests to the server and reducing the size of requested assets such as view, viewmodel and css. 


## Bundling Aurelia Application

We can  use [Aurelia Bundler](http://github.com/aurelia/bundler) and create a gulp task for bundling our app. Let's jump right into it. We will use `skeleton-navigation` as our app to bundle. If you don't have that setup. Follow [these steps](https://github.com/aurelia/skeleton-navigation#running-the-app).

Now that we have our app running, let's start by installing `aurelia-bundler`. To do so `cd` into `skeleton-navigation` and run the following command:

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
        '[*]',
        '*.html!text',
        '*.css!text',        
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/vendor-build": {
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
        'github:aurelia/logging-console',
        'bootstrap/css/bootstrap.css!text'
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
> Note that the bundle function returns a Promise.

with that file in place, Let's run the command bellow:

```shell
gulp bundle
```

Here are the things that happened after gulp is finished executing the task:

- A file, `dist/app-build.js` is created.
- A file, `dist/aurelia.js` is created.
- `config.js` is updated.

Now, if we refresh/reload the app from the browser, we will see a lot less network request. And, that means our app is properly bundled.

We can create as many bundles as we want. Here we have created two. One for our application code and other for Aurelia and thirdparty libs. 

We can create just a single bundle if we want that combines both application code and and thirdpary libs. The number of bundle we would like to have mostly depends on our application structure and the usage pattern of our app. For example, if our app has built in a way that actually is a collection of child-app/sections, then a `common` bundle for third party libs and a `bundle per section` makes much sense and performs better than a huge single bundle that needs to be loaded upfront.

# Duplicate Modules in Multiple Bundles.

Creating multiple bundle requires to be extra careful because multiple bundle may contain duplicate modules. Before explaining that we need to understand how bundling works behind the scene a bit. Let's consider the example modules `A` and `B` below: 

** a.js **

```javascript
 import b from './b';
 console.log('I am module `A`');
```

** b.js **

```javascript
 console.log('I am module `B`');
```

So, when we want to bundle `a.js`, the bundler will analyze the source code of the module and find the dependcies by tracing the `import` statements. Here bundler will yeild `b.js` as the dependency of `a.js` and ulimately place `b.js` in the bundle.  

Let us now take a closer look at the `config` object. We will skip `force` and `packagePath` for the moment. `bundles` is where we will focus now specifically the `includes`. 

```javascript
  bundles: {
    "dist/app-build": {
      includes: [
        '[*]',
        '*.html!text',
        '*.css!text',        
      ],
```
Please pay attention to the pattern `[*]`. Bundler support some glob patterns like `*`, `*/**` etc. `*` here means, we are interested to bundle all the `js` assents in `dist` folder(considering the `path` in `config.js`). So what does `[*]` mean here? Well, as we know bundler will trace the module dependencies from the import statements. Lot's of our code refers to the modules of `Aurelia` via `import` statements. For example: 

**users.js**

```javascript
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users{
  heading = 'Github Users';
  users = [];

  constructor(http){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  activate(){
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }
}
```

When bundler will analyze this file it will find `aurelia-framework` and `aurelia-fetch-client` as it's dependency and include in the bundle. But bundler does not stop there. It will recursively find the dependency of `aurelia-framework` and `aurelia-fetch-client` and will go on untill there nothing left.

```javascript 
  bundles: {
    "dist/app-build": {
      includes: [
        '*',
        '*.html!text',
        '*.css!text',        
      ],
```

Having `*` in the above config will create a bundle which will include lot's of `Aurelia` libraries including `aurelia-framework` and `aurelia-fetch-client`. If we conider the second bundle config `dist/vendor-build`, we have 'aurelia-bootstrapper' and 'aurelia-fetch-client'. `aurelia-bootstrapper` will yeild `aurelia-framework`. Ultimately we will end up with duplicate modules in both the bundles. 
        
Our goal is to create a bundle of our application code only. We have to somehow instruct the bundler not the recursively trace the dependencies. And, `[*]` is how we tell it.   

`[*]` will exclude the depenencies of each module that the glob patter `*` yeilds. In the above case it will exclude `aurelia-framework`, `aurelia-fetch-client` and so on. 


# Bundle Configuration

Here is a typical bundle configuration with all it's glory:

```javascript
    "dist/app-build": {
      includes: [
        '[*]',
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
        minify: true,
        rev: true
      }
    }
```

- **dist/app-build** : This is the name of the bundle and also where the bundle file will be placed. The name of the bundle file will be `app-build.js`. As the `baseURL` for `skeleton-navigation` pointed to `dist` folder, we named it `dist/app-build`.
- **includes** : We will specify all the modules/files that we want to include here. As all our javascripts are in the `dist` folder and we have `path` rule configured in `config.js` that points to `dist` folder, if we simply specify `*` all our `js` modules will be included. We can specify `*/**/*` here if we want to include all the subfolders.
- **`*.html!text`**: This includes all the templates/views in the bundle. the `!text` tells the Bundler and Loader that these files will be bundled and loaded using the `text` plugin.   
- **`*.css!text`**: Like html templates, we are including all the css here. If you have previously used `plugin-css`, note that we are not using `!css` here. The Aurelia Loader uses `text` plugin for loading css to analyze and do other interesting stuff like `scoping` etc.
- **excludes**: This is where we specify what we want to exclude from the bundle. For example, `*` includes all the js file in the `dist` folder, and for some reason if we want `app.js` to exclude from the bundle, we would write:

```javascript
excludes : [
   'app',
]
```
- **inject**: If set to this to true, this will inject the bundle in `config.js`, so whenever the application needs a file within that bundle, the loader will load the entire bundle the first time, This is how we can achieve lazy bundle loading. For a large app with multiple sub sections, this will help us avoid loading everything upfront.
- **minify**: As the name suggests, if this is set to `true`, the the source files will be minified as well.

 - **rev**: If this is set to `true`, an unique revision number will be appended to the bundle file name.

- **force** : If this is set to `true` the task will overwrite any existing file/bundle with the same name. Set it to false if you are not sure about it.
- **packagePath** : By default it's `'.'`, You can change this if your `package.json` file is somewhere else other than the base of your app. `aurelia-bundler` use this file to find `config.js`, `baseURL`, `jspm_packages` folder and other important project configuration.  


## Bundling HTML Imports

At this point if you are like, "Well, this is all good but we already have developed application that uses Polymer and  `HTML Imports` extensively. And we want to bundle them as well." As you may have already known, we have created a separate plugin [aurelia-html-import-template-loader](https://github.com/aurelia/html-import-template-loader) exclusively for this use case. We have bundling support for that too. This is how we can do it. It's actually a two part process. First let's install `aurelia-html-import-template-loader` with the command below:

```shell
 jspm install aurelia-html-import-template-loader
```

Now, let's open `src/main.js` and add this line: `aurelia.use.plugin('aurelia-html-import-template-loader')`. After the change `main.js` should look like:

```javascript
import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(a => a.setRoot());
}
```

With this little change Aurelia Loader will now use `HTML Imports` to load all the views. Now, back in our bundle task, we will add a `config` like:

```javascript
    "dist/view-bundle": {
      htmlimports: true,
      includes: 'dist/*.html',
      options: {
        inject: {
          indexFile : 'index.html',
          destFile : 'dest_index.html',
        }
      }
    }
```
And, we will also change the first bundle a little bit to exclude all the `html` and `css` files. Finally our `bundle.js` file should look like:

```javascript
var gulp = require('gulp');
var bundle = require('aurelia-bundler').bundle;

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "dist/app-build": {
      includes: [
        '[*]'
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
          indexFile : 'index.html',
          destFile : 'dest_index.html',
        }
      }
    }
  }
};

```
We have change the source code (src/main.js), so we need to rebuild our app. The command bellow should do that:

```shell
 gulp serve
```

> Note that, `serve` task is already configured in such a way that it runs `build` task first.

Now, let's run `gulp bundle` from another console/tab. If we now refresh/reload our app from the browser keeping the developer tools open, we should see the difference.

> Note that, order of running the tasks is important here. The `build` clears/removes all the files in `dist` folder. So, any bundle file in that folder will be deleted too. This is why we always have to run the `gulp bundle` after the `build` task is finished. If you are using `watch` you will have to be extra careful because every changes you make in the source file will trigger a `build` task that clears the `dist` folder and any bundles as well.

Let's examine the configuration now. If you were using `cli` previously this may look familiar. Only difference here is that, we have introduced some sort of uniformity in the `config` api. So let's examine this `config` one property at a time:

- **dist/view-bundle** : The name of the bundle file is `view-bundle.html` and will be placed in `dist` folder.
- **htmlimport** : This is what makes it different from other bundles. If this is set to `true` the bundler will treat it as a html import based bundle and aurelia loader will give it a different treatment as well.
- **includes**: This where we will specify what goes in the bundle. All the glob patterns are supported here including array of patterns and `!` based exclusion. For example:

```javascript
includes : ['dist/**/*.html', '!dist/movie/*.html']
```
The above pattern will bundle all the views in `dist` and it's child folders except everything in `dist/movie` folder.

- **options** : if `inject` is set to `true` then a `<link rel="import" href="path/of/bundle.html" >` will be injected in the body of `index.html`. If you would like to keep your `index.html` clean and create a separate index file then you have to set `indexFile` and `destFile`.

```javascript
indexFile: 'index.html'
destFile : 'dest_index.html'
```