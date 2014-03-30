app.controller('LogController', ['$scope', 'LogLoader', 'LogParser','Storage',
function($scope, LogLoader, LogParser, Storage) {
	var downloadLogs = function() {
		LogLoader.load( '/logs/varnish.log', function(data) {
			$scope.logs = LogParser.parse(data);
			Storage.set('logs', $scope.logs);
		} );
	}

	$scope.pagination = {
		pageSize: 50,
		pageNumber: 0
	};

	$scope.logs = Storage.get('logs');
	if( $scope.logs===null ) {
		downloadLogs();
	}
	
	$scope.refresh = function() {
		downloadLogs();
	}
}]);