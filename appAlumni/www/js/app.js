// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function () {

var app = angular.module('app', ['ionic', 'ngRoute', 'request', 'utilities']),
    ip = '10.101.0.81';

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
        .when(
            '/job',
            {
                templateUrl: 'views/modules/one-job/one-job.html',
                controller: 'checkRouteController'
            }
        )
        .when(
            '/home',
            {
                templateUrl: 'views/modules/home/home.html',
                controller: 'checkRouteController'
            }
        )
        .when(
            '/profil',
            {
                templateUrl: 'views/modules/profil/profil.html',
                controller: 'checkRouteController'
            }
        )
        .when(
            '/comm',
            {
                templateUrl: 'views/modules/comm/comm.html',
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
//template contain[directive:toggleDisplay]
app.directive('toggleDisplay', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                document.querySelector(
                    attrs.toggleDisplay
                )
                .classList.toggle('hide-left');
            });
        }
    };
}])

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
app.controller(
    'jobsController',
    [
        'requestGet',
        '$location',
        function (requestGet, $location) {
            var that = this;
            this.nbr = 12;
            requestGet(
                'http://' + ip + '/alumni/get/jobs',
                null,
                function (data) {
                    console.log(data);
                    that.jobs = data;

                    if(!that.jobs){
                        that.jobs = {
                            '$$hashKey': "object:11",
                            'city': "Paris",
                            'company_name': "Supergazol",
                            'date_add': "2015-09-16 17:29:01",
                            'id': "5",
                            'job_type': "CDI",
                            'logo_url': "http://10.101.0.45/alumni/img/c550deb8a99b0cbaf3dea36f05e4ea5c.jpeg",
                            'remuneration_text': "",
                            'score': 12,
                            'techno_tags': {
                                'mobile': 1
                            },
                            'title': "Direction de clientèle H/F",
                            'url': "https://remixjobs.com/emploi/Marketing/Direction-de-clientele-H-F/32314",
                            'user_tags': {
                                'moderne': 2
                            }
                        };
                    }
                }
            );

            this.redirect = function (idJob) {
                localStorage.setItem(
                    'job',
                    JSON.stringify(
                        {
                            'id': idJob
                        }
                    )
                );
                $location.path('/job');
            };
        }
    ]
);

//Projects contain [controller:projectsController]
app.controller('projectsController', ['requestGet', function (requestGet) {
    requestGet('', {}, function(data) {
        console.log(data);
    });
}]);

//display project contain [controller:displayProjectController]
app.controller(
    'displayProjectController',
    [
        'requestGet',
        function (requestGet) {
            requestGet('', {}, function (data) {
                console.log(data);
            });
        }
    ]
);

//display job contain[controller:displayJobController, directive:sendTag]
app.controller(
    'displayJobController', 
    [
        'requestGet',
        function (requestGet) {
            var that = this;
            console.log(JSON.parse(localStorage.getItem('job')).id);
            requestGet(
                'http://' + ip + '/alumni/get/job?jobId='
                + JSON.parse(localStorage.getItem('job')).id,
                null,
                function (data) {
                    console.log(data);
                    that.job = data;
                    console.log(typeof data);
                    if (!that.job || typeof that.job !== 'object') {
                        that.job = {
                            '$$hashKey': "object:11",
                            'city': "Paris",
                            'company_name': "Supergazol",
                            'date_add': "2015-09-16 17:29:01",
                            'id': "5",
                            'job_type': "CDI",
                            'logo_url': "http://10.101.0.45/alumni/img/c550deb8a99b0cbaf3dea36f05e4ea5c.jpeg",
                            'remuneration_text': "",
                            'score': 12,
                            'techno_tags': {
                                'mobile': 1
                            },
                            'title': "Direction de clientèle H/F",
                            'url': "https://remixjobs.com/emploi/Marketing/Direction-de-clientele-H-F/32314",
                            'user_tags': {
                                'moderne': 2
                            }
                        };
                    }
                    console.log(that.job);
                }
            );
        }
    ]
);

app.directive('sendTag', [function () {
    return {
        restrict: 'A',
        controller: function (requestGet) {
            requestGet(
                'http://' + ip + '/alumni/send/tag',
                {
                    'tagName': $scope.tagName,
                    'jobId': $scope.job,
                    'userId': $scope.userId
                },
                function (data) {
                    console.log(data);
                }
            );
        },
        controllerAs: 'sendTagCtrl'
    };
}])

}());
