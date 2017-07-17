var cms = angular.module('creetecApp', ['ui.router', 'ngMaterial', 'ngRoute', 'MainCtrl', 'NerdCtrl', 'LoginCtrl', 'NerdService', 'GeekCtrl', 'GeekService', 'angular-scroll-animate']);
/*var cms = angular.module("cms",
    ['ngStorage','ui.router', 'oc.lazyLoad','ngAnimate','ngFileUpload',
        '720kb.datepicker',  'angular.filter',   'firebase', 'leaflet-directive',
        'ngMaterial', 'angularSpinner', 'textAngular'
    ]);*/

cms.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: '../views/web/home.html',
            controller: 'MainController'
        })
        .state('about', {
            url:'/nerds',
            templateUrl: '../views/nerd.html',
            controller: 'NerdController as NerdCtrl'
        })
        /*.state('cms', {
            url:'/cms',
            templateUrl: '../views/cms.html',
            controller: 'CMSController'
        })*/
        .state('cms', {
            abstract: true,
            url: "/cms/",
            templateUrl: '../views/cms/index.cms.html'
        })
        .state('cms.login', {
            url:'login',
            templateUrl: '../views/cms/login.html',
            controller: 'LoginCtrl'
        })

}]);
