app.controller('LogController', ['$scope', 'LogLoader', 'LogParser','Storage', 'AppConfig',
function($scope, LogLoader, LogParser, Storage, AppConfig) {
	var downloadLogs = function() {
		$scope.loading=true;
		LogLoader.load( '/logs/varnish.log', function(data) {
			$scope.logs = LogParser.parse(data);
			Storage.set('logs', $scope.logs);
			$scope.loading=false;
		} );
	}

	var cfg = AppConfig.getConfig();

	$scope.pagination = {
		pageSize: 50,
		pageNumber: 0
	};

	if( cfg.caching.varnishlog ) {
		$scope.logs = Storage.get('logs');
		if( $scope.logs===null ) {
			downloadLogs();
		}
	} else {
		downloadLogs();
	}
	
	$scope.refresh = function() {
		downloadLogs();
	}
}]);