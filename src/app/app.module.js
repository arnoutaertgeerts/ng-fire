(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngSanitize',
            'restangular',
            'ui.router',

            //Route Modules
            'main',
            
            //Components
            'authorization'
        ]);
})();