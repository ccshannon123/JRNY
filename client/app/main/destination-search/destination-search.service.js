angular.module('jrnyApp').service('destinationSearch', function () {
    var destination = '';

    return {
        getDestination: function () {
            return destination;
        },
        setDestination: function (value) {
            destination = value;
        }
    };
})