angular.module('MainCtrl', ['duScroll', 'slickCarousel']).controller('MainController', function($scope, $document, $http, $state, NerdService){

    $scope.number = [{label: 1}, {label: 2}, {label: 3}];
    $scope.flag = false;
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

    $scope.toSection3 = function() {
        var section3 = angular.element(document.querySelector("#section-3"));
        console.log(section3);
        $document.scrollToElementAnimated(section3);
    };

    $scope.goToContent = function (product) {
        var section = angular.element(document.getElementById('soluciones_content'));
        $scope.productContent = product;
        $document.scrollToElementAnimated(section, [], 1500);
    };

    $http({
     method: 'GET',
     url: '/api/slider'
     }).then(function (response) {
         console.log('SUCCESS SLIDER: ',response);
         if(response.status === 200){
             $scope.slickConfig1Loaded = true;
             $scope.todos = response.data;
         }
     }, function (response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     });

    $http({
     method: 'GET',
     url: '/api/nosotros'
     }).then(function (response) {
         console.log('SUCCESS NOSOTROS: ',response);
         if(response.status === 200){
             $scope.flag = true;
             $scope.nosotros = response.data;
         }
     }, function (response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     });

    $http({
        method: 'GET',
        url: '/api/paraque'
    }).then(function (response) {
        console.log('SUCCESS PARAQUE: ',response);
        if(response.status === 200){
            $scope.paraque = response.data;
        }
    }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.animateElementIn = function($el) {
        $el.removeClass('hidden');
        $el.addClass('fade-in'); // this example leverages animate.css classes
    };

    $scope.animateElementOut = function($el) {
        $el.addClass('hidden');
        $el.removeClass('fade-in'); // this example leverages animate.css classes
    };

    $scope.go = function () {
        $state.go('about');
    };



    }
).value('duScrollOffset', 30);