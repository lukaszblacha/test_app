app.service('JsonpParser', function() {
	var monthNames = {
            '01': 'Januar',
            '02': 'Februar',
            '03': 'Mars',
            '04': 'April',
            '05': 'Mai',
            '06': 'Juni',
            '07': 'Juli',
            '08': 'August',
            '09': 'September',
            '10': 'Oktober',
            '11': 'November',
            '12': 'Desember'
        };
	var parseFeed = function( data ) {
		for(var i in data) {
			for( j in monthNames ) {
				data[i].date = data[i].date.replace( monthNames[j], j );
			}
			data[i].date = new Date(
                            data[i].date.replace( /^(\d+)\s+(\d+)\s+(\d+)/g, '$3-$2-$1' )
                                + 'T' // One of a few date formats supported by Firefox
                                + data[i].time
                        ).getTime();
                        if( isNaN(data[i].date) ) data[i].date = 0;
		}
		return data;
	};

	return {
		parse: function( data ) {
			return parseFeed(data);
		}
	};
});
