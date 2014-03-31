app.controller('NewsController', ['$scope', 'RSSLoader', 'RSSParser','Storage', 'AppConfig',
function($scope, RSSLoader, RSSParser, Storage, AppConfig) {
	var downloadFeed = function() {
		$scope.loading=true;
		RSSLoader.load( 'http://www.vg.no/rss/nyfront.php?frontId=1', function(data) {
			$scope.feed = RSSParser.parse(data);
			Storage.set('feed1', $scope.feed);
			$scope.loading=false;
		} );	
	}
	var cfg = AppConfig.getConfig();

	if( cfg.caching.feed1 ) {
		$scope.feed = Storage.get('feed1');
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