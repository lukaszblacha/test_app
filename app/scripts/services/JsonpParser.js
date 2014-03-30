app.service('JsonpParser', function() {
	var monthNames = [ 'Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember' ];
	var parseFeed = function( data ) {
		for(var i in data) {
			for( j in monthNames ) {
				data[i].date = data[i].date.replace( monthNames[j], 1+j );
			}
			data[i].date = new Date( data[i].date.replace( /^(\d+)\s+(\d+)\s+(\d+)/g, '$3-$2-$1' ) + ' ' + data[i].time ).getTime();
		}
		return data;
	};

	return {
		parse: function( data ) {
			return parseFeed(data);
		}
	};
});
