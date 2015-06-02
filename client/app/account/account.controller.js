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
        $scope.levels = ['Beginner', 'Limited Working', 'Professional', 'Native/Billingual'];
        $scope.languageList = ['English', 'Arabic', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Korean', 'Mandarin', 'Portuguese', 'Russian', 'Spanish', 'Other'];
        $scope.monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $scope.dayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        $scope.yearList = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000];
        $scope.sel_lang = '';
        $scope.m_year=0;
        $scope.m_month=3;
        $scope.m_day=0;

        $scope.m_traveler_survey = {traveler: '', local: '', 
                                    basic: {arrival_date:'', arrival_time: '', departure_date: '', departure_time: '', how_get: '', how_already_booked: '', where_stay: '', where_already_booked: ''},
                                    companion: {how_many_group: 1, who_travel_with: '', main_purpose: '', group_dynamic: '', desired_energy_level: '', group_limitation: '', travel_companion: ''},
                                    interest: {food_drink: '', sightseeing: '', budget: '', must_see_do: '', nightlife: '', outdoors: '', live_events: '', overall_vibe: ''}};

        $scope.save_survey = function() {
            alert(JSON.stringify($scope.m_traveler_survey.basic));
        };

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

        $scope.getInt = function (str) {
            return parseInt(str);
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.update = function () {
            var user = $scope.getCurrentUser();
            if($scope.m_year != 0 & $scope.m_month != 0 & $scope.m_day != 0)
                user.DateOfBirth = $scope.m_year + "/" + $scope.m_month + "/" + $scope.m_day;
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

        $scope.showProfile = function (em) {
            location.href = "/profile/" + em;
        }
    });

Array.prototype.indexObjectOf = function arrayObjectIndexOf(property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
}