app.controller('JsonpController', ['$scope', 'JsonpLoader', 'JsonpParser', 'Storage',
function($scope, JsonpLoader, JsonpParser, Storage) {
	var downloadFeed = function() {
		JsonpLoader.load( 'http://rexxars.com/playground/testfeed/', function(data) {
			$scope.feed = JsonpParser.parse(data);
			Storage.set('feed2', $scope.feed);
		} );	
	}

	$scope.feed = Storage.get('feed2');
	if( $scope.feed===null ) {
		downloadFeed();
	}

	$scope.refreshFeed = function() {
		downloadFeed();
	}
}]);