'use strict';

angular.module('jrnyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl',
                data: {
                    css: 'assets/endless/css/endless.css'
                }
            })
            .state('user-details', {
                url: '/user-details/{id}',
                templateUrl: 'app/admin/users/user-details/user-details.html',
                controller: 'userDetailsCtrl',
                data: {
                    css: 'assets/endless/css/endless.css'
                }
            });
    });