(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        '$location',
        'Auth',
        'toaster'
    ];

    function LoginCtrl($location, Auth, toaster) {
        var vm = this;

        vm.rememberme = true;
        vm.login = login;

        function login() {
            Auth.login(vm.email, vm.password).then(function () {
                $location.path('/home');
                toaster.pop('success', 'Login successful!', 'Welcome ' + vm.email);

            }).catch(function () {
                toaster.pop('error', 'Login failed', 'Incorrect username or password, please try again!');
                $location.path('/login');

            });
        }
    }

})();
