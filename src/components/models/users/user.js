(function() {
    'use strict';

    angular
        .module('model.user')
        .factory('UserFactory', UserFactory)
        .factory('User', User);

    UserFactory.$inject = [        
        '$FirebaseObject'
    ];

    function UserFactory($FirebaseObject) {

        return $FirebaseObject.$extendFactory({
            getFullName: getFullName
        });
        
        function getFullName() {
            return this.username;
        }
        
    }
    
    User.$inject = [
        '$firebase',
        'FIREBASE_URL'
    ];
        
    function User($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL + '/users/');
        return function(user) {

            var userModel = $firebase(ref.child(user.uid), {objectFactory: 'UserFactory'}).$asObject();
            angular.extend(userModel, user);

            return userModel;
        };
    }
    
})();
