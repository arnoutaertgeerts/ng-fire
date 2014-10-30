(function () {
    'use strict';


    angular
        .module('app')
        .config(myAppConfig);


    myAppConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider'
    ];


    function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push(responseError);


        function responseError($q, $location) {
            return {
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }

    }
})();
