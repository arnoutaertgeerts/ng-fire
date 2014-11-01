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
                var password = user.password;

                return auth.$createUser(user.email, password).then(function(res) {

                    //Remove the password from the users object
                    user.password = null;

                    user.uid = res.uid;
                    user.roles = ['user'];

                    var newUser = new User(user);
                    return newUser.$save();

                }).then(function() {
                    return Auth.login(user.email, password);
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

            //Wait for the user to load
            user.$loaded().then(function() {
                angular.copy(user, Auth.user);
            });
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