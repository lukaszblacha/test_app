/*	
	ui.switch.js - 2014-03-30
	==============================================================
	Creates iOS-like switch button that replaces default checkbox
	Copyright 2014 Łukasz Blacha
*/

// Default configuration for directive
app.value('uiSwitchDefaults', {
	label0: 'O',
	label1: 'I',
} );

// UI Switch directive
app.directive('uiSwitch', function factory( uiSwitchDefaults, $timeout ) {
    var directiveDefinitionObject = {
        restrict: 'A',
		replace: true,
		template: '<div>\
			<div class="ui-switch-outer">\
				<div class="ui-switch-inner ui-switch-position" ng-click="toggleSwitch()">\
					<div><span>{[ options.label1 ]}</span></div>\
					<div><span>{[ options.label0 ]}</span></div>\
				</div>\
			</div>\
			<div class="ui-switch-thumb ui-switch-position" ng-click="toggleSwitch()"></div>\
		</div>',
		controller: function($scope, $element, $attrs, $transclude) {},
		scope: { model:'=ngModel', disabled:'=ngDisabled' },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                post: function(scope, element, attrs, controller) {
					scope.options={};
					scope.modelType='undefined';

					scope.toggleSwitch = function() {
						if( scope.disabled ) return;
						$timeout( function() {
							if( scope.modelType!=='undefined' ) { // modify value only if it's bound to model
								scope.value = scope.value==false;
							}
							if( scope.value!==scope.model ) {
								if( scope.modelType!=='undefined' ) scope.model=scope.value;
								if( typeof scope.change==='string' ) scope.$parent.$eval( scope.change );
							}
						});
					}

                    attrs.$observe('uiSwitch', function(value) {
						scope.options = {};
						angular.extend( scope.options, uiSwitchDefaults, scope.$parent.$eval(value) );
						if( scope.value===undefined ) false;
						if( scope.options.size ) {
							element.css( { fontSize:scope.options.size+'px' } );
						}
                    });
					
					attrs.$observe('ngValue', function(value) {
						if( scope.valueWatcher!==undefined ) {
							scope.valueWatcher();
							delete scope.valueWatcher;
						}
						if( value!==undefined ) {
							scope.valueWatcher = scope.$parent.$watch( value, function() {
								scope.value=scope.$parent.$eval(value);
							} );
						}
					});

					attrs.$observe('uiChange', function(value) {
						scope.change=value;
					});
					
					scope.$watch( 'value', function() {
						if(  parseInt(scope.value)==false || scope.value===false ) $('.ui-switch-position',element).css( {left:'-1em'} );
						else $('.ui-switch-position',element).css( {left:'0'} );
					} );

					scope.$watch( 'disabled', function() {
						if(  scope.disabled ) element.css( {opacity:'0.5'} );
						else element.css( {opacity:'1'} );
					} );

					scope.$watch( 'model', function() {
						scope.modelType = typeof scope.model;
						if( scope.modelType!=='undefined' ) scope.value = (parseInt(scope.model)==true || scope.model===true);
					} );

                }
            }
        }
    };

    return directiveDefinitionObject;
});