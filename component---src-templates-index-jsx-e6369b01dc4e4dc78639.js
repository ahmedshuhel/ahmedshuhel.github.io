(window.webpackJsonp=window.webpackJsonp||[]).push([[6,2],{140:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return L});var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(153),c=n.n(s),l=n(293),u=n(183),p=n(225),m=n(148),h=n.n(m),f=n(164),d=n(182),g=n(168),v=n(170),y=n(172),E=n(174),b=n(176),N=n(178),C=n(226),x=n(228),w=n(259),k=n(233),T=n(196),A=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={menuOpen:!1},t.handleOnClick=function(e){e.stopPropagation(),t.state.menuOpen?t.closeMenu():t.openMenu()},t.handleOnClose=function(e){e.stopPropagation(),t.closeMenu()},t.openMenu=function(){t.setState({menuOpen:!0})},t.closeMenu=function(){t.setState({menuOpen:!1})},t}return r()(t,e),t.prototype.render=function(){var e=this.props.pageContext,t=e.nodes,n=e.page,a=e.pages,r=e.total,o=e.limit,s=e.prev,m=e.next,A=this.props.data.authors.edges;return i.a.createElement(T.a,{location:this.props.location},i.a.createElement(f.a,{className:"home-template",isOpen:this.state.menuOpen},i.a.createElement(c.a,{title:h.a.siteTitle}),i.a.createElement(p.a,{postEdges:t}),i.a.createElement(d.a,{config:h.a,onClose:this.handleOnClose}),i.a.createElement(g.a,null,i.a.createElement("div",{className:"home-template"},i.a.createElement(y.a,{cover:h.a.siteCover},i.a.createElement(E.a,{overlay:h.a.siteCover},i.a.createElement(b.a,{logo:h.a.siteLogo,title:h.a.siteTitle}),i.a.createElement(N.a,{navigation:h.a.siteNavigation,onClick:this.handleOnClick})),i.a.createElement("div",{className:"vertical"},i.a.createElement("div",{className:"main-header-content inner"},i.a.createElement(C.a,{text:h.a.siteTitle}),i.a.createElement(x.a,{text:h.a.siteDescription}),i.a.createElement(k.a,{urls:h.a.siteSocialUrls,color:"currentColor"}))),i.a.createElement(l.Link,{className:"scroll-down icon-arrow-left",to:"content","data-offset":"-45",spy:!0,smooth:!0,duration:500},i.a.createElement("span",{className:"hidden"},"Scroll Down"))),i.a.createElement(w.a,{page:n,pages:a,total:r,limit:o,prev:s,next:m},i.a.createElement(u.a,{postEdges:t,postAuthors:A}))),i.a.createElement(v.a,{copyright:h.a.copyright,promoteGatsby:h.a.promoteGatsby}))))},t}(i.a.Component),L="3144631907";t.default=A},148:function(e,t){e.exports={blogPostDir:"posts",blogAuthorDir:"authors",blogAuthorId:"ahmedshuhel",siteTitle:"Random Thoughts",siteTitleAlt:"Random Thoughts of Shuhel Ahmed",siteLogo:"https://haysclark.github.io/gatsby-starter-casper/logos/logo-1024.png",siteUrl:"https://blog.ahmedshuhel.com",pathPrefix:"/",siteDescription:"Random thougths on Programming, Software Engineering and Life",siteCover:"https://haysclark.github.io/gatsby-starter-casper/images/blog-cover.jpg",siteNavigation:!0,siteRss:"/rss.xml",siteRssAuthor:"Shuhel Ahmed",sitePaginationLimit:10,googleAnalyticsID:"UA-111982167-1",siteSocialUrls:["https://github.com/ahmedshuhel","https://twitter.com/ahmedshuhel","mailto:shuhel@ymail.com"],postDefaultCategoryID:"Tech",userLinks:[{label:"GitHub",url:"https://github.com/ahmedshuhel",iconClassName:"fa fa-github"},{label:"Twitter",url:"https://twitter.com/ahmedshuhel",iconClassName:"fa fa-twitter"},{label:"Email",url:"mailto:shuhel@ymail.com",iconClassName:"fa fa-envelope"}],copyright:{label:"Shuhel Ahmed",year:"2019",url:"https://blog.ahmedshuhel.com/"},themeColor:"#c62828",backgroundColor:"#e0e0e0",promoteGatsby:!1}},162:function(e,t,n){},163:function(e,t,n){},164:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(147),c=n.n(s),l=(n(165),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.isOpen,a=e.className,r=c()(a,n?"nav-opened":"nav-closed");return i.a.createElement("div",{className:r},t)},t}(i.a.Component));t.a=l},165:function(e,t,n){},166:function(e,t,n){},167:function(e,t,n){},168:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(169),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return i.a.createElement("div",{className:"site-wrapper"},e)},t}(i.a.Component));t.a=s},169:function(e,t,n){},170:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(171),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.promoteGatsby,t=this.props.copyright,n=t.label,a=t.url,r=t.year;return i.a.createElement("footer",{className:"site-footer clearfix"},i.a.createElement("section",{className:"copyright"},i.a.createElement("a",{href:a||"/"},n)," ©"," ",r||(new Date).getFullYear()),i.a.createElement(function(e){return e.show?i.a.createElement("section",{className:"poweredby"},"Proudly published with ",i.a.createElement("a",{href:"https://gatsbyjs.org"},"Gatsby")):null},{show:e}))},t}(o.Component));t.a=s},171:function(e,t,n){},172:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(147),c=n.n(s),l=(n(173),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.cover,a=c()("main-header",this.props.className,{"no-cover":!n});return i.a.createElement("header",{className:a,style:n?{backgroundImage:'url("'+n+'")'}:null},t)},t}(i.a.Component));t.a=l},173:function(e,t,n){},174:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(147),c=n.n(s),l=(n(175),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.className,a=c()("main-nav",["overlay","clearfix"],n);return i.a.createElement("nav",{className:a},t)},t}(i.a.Component));t.a=l},175:function(e,t,n){},176:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(33),c=(n(177),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.logo,n=e.url,a=e.title;return t?i.a.createElement(s.Link,{className:"blog-logo",to:n||"/"},i.a.createElement("img",{src:t,alt:a})):null},t}(o.Component));t.a=c},177:function(e,t,n){},178:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(179),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.navigation,n=e.onClick;return t&&n?i.a.createElement("a",{className:"menu-button icon-menu",href:"#menu",onClick:n},i.a.createElement("span",{className:"word"},"Menu")):null},t}(o.Component));t.a=s},179:function(e,t,n){},182:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=(n(22),n(73)),i=n.n(o),s=n(0),c=n.n(s),l=(n(74),n(33));var u=function(e){var t=[{primaryText:"Home",component:l.Link,to:"/"},{divider:!0}];return e.userLinks&&e.userLinks.forEach(function(e){t.push({primaryText:e.label,component:"a",href:e.url})}),t.push({divider:!0}),t.push({primaryText:"About",component:l.Link,to:"/about/"}),t},p=(n(166),n(167),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.url;return e?c.a.createElement("a",{className:"subscribe-button icon-feed",href:e},"Subscribe"):null},t}(c.a.Component)),m=function(){return null},h=function(e){var t=e.primaryText;return c.a.createElement("h3",null,t)},f=function(e){var t=e.primaryText,n=e.component,a=i()(e,["primaryText","component"]);return c.a.createElement("li",{className:"nav-opened",role:"presentation"},Object(s.createElement)(n,a,t))},d=function e(t,n){if("string"==typeof t||"number"==typeof t)return Object(s.createElement)(f,{key:t,primaryText:t});if(Object(s.isValidElement)(t))return t;var a,r=t.divider,o=t.subheader,c=t.nestedItems,l=i()(t,["divider","subheader","nestedItems"]);a=r?m:o?h:f;var u=Object.assign({},l,{key:t.key||n});return c&&(u.nestedItems=c.map(e)),Object(s.createElement)(a,u)},g=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.config,n=e.onClose,a=u(t);return c.a.createElement("div",null,c.a.createElement("div",{className:"nav"},c.a.createElement("h3",{className:"nav-title"},"Menu"),c.a.createElement("a",{href:"#close",className:"nav-close",onClick:n},c.a.createElement("span",{className:"hidden"},"Close")),c.a.createElement("ul",null,a.map(d)),c.a.createElement(p,{url:t.siteRss})),c.a.createElement("span",{className:"nav-cover"}))},t}(s.Component);t.a=g},183:function(e,t,n){"use strict";n(149);var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(33),c=(n(162),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.avatar,n=e.name;return t&&n?i.a.createElement("img",{className:"author-thumb",src:t,alt:n,"data-pin-nopin":"true"}):null},t}(i.a.Component)),l=n(184),u=n(148),p=n.n(u),m=n(185),h=n(186),f=n(187),d=n(188),g=n(189),v=(n(163),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e,t,n=(e=this.props.postEdges,t=this.props.postAuthors,e.map(function(e){return{path:e.node.fields.slug,tags:e.node.frontmatter.tags,cover:e.node.frontmatter.cover,title:e.node.frontmatter.title,date:e.node.frontmatter.date,author:g.a.getAuthor(t,e.node.frontmatter.author,p.a.blogAuthorId),excerpt:e.node.excerpt,timeToRead:e.node.timeToRead}}));return i.a.createElement("div",null,n.map(function(e){var t=e.title,n=e.path,a=e.excerpt,r=e.author,o=e.tags,u=e.date,p=e.post_class?e.post_class:"post";return i.a.createElement(h.a,{className:p,key:t},i.a.createElement(f.a,null,i.a.createElement("h2",{className:"post-title"},i.a.createElement(s.Link,{to:n},t))),i.a.createElement("section",{className:"post-excerpt"},i.a.createElement("p",null,a," ",i.a.createElement(s.Link,{className:"read-more",to:n},"»"))),i.a.createElement("footer",{className:"post-meta"},i.a.createElement(c,{avatar:r.image,name:r.name}),i.a.createElement(m.a,{url:"/author/"+r.uid,name:r.name}),i.a.createElement(l.a,{prefix:" on ",tags:o}),i.a.createElement(d.a,{date:u})))}))},t}(i.a.Component));t.a=v},184:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(264),c=n.n(s),l=n(33),u=(n(220),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.prefix,n=e.tags;return n?i.a.createElement("span",null,t,n.map(function(e,t,n){return i.a.createElement("span",{key:e},i.a.createElement(l.Link,{key:e,to:"/tags/"+c.a.kebabCase(e)},e),t!==n.length-1?", ":"")})):null},t}(o.Component));t.a=u},185:function(e,t,n){"use strict";n(149);var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(33),c=(n(221),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.name,n=e.url;return t&&n?i.a.createElement(s.Link,{to:n},t):null},t}(i.a.Component));t.a=c},186:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(222),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.className;return i.a.createElement("article",{className:n},t)},t}(i.a.Component));t.a=s},187:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(223),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return i.a.createElement("header",{className:"post-header"},e)},t}(i.a.Component));t.a=s},188:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(266),c=n.n(s),l=(n(224),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.date;return i.a.createElement("time",{className:"post-date",dateTime:c()(new Date(e)).format("YYYY-MM-DD")},c()(new Date(e)).format("DD MMMM YYYY"))},t}(i.a.Component));t.a=l},189:function(e,t,n){"use strict";n(75);var a=function(e){return function(t){return t.uid===e}},r=function(e){return e.map(function(e){return e.node})},o=function(){function e(){}return e.hasAuthor=function(e,t){var n=r(e);return Boolean(n.find(a(t)))},e.getAuthor=function(e,t,n){var o=r(e);return this.hasAuthor(e,t)?o.find(a(t)):o.find(a(n))},e}();t.a=o},196:function(e,t,n){"use strict";n.d(t,"a",function(){return p});n(269),n(270),n(24);var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(153),c=n.n(s),l=n(148),u=n.n(l),p=(n(244),function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var n=t.prototype;return n.getLocalTitle=function(){function e(e){return e.charAt(0).toUpperCase()+e.slice(1)}var t=u.a.pathPrefix?u.a.pathPrefix:"/",n=this.props.location.pathname.replace(t,"").replace("/",""),a="";if(""===n)a="Home";else if("tags/"===n)a="Tags";else if("categories/"===n)a="Categories";else if("about/"===n)a="About";else if(n.includes("posts"))a="Article";else if(n.includes("tags/")){a="Tagged in "+e(n.replace("tags/","").replace("/","").replace("-"," "))}else if(n.includes("categories/")){a=""+e(n.replace("categories/","").replace("/","").replace("-"," "))}return a},n.render=function(){var e=this.props.children;return i.a.createElement("div",null,i.a.createElement(c.a,null,i.a.createElement("title",null,u.a.siteTitle+" |  "+this.getLocalTitle()),i.a.createElement("meta",{name:"description",content:u.a.siteDescription})),e)},t}(i.a.Component))},200:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(147),c=n.n(s),l=(n(201),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children,t=c()("content",this.props.className);return i.a.createElement("main",{id:"content",className:t,role:"main"},e)},t}(i.a.Component));t.a=l},201:function(e,t,n){},220:function(e,t,n){},221:function(e,t,n){},222:function(e,t,n){},223:function(e,t,n){},224:function(e,t,n){},225:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(153),c=n.n(s),l=n(148),u=n.n(l),p=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e,t,n,a,r=this.props,o=r.postNode,s=r.postPath,l=r.postSEO;if(l){var p=o.frontmatter;e=p.title,t=p.description?p.description:o.excerpt,n=p.cover,a=u.a.siteUrl+u.a.pathPrefix+s}else e=u.a.siteTitle,t=u.a.siteDescription,n=u.a.siteLogo;var m="/"===u.a.pathPrefix?"":u.a.pathPrefix;n=u.a.siteUrl+m+n;var h=u.a.siteUrl+u.a.pathPrefix,f=[{"@context":"http://schema.org","@type":"WebSite",url:h,name:e,alternateName:u.a.siteTitleAlt?u.a.siteTitleAlt:""}];return l&&f.push([{"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":a,name:e,image:n}}]},{"@context":"http://schema.org","@type":"BlogPosting",url:h,name:e,alternateName:u.a.siteTitleAlt?u.a.siteTitleAlt:"",headline:e,image:{"@type":"ImageObject",url:n},description:t}]),i.a.createElement(c.a,null,i.a.createElement("meta",{name:"description",content:t}),i.a.createElement("meta",{name:"image",content:n}),i.a.createElement("script",{type:"application/ld+json"},JSON.stringify(f)),i.a.createElement("meta",{property:"og:url",content:l?a:h}),l?i.a.createElement("meta",{property:"og:type",content:"article"}):null,i.a.createElement("meta",{property:"og:title",content:e}),i.a.createElement("meta",{property:"og:description",content:t}),i.a.createElement("meta",{property:"og:image",content:n}),i.a.createElement("meta",{property:"fb:app_id",content:u.a.siteFBAppID?u.a.siteFBAppID:""}),i.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),i.a.createElement("meta",{name:"twitter:creator",content:u.a.userTwitter?u.a.userTwitter:""}),i.a.createElement("meta",{name:"twitter:title",content:e}),i.a.createElement("meta",{name:"twitter:description",content:t}),i.a.createElement("meta",{name:"twitter:image",content:n}))},t}(o.Component);t.a=p},226:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(227),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.text;return e?i.a.createElement("h1",{className:"page-title"},e):null},t}(i.a.Component));t.a=s},227:function(e,t,n){},228:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=(n(229),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.text;return e?i.a.createElement("h2",{className:"page-description"},e):null},t}(i.a.Component));t.a=s},229:function(e,t,n){},230:function(e,t,n){},231:function(e,t,n){},232:function(e,t,n){},233:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(267),c=(n(243),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.urls,n=e.color;return t&&t.length>0?i.a.createElement("div",{className:"social-media-icons"},t.map(function(e){return i.a.createElement(s.SocialIcon,{key:e,className:"social-media-icon",url:e,color:n,style:{height:null,width:null}})})):null},t}(i.a.Component));t.a=c},243:function(e,t,n){},244:function(e,t,n){},259:function(e,t,n){"use strict";var a=n(5),r=n.n(a),o=n(0),i=n.n(o),s=n(200),c=(n(22),n(33)),l=(n(230),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){if(this.props.url){var e="nav-link";this.props.className&&(e=e+" "+this.props.className);var t=Object.assign({},this.props);return delete t.style,delete t.className,delete t.text,delete t.url,i.a.createElement(c.Link,Object.assign({to:this.props.url},t,{className:e}),this.props.text)}return null},t}(i.a.Component)),u=(n(231),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.page,n=e.pages,a=e.prev,r=e.next;return i.a.createElement("nav",{className:"pagination"},i.a.createElement(l,{className:"newer-posts",url:a,text:"← Newer Posts"}),i.a.createElement("span",{className:"page-number"},"Page ",t," of ",n),i.a.createElement(l,{className:"older-posts",url:r,text:"Older Posts →"}))},t}(i.a.Component)),p=(n(232),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.page,n=e.pages,a=e.prev,r=e.next,o=e.children,c="";return t>1&&(c+=" paged"),i.a.createElement(s.a,{className:c},i.a.createElement("div",{className:"extra-pagination inner"},i.a.createElement(u,{page:t,pages:n,prev:a,next:r})),o,i.a.createElement(u,{page:t,pages:n,prev:a,next:r}))},t}(i.a.Component));t.a=p}}]);
//# sourceMappingURL=component---src-templates-index-jsx-e6369b01dc4e4dc78639.js.map