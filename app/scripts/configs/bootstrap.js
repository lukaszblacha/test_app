var filters = angular.module('filters', [] );
var app = angular.module('app', [ 'filters', 'ngRoute' ]);
app.config(function($interpolateProvider) { $interpolateProvider.startSymbol('{['); $interpolateProvider.endSymbol(']}'); });

// Create routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
		when('/', { templateUrl: '/assets/views/index.html', controller: 'IndexController' }).
		when('/feed/', { templateUrl: '/assets/views/news.html', controller: 'NewsController' }).
		when('/log/', { templateUrl: '/assets/views/log.html', controller: 'LogController' }).
		when('/feed2/', { templateUrl: '/assets/views/news.html', controller: 'JsonpController' }).
        otherwise({ redirectTo: '/' });	
}]);

// Build menu
app.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.menu = {
		selectedRoot: '',
		items: [
			{ label: 'Varnish Log', route: '/log/', root: '/log/' },
			{ label: 'Feed #1', route: '/feed/', root: '/feed/' },
			{ label: 'Feed #2', route: '/feed2/', root: '/feed2/' }
		],
		navigate: function( item ) {
			$rootScope.menu.selectedRoot = item.root;
			$location.path(item.route);
		}
	};
}]);
