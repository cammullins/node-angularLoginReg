var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: "partials/logreg.html"
    })
    .when('/success', {
      templateUrl: "partials/success.html"
    })
    .otherwise({
      redirectTo: '/'
    })
})
