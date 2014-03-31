app.controller('OptionsController', ['$scope', '$element', 'AppConfig', function($scope, $element, AppConfig) {
	$scope.cfg = AppConfig.getConfig();
	
	$scope.openConfig = function() {
		$('.options-container', $element).addClass('open');
	};

	$scope.closeConfig = function($evt) {
		if( $evt===undefined ) {
			$('.options-container', $element).removeClass('open');
		} else if($($evt.target).hasClass('options-container')) {
			$('.options-container', $element).removeClass('open');
		}
	};
	
	$scope.resetConfig = function() {
		$scope.cfg = AppConfig.getDefaults();
		AppConfig.setConfig($scope.cfg);
	}
	$scope.storeConfig = function() {
		AppConfig.setConfig($scope.cfg);
		AppConfig.storeConfig();
		$scope.closeConfig();
	}
}]);
