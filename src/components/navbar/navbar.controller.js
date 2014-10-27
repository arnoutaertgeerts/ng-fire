'use strict';

angular.module('app')
  .controller('NavbarCtrl', ['$scope', function ($scope) {
    $scope.date = new Date();
  }]);
