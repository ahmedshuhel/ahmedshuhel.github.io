/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.2"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-8c264e0bd6127800f169.js"
  },
  {
    "url": "app.d72246cca25887c032a2.css"
  },
  {
    "url": "app-e1e894f76ad3208ee53a.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-44e9e3a2069d8df538ae.js"
  },
  {
    "url": "index.html",
    "revision": "3cec7886dea9866418394cd6cdcc850c"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "7199780e6661985d0ea3c4f138068d7f"
  },
  {
    "url": "component---src-templates-index-jsx.8bbe45bd733b50ad302f.css"
  },
  {
    "url": "component---src-templates-index-jsx-d400788176a24b5e3d05.js"
  },
  {
    "url": "0-869b303a2ac696e94e73.js"
  },
  {
    "url": "14-21ce13f9b146c92b765e.js"
  },
  {
    "url": "3-d700407648ca2b69e71a.js"
  },
  {
    "url": "1-ce69b10ed8f688a17441.js"
  },
  {
    "url": "static/d/115/path---index-6a9-IR1k5Cd5AWMfVdsriuBt6PlGs7Q.json",
    "revision": "7dc93f5e892ea97bbd13363a293bef8a"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "347b9a7e35faabba5067455332063789"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});