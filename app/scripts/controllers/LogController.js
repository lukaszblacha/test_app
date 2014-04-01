app.controller('LogController', ['$scope', 'LogLoader', 'LogParser','Storage', 'AppConfig',
function($scope, LogLoader, LogParser, Storage, AppConfig) {
	var downloadLogs = function() {
		$scope.loading=true;
		LogLoader.load( '/logs/varnishlog', function(data) {
			$scope.logs = LogParser.parse(data);
			countLoad();
			Storage.set('logs', { 
				logs: $scope.logs,
				hosts: $scope.hosts,
				urls: $scope.urls
			});
			$scope.loading=false;
		} );
	};

	var objValueCriterium = function( prop ) {
		return function(a,b) {
			return b[prop]<a[prop];
		}
	};
	
	var countLoad = function() {
		var mostVisitedHosts = [];
		var mostVisitedLinks = [];
		var urls = {};
		var hosts = {};
		for( var i in $scope.logs ) {
			var url = $scope.logs[i].header;
			if( undefined===urls[url] ) urls[url]=1;
			else urls[url]++;
			var host = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
			if( host!==null ) {
				host = host[1];
				if( undefined===hosts[host] ) hosts[host]=0;
				hosts[host]+=$scope.logs[i].contentSize;
			}
		}
		var sortFunction = objValueCriterium('count');
		for( var i in urls ) {
			if( mostVisitedLinks.length<5 ) {
				mostVisitedLinks.push( { url:i, count:urls[i] } );
			} else {
				mostVisitedLinks = mostVisitedLinks.sort( sortFunction );
				if( urls[i]>mostVisitedLinks[0].count ) {
					mostVisitedLinks[0] = { url:i, count:urls[i] };
				}
			}
		}
		$scope.urls = mostVisitedLinks.sort( function(a,b) { return sortFunction(b,a) } );

		var sortFunction = objValueCriterium('load');
		for( var i in hosts ) {
			if( mostVisitedHosts.length<5 ) {
				mostVisitedHosts.push( { host:i, load:hosts[i] } )
			} else {
				mostVisitedHosts = mostVisitedHosts.sort( sortFunction );
				if( hosts[i]>mostVisitedHosts[0].load ) {
					mostVisitedHosts[0] = { host:i, load:hosts[i] };
				}
			}
		}
		$scope.hosts = mostVisitedHosts.sort( function(a,b) { return sortFunction(b,a) } );
	}

	var cfg = AppConfig.getConfig();

	$scope.pagination = {
		pageSize: 50,
		pageNumber: 0
	};

	if( cfg.caching.varnishlog ) {
		var data = Storage.get('logs');
		if( data===null ) {
			downloadLogs();
		} else {
			$scope.logs = data.logs;
			$scope.hosts = data.hosts;
			$scope.urls = data.urls;
		}
	} else {
		downloadLogs();
	}
	
	$scope.refresh = function() {
		downloadLogs();
	};
}]);
