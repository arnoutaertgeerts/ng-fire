(function() {
    'use strict';

    angular
        .module('ngFire', [
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngSanitize',
            'restangular',
            'ui.router',

            //Modules
            'main'
        ]);
})();