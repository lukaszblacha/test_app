app.controller('JsonpController', ['$scope', 'JsonpLoader', 'JsonpParser', 'Storage', 'AppConfig',
function($scope, JsonpLoader, JsonpParser, Storage, AppConfig) {
	var downloadFeed = function() {
		$scope.loading=true;
		JsonpLoader.load( 'http://rexxars.com/playground/testfeed/', function(data) {
			$scope.feed = JsonpParser.parse(data);
			Storage.set('feed2', $scope.feed);
			$scope.loading=false;
		} );	
	}
	var cfg = AppConfig.getConfig();
	
	if( cfg.caching.feed2 ) {
		$scope.feed = Storage.get('feed2');
		if( $scope.feed===null ) {
			downloadFeed();
		}
	} else {
		downloadFeed();
	}

	$scope.refreshFeed = function() {
		downloadFeed();
	}
}]);
