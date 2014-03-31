app.service('AppConfig', ['Storage', function(Storage) {
	var defaults = {
		caching: {
			feed1: true,
			feed2: true,
			varnishlog: true
		}
	};
	
	var cfg = Storage.get('appConfig');
	if( cfg===null ) {
		cfg = angular.copy(defaults);
		Storage.set('appConfig', cfg);
	}

	return {
		getDefaults: function() {
			return angular.copy(defaults);
		},
		getConfig: function() {
			return cfg;
		},
		setConfig: function(c) {
			cfg = c;
		},
		storeConfig: function() {
			Storage.set('appConfig', cfg);
		}
	};
}]);
