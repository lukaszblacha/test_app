app.filter('httpCodeIndicatorClass', function() {
    return function(code) {
		if( code===undefined ) return '';
		var c = code.toString();
		switch(c[0]) {
			case '2': return 'indicator-success';
			case '3': return '';
			case '4': return 'indicator-warning';
			case '5': return 'indicator-error';
			default: return 'indicator-inverse';
		}
    };
});
