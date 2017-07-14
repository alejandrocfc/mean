angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, NerdService) {

    // $http.get('/api/nerds');

    NerdService.get().then(function(res){
        console.log(res);
    }, function errorCallback(argument) {
        console.log('FAILED: ',response);
    });

    /*$http({
        method: 'GET',
        url: '/api/nerds'
    }).then(function successCallback(response) {
    	console.log('SUCCESS: ',response);
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });*/

	$scope.tagline = 'Nothing beats a pocket protector!';

});