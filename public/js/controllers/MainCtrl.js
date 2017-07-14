angular.module('MainCtrl', ['duScroll', 'slickCarousel']).controller('MainController', function($scope, $document, $http, NerdService){

    $scope.number = [{label: 1}, {label: 2}, {label: 3}];
    $scope.slickCurrentIndex = 0;
    $scope.slickConfig = {
        dots: true,
        autoplay: false,
        initialSlide: 2,
        infinite: true,
        autoplaySpeed: 3000,
        method: {}
    };

    $scope.toTheTop = function() {
        console.log('WORKING');
        $document.scrollTopAnimated(0, 5000).then(function() {
            console && console.log('You just scrolled to the top!');
        });
    };
    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function() {
        $document.scrollToElementAnimated(section3);
    };

    $http({
     method: 'GET',
     url: '/api/slider'
     }).then(function (response) {
         console.log('SUCCESS: ',response);
         if(response.status === 200){
             $scope.slickConfig1Loaded = true;
             $scope.todos = response.data;
         }
     }, function (response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     });



    }
).value('duScrollOffset', 30);