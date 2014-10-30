(function() {
    'use strict';

    angular
        .module('app')
        .service('UserSignUp', UserSignUp);


    UserSignUp.$inject = [];

    function UserSignUp() {
        var validationRules = {
            email: {
                required: true,
                pattern: /^\w+@\w+\.\w+$/
            },
            password: {
                required: true,
                minlength: 5
            }
        };

        return {
            validationRules: validationRules
        };
    }

})();
