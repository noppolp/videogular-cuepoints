(function(){
'use strict';
angular.module('uk.ac.soton.ecs.videogular.plugins.cuepoints', [])
	.directive(
		'vgCuepoints',
		[function() {
			return {
				restrict: 'E',
				require: '^videogular',
				templateUrl: 'bower_components/videogular-cuepoints/cuepoints.html',
				scope: {
					cuepoints: '=vgCuepointsConfig',
					theme: '=vgCuepointsTheme',
				},
				link: function($scope, elem, attr, API) {
					// shamelessly stolen from part of videogular's updateTheme function
					function updateTheme(value) {
						if (value) {
							var headElem = angular.element(document).find("head");
							headElem.append("<link rel='stylesheet' href='" + value + "'>");
						}
					}

					$scope.calcLeft = function(cuepoint) {
						if (API.totalTime === 0) return '-1000';

						var videoLength = API.totalTime / 1000;
						return (cuepoint.second * 100 / videoLength).toString();
					};

					$scope.onCuePointClick = function(cuepoint){
						API.seekTime(cuepoint.second);
					};

					updateTheme($scope.theme);
				},
				controller: [
					'$scope', '$sce',
					function($scope, $sce) {
						var updateCuepointsHtml = function() {
							for (var i = 0; i < $scope.cuepoints.points.length; i++) {
								$scope.cuepoints.points[i].htmlTooltip = $sce.trustAsHtml('<div style="text-align: center"><div style="margin-bottom: 5px;"><strong>'+$scope.cuepoints.points[i].title+'</strong></div><img width="120" src="'+$scope.cuepoints.points[i].imageUrl+'"></div>');
							}
						};
						updateCuepointsHtml();
					}
				]
			};
		}]);
})();
