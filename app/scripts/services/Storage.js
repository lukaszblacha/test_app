app.service('Storage', ['FeatureTester', function(FeatureTester) {
	var storage = {};
	var selectedStorage;

	// Fake object behaving like localStorage or sessionStorage
	// Contains only basic functionality so event binding is not supported
	var memoryStorage = function() {};
	memoryStorage.prototype = {
		setItem: function(prop,val) {
			storage[prop]=val;
		},
		getItem: function(prop) {
			// Return null if property does not exist
			// to be compatible with session-storage and local-storage
			if( undefined===storage[prop] ) return null;
			return storage[prop];
		},
		removeItem: function(prop) {
			delete storage[prop];
		}
	};

	// Select the best available method of storage
	if( FeatureTester.check('localstorage') ) {
		selectedStorage = localStorage;
	} else if( FeatureTester.check('sessionstorage') ) {
		selectedStorage = sessionStorage;
	} else {
		selectedStorage = new memoryStorage();
	}
	
	// The service wraps default storage class
	// simplifying storage of objects
	return {
		get: function(prop) {
			var result = selectedStorage.getItem(prop);
			return result===null ? result : JSON.parse(result);
		},
		set: function(prop,val) {
			selectedStorage.setItem(prop,JSON.stringify(val));
		},
		del: function(prop) {
			selectedStorage.removeItem(prop);
		}
	};
}]);
