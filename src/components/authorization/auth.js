(function () {
    'use strict';

    angular
        .module('authorization')
        .factory('Auth', AuthFactory);

    AuthFactory.$inject = [
        '$rootScope',
        '$firebaseSimpleLogin',
        'Access',
        'User',
        'FIREBASE_URL'
    ];

    function AuthFactory($rootScope, $firebaseSimpleLogin, Access, User, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseSimpleLogin(ref);

        var Auth = {
            register: function (user) {
                return auth.$createUser(user.email, user.password).then(function(res) {
                    user.uid = res.uid;
                    user.roles = ['user'];
                    new User(user).$save();
                }).then(function() {
                    return Auth.login(user.email, user.password);
                });
            },
            login: function (email, password) {
                return auth.$login('password', {
                    email: email,
                    password: password
                });
            },
            logout: function () {
                auth.$logout();
            },
            resolveUser: function() {
                return auth.$getCurrentUser();
            },
            isLoggedIn: function() {
                return !!Auth.user.provider;
            },
            authorize: authorize,
            user: {name: '', roles: ['anon']}
        };

        $rootScope.$on('$firebaseSimpleLogin:login', function(e, res) {
            console.log('logged in');            
            var user = new User(res);
            
            angular.copy(user, Auth.user);
        });
        $rootScope.$on('$firebaseSimpleLogin:logout', function() {
            console.log('logged out');
            angular.copy({name: '', roles: ['anon']}, Auth.user);
        });

        return Auth;

        function authorize(accessLevel, roles) {
            if (roles === undefined) {
                roles = Auth.user.roles;
            }

            var authorizedRoles = Access[accessLevel];
            return  _.intersection(authorizedRoles, roles).length > 0;

        }
    }

})();