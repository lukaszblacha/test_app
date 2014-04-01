app.service('RSSParser', function() {
	var parseXML = function( xmlString ) {
		var data = xmlString.replace(/<link>(.*)<\/link>/ig, '<readmore>$1<\/readmore>');
		data = $(data).find('channel');

		// Parse feed entries
		var result = [];
		data.find("item").each(function () {
			var el = $(this);
			var item = {
				title:el.find("title").text(),
				date: new Date( el.find("pubDate").text() ).getTime(),
				description:el.find("description").text(),
				link: el.find("readmore").text()
			};
                        if( isNaN(item.date) ) item.date = 0;
			result.push(item);
		});

		return result;
	};
	
	var svc = {
		parse: function( data ) {
			return parseXML(data);
		}
	};

	return svc;
});
