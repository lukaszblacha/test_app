#1 App
=========

Test application that displays data from a RSS feed, JSONP-loaded feed and Varnish log.

Dependencies
--------------
To compile and use the project without problems you will need
  - some nodejs packages (*minify*, *uglifyjs*, *node-sass*) installed globally
  - *gzip* CLI tool
  - Apache server with PHP to serve static files
  - several extra server modules enabled (for Apache it would be *rewrite_module* and *deflate_module*)

Installation
--------------
After GIT clone command go to the root directory of application (*/<app_root>/*) and run deployment script. It will automatically generate and minify assets like CSS and JavaScript files and views used by angular.js. These files will be gzipped as well.

Linux-based OS
```sh
./deploy.sh
```
Windows
```cmd
./deploy.bat
```
Next you need to register a domain (e.g. *app.loc*) pointing to */<_app_root>/web/* directory and that's it. Go to *http://app.loc* and check if page loads normally.

Development and production mode
---------------
Since there is no backend you need to manually take care of this kind of tasks. To switch to production mode just replace all javascript and stylesheet occurences in *index.html* to point to *.min.js* and *.min.css* files.

Known bugs
---------------
  - RSS Feed server uses CORS which is only partially supported in IE9. We use XDR to fetch remote data but the loaded file has wrong character encoding. Did not found a way to convert it from ISO-8859-1 to UTF-8 yet.

License
--------------
MIT
