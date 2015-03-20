var winesApp = angular.module('winesApp', []);
//var urlBase = 'json/wine_result.json';
var urlBase2 = 'http://localhost:3000/wines';

winesApp.controller('WinesCtrl', function($scope, $http) {
  $http.get(urlBase2)
       .then(function(res){
          $scope.wines = res.data;                
        });

});