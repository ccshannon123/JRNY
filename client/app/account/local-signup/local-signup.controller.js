'use strict';

angular.module('jrnyApp').controller('localSignupCtrl', function ($scope, User, $location, Auth) {

    $scope.errors = {};

    $scope.localApplicationForm = function (form) {

        $scope.submitted = true;
        //var user = Auth.getCurrentUser;
        var active = true;
        var PhoneNumber = $scope.user.PhoneNumber;
        var Gender = $scope.user.Gender

        if (form.$valid) {
            Auth.updateUser(Gender, PhoneNumber)
                .then(function () {
                    $scope.message = 'Acive true';
                    console.log('active true');
                })
                .catch(function () {
                    //form.password.$setValidity('mongoose', false);
                    $scope.errors.other = 'Incorrect';
                    $scope.message = '';
                });
        }

    };



});