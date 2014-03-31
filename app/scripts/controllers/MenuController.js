app.controller('MenuController', ['$scope', '$element',
function($scope, $element) {
	
	$scope.toggleMenu = function() {
		$element.toggleClass('open');
	}


}]);