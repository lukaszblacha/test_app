#1 App
=========

Test application that displays data from a RSS feed, JSONP-loaded feed and Varnish log.

Requirements
----
To compile and use the project without problems you will need
  - some nodejs packages (*minify*, *uglifyjs*, *node-sass*) installed globally
  - *gzip* CLI tool
  - several extra server modules enabled (for Apache it would be *rewrite_module* and *deflate_module*)

This application runs on client-side only. There really is no backend.

> QUOTE
> asd

Text in *italic*

Version
----

0.1

Tech
-----------

Dillinger uses a number of open source projects to work properly:

* [EDITOR] - markdown editor
* [Ace Editor] - awesome web-based text editor
* [Marked] - a super fast port of Markdown to JavaScript
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [keymaster.js] - awesome keyboard handler lib by [@thomasfuchs]
* [jQuery] - duh 

Installation
--------------

Linux-based OS
```sh
./deploy.sh
```
Windows
```cmd
./deploy.bat
```

##### Configure Plugins. Instructions in following README.md files

* plugins/dropbox/README.md
* plugins/github/README.md
* plugins/googledrive/README.md

```sh
node app
```


License
----
MIT

###### Links
[john gruber]:http://daringfireball.net/
[@thomasfuchs]:http://twitter.com/thomasfuchs
[1]:http://daringfireball.net/projects/markdown/
[marked]:https://github.com/chjj/marked
[Ace Editor]:http://ace.ajax.org
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[keymaster.js]:https://github.com/madrobby/keymaster
[jQuery]:http://jquery.com
[@tjholowaychuk]:http://twitter.com/tjholowaychuk
[express]:http://expressjs.com
[EDITOR] http://dillinger.io/