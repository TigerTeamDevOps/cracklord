var cracklord = angular.module('cracklord', [
	'ui.router',
   'ui.sortable',
   'ui.bootstrap',
   'readableTime',
   'ngResource',
   'angular-growl',
   'ngMockE2E'
]);

cracklord.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(5000);
//  growlProvider.globalDisableCountDown(true);
}]);