// Create app component
var winesApp = angular.module('winesApp', []);

// Create controller component
var winesAppFacto =   winesApp.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/wines';
    var dataFactory = {};

    dataFactory.getWines = function () {
        return $http.get(urlBase);
    };

    dataFactory.getWine = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertWine = function (wine) {
        return $http.post(urlBase, wine);
    };

    dataFactory.updateWine = function (wine) {
        return $http.put(urlBase + '/' + wine.ID, wine)
    };

    dataFactory.deleteWine = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return dataFactory;
}]);

// Create controller component
var winesAppCtrl = winesApp.controller('WinesCtrl', ['$scope', 'dataFactory', 
        function ($scope, dataFactory) {

    $scope.status;
    $scope.wines;
    $scope.orders;
	
    $scope.name = "FOO";
    $scope.address = "ADDRESS1";
	
    getWines();

    function getWines() {
        dataFactory.getWines()
            .success(function (wines) {
                $scope.wines = wines;
				$scope.status = 'getWines():loaded wine data: OK!';
            })
            .error(function (error) {
                $scope.status = 'Unable to load wine data: ' + error.message;
            });
    }
/*
getWine(8);

    function getWine(id) {
        dataFactory.getWine(id)
            .success(function (wines) {
                $scope.wines = wines;
				$scope.status = 'getWine():loaded wine data: OK!';
            })
            .error(function (error) {
               $scope.status = 'getWine():Unable to load wine data: ' +id+':' error.message;
            });
*/
	
    $scope.insertWine = function (id) {
        var wine;
        for (var i = 0; i < $scope.wines.length; i++) {
            var currentWine = $scope.wines[i];
            if (currentWine.id === id) {
                wine = currentWine;
                break;
            }
        }

        dataFactory.insertWine(wine)
          .success(function () {
              $scope.status = 'insertWine(wine):Updated Wine! Refreshing wine list.';
          })
          .error(function (error) {
              $scope.status = 'insertWine(wine):Unable to update wine: ' + error.message;
          });
    };

    $scope.insertWine = function () {
        //Fake wine data
        var wine = {
            id			: 10,
            name		: 'fake_wine_name',
            year		: '2000',
			grapes		: 'fake_grapes',
			country 	: 'fake_country',
			region 		: 'fake_region',
			description : 'fake_description',
			picture 	: 'fake_picture.jpg'
        };
        dataFactory.insertWine(wine)
            .success(function () {
                $scope.status = 'insertWine():Inserted Wine! Refreshing wine list.';
                $scope.wines.push(wine);
            }).
            error(function(error) {
                $scope.status = 'insertWine():Unable to insert wine: ' + error.message;
            });
    };

    $scope.deleteWine = function (id) {
        dataFactory.deleteWine(id)
        .success(function () {
            $scope.status = 'deleteWine(wine):Deleted Wine! Refreshing wine list.';
            for (var i = 0; i < $scope.wines.length; i++) {
                var wine = $scope.wines[i];
                if (wine.id === id) {
                    $scope.wines.splice(i, 1);
                    break;
                }
            }
            $scope.orders = null;
        })
        .error(function (error) {
            $scope.status = 'deleteWine(wine):Unable to delete wine: ' + error.message;
        });
    };

    $scope.getWineOrders = function (id) {
        dataFactory.getOrders(id)
        .success(function (orders) {
            $scope.status = 'getWineOrders(id):Retrieved orders!';
            $scope.orders = orders;
        })
        .error(function (error) {
            $scope.status = 'getWineOrders(id):Error retrieving wines! ' + error.message;
        });
    };
}]);