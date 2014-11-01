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
            'ui.bootstrap',
            'formFor',
            'formFor.bootstrapTemplates',

            //Route Modules
            'main',
            'login',
            'register',
            'about',
            
            //Components
            'authorization'
        ]);
})();