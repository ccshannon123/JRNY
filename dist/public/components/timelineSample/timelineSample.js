'use strict';

angular.module('jrnyApp').controller('timelineSampleCtrl', function ($scope) {

    $scope.items = [
        {
            title: 'Pablo’s Coffee',
            icon: 'fa fa-coffee',
            info: 'Grab a cappuccino or a mocha made from locally roasted beans in this artsy denver staple.'
        },
        {
            title: 'Lookout Mountain',
            icon: 'fa fa-camera',
            info: '20-30 minutes outside Denver city limits, lookout mountain provides a 360 degree view of Denver and the Rockies!'
        },
        {
            title: 'Curtis Park Delicatessen',
            icon: 'fa fa-cutlery',
            info: "Literally the best fresh creations this side of the mississippi. Get there early (11-11:30am) because once the ingredients are gone, they're gone!"
        },
        {
            title: 'Denver Beer Company',
            icon: 'fa fa-beer',
            info: 'Not as well known as some of the big breweries but their creating concoctions and relaxed community tables make “DBC” a must.'
        },
        {
            title: 'Metropolis Coffee',
            icon: 'fa fa-coffee',
            info: 'Cross I-70 (take the walking bridge) is a good alternative to a beer.'
        },
        {
            title: 'Cheeseman Park',
            icon: 'fa fa-tree',
            info: 'Park culture is a big in denver. Grab a six pack of cans (no glass!) and head to cheesman park. Bring a blanket to sit on and join a frisbee session if you’re down.'
        },
        {
            title: 'Take a break',
            icon: 'fa fa-ellipsis-h',
            info: 'You’ve had a busy morning. Take a break, relax and get ready for the night ahead.'
        }
]
});