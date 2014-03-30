app.filter('urlToFileName', function() {
    return function(url) {
		if( url===undefined ) return '';
		var c = url.toString();
		c = c.substring( c.lastIndexOf('/')+1, c.length );
		return c || '/';
    };
});
