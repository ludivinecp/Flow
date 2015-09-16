(function () {

var utilities = angular.module('utilities', []);

utilities.factory('dataCheck', [function () {
    return function (data) {
        var check = {'check': true, 'address': true, 'town': true};
        for (var key in data) {
            if (!data[key] || data[key] === undefined)
                check.check = false;
        }
        return check;
    };
}]);

utilities.factory('flash', ["$timeout", function ($timeout) {
    var div = document.querySelector('.flash');
    return function (message, type) {
        div.innerHTML = message;
        div.style.display = "block";

        if (type === "danger")
            div.classList.add("danger");
        else if (type === "warning")
            div.classList.add("warning");
        else if (type === "success")
            div.classList.add("success");

        $timeout(function () {
            div.style.display = "none";
        }, 2000);
    };
}]);

}());