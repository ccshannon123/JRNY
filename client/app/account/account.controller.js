'use strict';

angular.module('jrnyApp')
    .controller('AccountCtrl', function ($scope, $http, $location, Auth, User, Upload) {
        $scope.menu = [
      /*{
       'title': 'Home',
       'link': '/'
       }*/
    ];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.levels = ['Beginner', 'Native'];
        $scope.languageList = ['English', 'French'];
        $scope.sel_lang = '';

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false
        };

        $scope.format = 'dd-MMMM-yyyy';

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.update = function () {
            var user = $scope.getCurrentUser();
            user.$updateUser(function (user) {
                toastr.success('Your information has been updated', 'Saved!')
            }, function (err) {
                toastr.error('Something went wrong, please refresh and try again', 'Oops!')
            });
        };

        $scope.getMonthName = function(mon) {
            var month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            return month_name[mon - 1];
        };

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    Upload.upload({
                        url: '/api/users/upload',
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        var user = $scope.getCurrentUser();
                        user.photoUrl = data.img;
                        user.$updateUser(function (user) {

                        }, function (err) {

                        });
                    }).error(function (err) {
                        console.log(err);
                    });
                }
            }
        };
        $scope.addLanguage = function () {
            if ($scope.sel_lang && $scope.getCurrentUser().languages.indexObjectOf('lang', $scope.sel_lang) < 0) {
                $scope.getCurrentUser().languages.push({
                    lang: $scope.sel_lang,
                    reading: 'Beginner',
                    writing: 'Beginner'
                });
            }
        };
        $scope.removeLanguage = function (language) {
            if ($scope.getCurrentUser().languages.indexOf(language) > -1) {
                $scope.getCurrentUser().languages.splice($scope.getCurrentUser().languages.indexOf(language), 1);
            }
        }
    });

Array.prototype.indexObjectOf = function arrayObjectIndexOf(property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
}