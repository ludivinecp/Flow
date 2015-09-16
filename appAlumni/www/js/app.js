// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function () {

var app = angular.module('app', ['ionic', 'ngRoute', 'request', 'utilities']);

//ionic setting [run]
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});


//routing bloc contain [config, checkRouteController]
//set URL route
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when(
            '/',
            {
                templateUrl: 'views/modules/log/log.html',
                controller: 'checkRouteController'
            }
        )
        .when(
            '/jobs',
            {
                templateUrl: 'views/modules/jobs/jobs.html',
                controller: 'checkRouteController'
            }
        )
        .otherwise({redirectTo: '/'});
}]);

//check route conditions
app.controller('checkRouteController', ['$location', function ($location) {
    if ($location.path() === "/") {
        localStorage.clear();
    }
}]);

//Pages controllers
//Log contain [directive:log]
app.directive('log', [function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
            this.connect = function () {
                this.check = dataCheck(
                    {
                        'login':$scope.login,
                        'password': $scope.password
                    }
                );
                if (this.check && this.check !== undefined) {
                    request.post('', {}, function (data) {
                        console.log(data);
                        localStorage.setItem(
                            'user',
                            JSON.stringify(
                                {
                                    'id': data.id
                                }
                            )
                        );
                    });
                }
            };
        },
        controllerAs: 'logCtrl'
    };
}]);

//Jobs contain [controller:jobsController]
app.controller('jobsController', ['requestGet', function (requestGet) {
    requestGet('http://192.168.1.89/alumni/get/jobs', null, function (data) {
        console.log(data);
        this.jobs = data;
    });
}]);

}());
