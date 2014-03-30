app.service('JsonpLoader', ['$http', function($http) {
	var svc = {
		load: function( url, callback ) {
			if( undefined===callback ) return;
			// Angular automatically replaces JSON_CALLBACK and points on the
			// newly generated function name (e.g. angular.callbacks._X) so the
			// response eventually goes to success handler as usual
			$http.jsonp( url + "?callback=JSON_CALLBACK" ).success( function(data) {
				callback(data);
			} ).error( function(err, code) {
				console.error('['+code+'] Unable to complete Jsonp request:', err);
			});
		}
	};

	return svc;
}]);
