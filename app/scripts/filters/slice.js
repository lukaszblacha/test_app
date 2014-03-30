app.filter('slice', function() {
    return function(arr, pageSize, page) {
		if(arr.slice===undefined) return;
		var start = Math.min(arr.length,(page||0)*pageSize);
		var end = Math.min(arr.length, start+pageSize);
        return arr.slice(start, end);
    };
});
