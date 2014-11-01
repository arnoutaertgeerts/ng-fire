(function() {
    'use strict';

    angular
        .module('about')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider.state('about', {
            url: '/about',
            views: {
                'main': {
                    controller: 'AboutCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'app/about/about.html'
                }
            },
            data: {
                pageTitle: 'What is It?',
                access: 'user'
            }
        });
    }

})();