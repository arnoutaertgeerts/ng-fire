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
            'formFor',
            'formFor.bootstrapTemplates',

            //Route Modules
            'main',
            'login',
            'register',
            
            //Components
            'authorization'
        ]);
})();