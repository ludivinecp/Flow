(function () {

var request = angular.module('request', []);

request.factory('requestPost', ['$http', function ($http) {
    return function (url, dataSend, myCallback) {
        $http.post(url, dataSend)
        .success(function (data) {
            myCallback(data);
        })
        .error(function (data) {
            myCallback(data);
        });
    };
}]);

request.factory('requestGet', ['$http', function ($http) {
    return function (url, dataSend, myCallback) {
        $http.get(url, dataSend)
        .sucess(function (data) {
            myCallback(data);
        })
        .error(function () {
            myCallback(data);
        });
    };
}]);

}());