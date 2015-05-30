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
            });
    });