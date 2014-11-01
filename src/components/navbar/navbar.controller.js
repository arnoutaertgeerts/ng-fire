(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavBarCtrl', Controller);

    Controller.$inject = [
        '$scope',
        'Auth'
    ];

    function Controller($scope, Auth) {
        $scope.logout = Auth.logout;
        $scope.user = Auth.user;
    }

}());
