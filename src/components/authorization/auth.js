(function () {
    'use strict';

    angular
        .module('authorization')
        .factory('Auth', AuthFactory);

    AuthFactory.$inject = [
        '$rootScope',
        '$firebaseSimpleLogin',
        'Access'
    ];

    function AuthFactory($rootScope, $firebaseSimpleLogin, Access) {

        var ref = new Firebase('https://crackling-inferno-5506.firebaseio.com/');
        var auth = $firebaseSimpleLogin(ref);

        var Auth = {
            register: function (user) {
                return auth.$createUser(user.email, user.password);
            },
            login: function (user) {
                return auth.$login('password', user);
            },
            logout: function () {
                auth.$logout();
            },
            resolveUser: function() {
                return auth.$getCurrentUser();
            },
            signedIn: function() {
                return !!Auth.user.provider;
            },
            authorize: authorize,
            user: {}
        };

        $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
            console.log('logged in');
            angular.copy(user, Auth.user);
        });
        $rootScope.$on('$firebaseSimpleLogin:logout', function() {
            console.log('logged out');
            angular.copy({}, Auth.user);
        });

        return Auth;

        function authorize(accessLevel, roles) {
            if (roles === undefined) {
                roles = Auth.user.roles;
            }

            var authorizedRoles = Access[accessLevel];
            return _.intersection(authorizedRoles, Auth.user.roles).length > 0;

        }



    }

})();