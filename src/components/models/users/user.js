(function() {
    'use strict';

    angular
        .module('model.user')
        .factory('User', User);

    User.$inject = [
        '$firebase'
    ];

    function User() {

    }
})();
