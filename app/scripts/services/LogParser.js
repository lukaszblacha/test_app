app.service('LogParser', function() {
	var parseLog = function( logString ) {
		var lines = logString.split('\n');

		var regexParts = [
			'(\\d+.\\d+.\\d+.\\d+)', // IP address
			'\\s+-\\s-\\s+',
			'\\[([^\\]]*)]',				 // Date
			'\\s+',
			'"([^"\\\\]+)"',	 			// HTTP Request Address and Method
			'\\s+',
			'(\\d+)',						// HTTP Response Code
			'\\s+',
			'(\\d+)',						// Content Size ?
			'\\s+',
			'"([^"\\\\]+)"',	 			// Referrer ?
			'\\s+',
			'"([^"\\\\]+)"'	 			// User Agent
		];
		var regex = new RegExp( '^' + regexParts.join('') + '$', 'g');
		var replacement = "$1\n$2\n$3\n$4\n$5\n$6\n$7";
		var result = [];
		for( var i in lines ) {
			var data = lines[i].replace( regex, replacement ).split('\n');
			if( !data.length==7 ) continue;
			var date = data[1] ? new Date((data[1]).replace( /(\d+)\/(\w+)\/(\d+)/g, '$3 $2 $1' ).replace(":", " ")).getTime() : null;
			var header = (data[2] || '').split(' ');
			var item = {
				ip: data[0],
				date: date,
				method: header[0] || '',
				header: header[1] || '',
				responseCode: data[3],
				contentSize: parseInt(data[4]),
				referrer: data[5],
				userAgent: data[6],
				raw: lines[i]
			};
			result.push(item);
		}
		return result;
	};
	
	return {
		parse: function( data ) {
			return parseLog(data);
		}
	};
});