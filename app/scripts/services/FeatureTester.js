// Feature tester is a simplified replacement for modernizr
app.service('FeatureTester', function() {
	var tests = [];

	tests['localstorage'] = (function() {
        try {
            localStorage.setItem('_app_test_localstorage', 'test');
            localStorage.removeItem('_app_test_localstorage');
            return true;
        } catch(e) {
			return false;
		}
	})();

	tests['sessionstorage'] = (function() {
        try {
            sessionStorage.setItem('_app_test_localstorage', 'test');
            sessionStorage.removeItem('_app_test_localstorage');
            return true;
        } catch(e) {
			return false;
		}
	})();
	
	tests['xhr2'] = (function() {
		return ("withCredentials" in new XMLHttpRequest());
	})();
	
	tests['xdr'] = (function() {
		return ("XDomainRequest" in window);
	})();

	return {
		// Checks if the given feature is supported.
		// If the test does not exist returns undefined
		check: function(feature) {
			return tests[feature];
		}
	}
});