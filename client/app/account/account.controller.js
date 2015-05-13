'use strict';

angular.module('jrnyApp')
  .controller('AccountCtrl', function ($scope, $location, Auth, User, Upload) {
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

      }, function (err) {

      });
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
            }
          );
        }
      }
    };
  });
