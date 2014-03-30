app.filter('httpMethodLabelClass', function() {
    return function(code) {
		if( code===undefined ) return '';
		var c = code.toString();
		switch(c) {
			case 'GET': return 'label-success';
			case 'POST': return '';
			case 'PUT': return 'label-warning';
			case 'DELETE': return 'label-error';
			default: return 'label-inverse';
		}
    };
});
