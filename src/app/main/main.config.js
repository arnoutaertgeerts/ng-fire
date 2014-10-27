(function() {
    'use strict';

    angular
        .module('main')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                'main': {
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'app/main/main.html'
                }
            },
            data: {
                access: 'public'
            }
        });
    }

})();