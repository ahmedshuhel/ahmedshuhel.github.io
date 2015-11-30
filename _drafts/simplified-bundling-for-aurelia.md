# Simplified Bundling for Aurelia Application


## Problem Description

Most of the time users are in trouble with how to bundle the application. The problem is user ofter time don't know what to include in the bundle and what to exclude. Often times it's a trial and error process by looking at the network tab of the browser.

for example a typical bundle config for looks like:

```javascript

```

As we can see we have to mannully include the files/modules we want here. 

In contrast to that for example angular or any other jspm depended application can do this:

```shell
 jspm bundle app/boot dist/bundle.js -im
``` 

As far as user is concern this is far simpler and less error prone in "Most" cases. Yes there are some conrer cases that user/developer needs to do some advanced stuff but the above command will work in most cases.

As long as Aurelia is concern we cannot do that becasuse all the application dependencies are not staticly tracable as our `router` and `di` is loading and resolving them dynamically during runtime of the app.

This is one of the most beautiful aspect of Aurelia as it helps promote our vision of less framework intrusion and keep the app modular over time. Somewhat of disadvantage for `bundler`.

## Proposal 

At this point of time `JSPM/SystemJS Builder` can be used to replace `Aurelia Bundler` almost anytime. Our bundler does very few things that like `Versioning` etc. This does not qutie justifies it's existance. To justfiy it's name `Aurelia Bundler` it should in theory understand the Framework at least and should let user bundle like this:

```shell 
var bundler = require('aurelia-bundler');

gulp.task('bundle', function(){
    bundler.bundle({
	  "dist/app-build" : {
		 include : ['src/app'],
		 options : {
			minify: true,
			rev: true,		   
		 }
	   }
	})
});

```
And the bundle will resolve all the dependencies including Aurelia Plugins etc. This is ambitous. But, I have been thinking about it for a long time. And I belive I can pull this off. By know Aurelia dependencies including Plugins the bundler can call it self a ture Aurelia Bundler.

## How I would procced

For the convenience of discussion let's say there are two types of dependencies in an Aurelia Applicatin code.

1. Static Dependencies:


2. Dynamic Dependencies:


There is no problem at all for tracing static dependenies infact it's what we are doing now. And conder it done.

- Tracing Dependencies from Views.
- Tracing Dependencies from Application Code.
- Tracing Dependencies for Plugins.

## Hook for SystemJS Builder.

it has not extension point currently. So, I would create one and provide functions that extends it capabily by accepting the `asset specific` custom analyzer for Aurelia. 

## Aurelia View Dependency Analyzer

## Aurelia View Model Dependency Analyzer.

- Find `Router` config and resolve dependencies.
- Will find attributes, databind syntax and resolve dependencies
