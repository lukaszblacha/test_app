app.service('RSSLoader', ['$http', function($http) {
	var svc = {
		load: function( url, callback ) {
			if( undefined===callback ) return;
			$http.get( url ).success( function(data) {
				callback(data);
			} ).error( function(err, code) {
				console.error('[ '+code+' ] There was an error while loading RSS feed:', err);
			});
		}
	};

	return svc;
}]);