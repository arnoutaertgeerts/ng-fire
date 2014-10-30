(function() {
    'use strict';

    angular
        .module('register')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = [
        '$location',
        'Auth',
        'toaster'
    ];

    function RegisterCtrl($location, Auth, toaster) {
        var vm = this;

        vm.submit = submit;
        vm.user = {};


        function submit(data) {
            Auth.register({
                name: data.name,
                email: data.email,
                password: data.password
            }).then(
                function () {
                    $location.path('/');
                },
                function (err) {
                    if(err.status === 409) {
                        toaster.pop('error', err.data);
                    }
                    else {
                        console.log(err);
                        toaster.pop('error', 'Something went wrong during the signup...', err.message);
                    }

                    $location.path('/register');
                });
        }
    }

})();

