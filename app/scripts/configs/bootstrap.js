var app = angular.module('app', [ 'ngRoute' ]);

// Replace default templating brackets. Useful when templates
// are pre-generated using different templating system like Twig
app.config(function($interpolateProvider) { $interpolateProvider.startSymbol('{['); $interpolateProvider.endSymbol(']}'); });

// Create routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
		when('/feed/', { templateUrl: '/assets/views/news.html', controller: 'NewsController' }).
		when('/log/', { templateUrl: '/assets/views/log.html', controller: 'LogController' }).
		when('/feed2/', { templateUrl: '/assets/views/news.html', controller: 'JsonpController' }).
        otherwise({ redirectTo: '/feed' });	
}]);

// Build menu
app.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.menu = {
		items: [
			{ label: 'Varnish Log', route: '/log/' },
			{ label: 'Feed #1', route: '/feed/' },
			{ label: 'Feed #2', route: '/feed2/' }
		]
	};
	// Save new location to properly display active menu item
	$rootScope.$on('$routeChangeStart', function(evt, next, current) { 
		$rootScope.menu.selectedRoute = next.$$route.originalPath;
	});
}]);
