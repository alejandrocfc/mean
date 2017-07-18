angular.module('LoginCtrl', []).controller('LoginCtrl', function($scope, $http, $state){
    $scope.form = {};
    $scope.error = 'none';

    $scope.submit = function(){

        var data = {
            email: $scope.form.username,
            password: $scope.form.password
        };

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        $http({
            method: 'POST',
            data: data,
            url: '/api/login',
            config: config
        }).then(function (response) {
            console.log('SUCCESS LOGGIN: ',response.data);
            if(response.data === '0'){
                console.log('USER NOT FOUND');
            }else if(response.data === '1'){
                console.log('PASSWORD WRONG');
            }else if(response.data === '2'){
                $state.go('cms.main');
            }
        }, function (response) {
            console.log('ERROR LOGGIN: ',response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        /*$firebase.login($scope.form.email, $scope.form.password).then(function(auth) {
            $scope.form = {};
            $state.go('dashboard.event.configuration');
        }, function (error) {
            $scope.showError("Email o contraseña incorrectos, por favor verifíquelos e intente nuevamente.");
        });*/
    };

    $scope.showError = function(message){
        $scope.error = 'block';
        $scope.message = message;
        //commons.apply($scope);
    }
});