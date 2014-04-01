app.service('RSSLoader', ['$http', 'FeatureTester',
function($http, FeatureTester) {
    var svc = {
        load: function( url, callback ) {
            if( undefined===callback ) return;
		
            // Oh dear, IE9 needs to complete request using xdr
            if( FeatureTester.check('xhr2')===false && FeatureTester.check('xdr')===true ) {
                var xdr = new XDomainRequest();
                xdr.open("get", url);
                xdr.onload = function(){
                    callback(xdr.responseText);
                };
                xdr.onerror = function() {
                    console.error('[XDomainRequest] Unable to load RSS feed');
                }
                xdr.send();
            } else {
                $http.get( url ).success( function(data) {
                    callback(data);
                } ).error( function(err, code) {
                    console.error('[ '+code+' ] Unable to load RSS feed.', err);
                });
            }
        }
    };

    return svc;
}]);