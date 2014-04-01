app.service('LogLoader', ['$http', function($http) {
	return {
		load: function( url, callback ) {
			if( undefined===callback ) return;
			$http.get( url ).success( function(data) {
				callback(data);
			} ).error( function(err, code) {
				console.error('[ '+code+' ] Unable to load log file.', err);
			});
		}
	};

	return svc;
}]);