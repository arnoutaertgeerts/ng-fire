'use strict';

angular.module('ngFire')
  .controller('NavbarCtrl', ['$scope', function ($scope) {
    $scope.date = new Date();
  }]);
