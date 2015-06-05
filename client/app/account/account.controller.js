'use strict';

angular.module('jrnyApp')
    .controller('AccountCtrl', function ($scope, $http, $location, $stateParams, Auth, User, Upload) {
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
        $scope.month_name_list = [{"value": 1, "text": "January"}, {"value": 2, "text": "February"}, {"value" : 3, "text": "March"}, {"value": 4, "text": "April"},
                                {"value": 5, "text": "May"}, {"value": 6, "text": "June"}, {"value": 7, "text": "July"}, {"value": 8, "text": "August"},
                                {"value": 9, "text": "September"}, {"value": 10, "text": "October"}, {"value": 11, "text": "November"}, {"value": 12, "text": "December"}];
        $scope.dayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        $scope.yearList = [];

        for(var i = 1920; i <= 2015; i++) {
            $scope.yearList.push(i);
        }

        $scope.sel_lang = '';

        $scope.m_year=0;
        $scope.m_month=0;
        $scope.m_day=0;        

        $scope.m_phone1 = "";
        $scope.m_phone2 = "";

        $scope.m_traveler_survey = {traveler: '', local: '', 
                                    basic: {arrival_date:'', arrival_time: '', departure_date: '', departure_time: '', how_get: '', how_already_booked: '', where_stay: '', where_already_booked: ''},
                                    companion: {how_many_group: '1', who_travel_with: '', main_purpose: '', group_dynamic: '', desired_energy_level: '', group_limitation: '', travel_companion: ''},
                                    interest: {food_drink: '', sightseeing: '', budget: '', must_see_do: '', nightlife: '', outdoors: '', live_events: '', overall_vibe: ''}};

        $scope.save_survey = function() {
            $scope.m_traveler_survey.traveler = $scope.getCurrentUser()._id;
            
            $http.post('/api/traveler_survey/save_survey', $scope.m_traveler_survey).
              success(function(data, status, headers, config) {
              }).
              error(function(data, status, headers, config) {
              });
        };

        $scope.next_survey = function(step) {
            $scope.save_survey();
            if(step == 1)
                location.href = "/travel-companions/" + $stateParams.em;
            else if(step == 2)
                location.href = "/interest-preference/" + $stateParams.em;
        };

        $scope.get_survey = function() {
            $scope.m_traveler_survey.local = $stateParams.em;            
            $scope.m_traveler_survey.traveler = $scope.getCurrentUser()._id;

            $http.post('/api/traveler_survey/get_survey', {local: $scope.m_traveler_survey.local, traveler: $scope.m_traveler_survey.traveler}).
              success(function(data, status, headers, config) {

                $scope.m_traveler_survey.basic.arrival_date = data.basic.arrival_date.substr(0, 10);
                $scope.m_traveler_survey.basic.arrival_time = data.basic.arrival_date.substr(11, 8);

                $scope.m_traveler_survey.basic.departure_date = data.basic.departure_date.substr(0, 10);;
                $scope.m_traveler_survey.basic.departure_time = data.basic.departure_date.substr(11, 8);;

                $scope.m_traveler_survey.basic.how_get = data.basic.how_get;
                $scope.m_traveler_survey.basic.how_already_booked = data.basic.how_already_booked;
                $scope.m_traveler_survey.basic.where_stay = data.basic.where_stay;
                $scope.m_traveler_survey.basic.where_already_booked = data.basic.where_already_booked;

                $scope.m_traveler_survey.companion = data.companion;
                $scope.m_traveler_survey.interest = data.interest;
                $scope.m_traveler_survey.companion.how_many_group = '' + $scope.m_traveler_survey.companion.how_many_group + '';

              }).
              error(function(data, status, headers, config) {
              });
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
            if(str == undefined)
                return "";
            else
                return parseInt(str);
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.update = function () {
            var user = $scope.getCurrentUser();
            if($scope.m_year != 0 & $scope.m_month != 0 & $scope.m_day != 0)
                user.DateOfBirth = $scope.m_year + "/" + $scope.m_month + "/" + $scope.m_day + " 0:0:0";
            user.PhoneNumber = $scope.m_phone1 + $scope.m_phone2;
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
        };

        $scope.showProfile = function (em) {
            location.href = "/profile/" + em;
        };

    });

Array.prototype.indexObjectOf = function arrayObjectIndexOf(property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
}