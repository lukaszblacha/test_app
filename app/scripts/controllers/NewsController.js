app.controller('NewsController', ['$scope', 'RSSLoader', 'RSSParser','Storage',
function($scope, RSSLoader, RSSParser, Storage) {
	var downloadFeed = function() {
		RSSLoader.load( 'http://www.vg.no/rss/nyfront.php?frontId=1', function(data) {
			$scope.feed = RSSParser.parse(data);
			Storage.set('feed1', $scope.feed);
		} );	
	}

	$scope.feed = Storage.get('feed1');
	if( $scope.feed===null ) {
		downloadFeed();
	}
	
	$scope.refreshFeed = function() {
		downloadFeed();
	}
}]);