// Including ngTranslate
angular.module("ngTranslate",["ng"]).config(["$provide",function(t){$TranslateProvider=function(){var t,n={};this.translations=function(t,r){if(!t&&!r)return n;if(t&&!r){if(angular.isString(t))return n[t];n=t}else n[t]=r},this.uses=function(r){if(!r)return t;if(!n[r])throw Error("$translateProvider couldn't find translationTable for langKey: '"+r+"'");t=r},this.$get=["$interpolate","$log",function(r,a){return $translate=function(e,i){var l=t?n[t][e]:n[e];return l?r(l)(i):(a.warn("Translation for "+e+" doesn't exist"),e)},$translate.uses=function(n){return n?(t=n,void 0):t},$translate}]},t.provider("$translate",$TranslateProvider)}]),angular.module("ngTranslate").directive("translate",["$filter","$interpolate",function(t,n){var r=t("translate");return{restrict:"A",scope:!0,link:function(t,a,e){e.$observe("translate",function(r){t.translationId=angular.equals(r,"")?n(a.text())(t.$parent):r}),e.$observe("values",function(n){t.interpolateParams=n}),t.$watch("translationId + interpolateParams",function(){a.html(r(t.translationId,t.interpolateParams))})}}}]),angular.module("ngTranslate").filter("translate",["$parse","$translate",function(t,n){return function(r,a){return angular.isObject(a)||(a=t(a)()),n(r,a)}}]);

//Indicate if configuration is set for local(test) or network(final objective) for GET requests
var AIMconf_local = false;
var Matis_logo_path = 'matis_logo_transparent.png';
// Create app component (Configuring module, asking for ngTranslate as dependency)
var AIMApp = angular.module('AIMApp', ['ngTranslate']);

// Create 'AIM_wineFactory' factory component for AIMApp
var AIM_wineFactory =   AIMApp.factory('AIM_wineFactory', ['$http', function($http,$location) {
	var urlBaseWine;
	(AIMconf_local==true) ? urlBaseWine='http://localhost:3000/wines' : urlBaseWine='/wines';
	
    var AIM_wineFactory = {};

    AIM_wineFactory.getWines = function () {
        return $http.get(urlBaseWine);
    };

    AIM_wineFactory.getWine = function (id) {
        return $http.get(urlBaseWine + '/' + id);
    };

    AIM_wineFactory.insertWine = function (wine) {
        return $http.post(urlBaseWine, wine);
    };

    AIM_wineFactory.updateWine = function (wine) {
        return $http.put(urlBaseWine + '/' + wine.ID, wine)
    };

    AIM_wineFactory.deleteWine = function (id) {
        return $http.delete(urlBaseWine + '/' + id);
    };
/*
    AIM_wineFactory.getOrders = function (id) {
        return $http.get(urlBaseWine + '/' + id + '/orders');
    };*/
	
	AIM_wineFactory.getFakeWine = function () {
		var fake_wine = [
				  {
							id			: 0,
							name		: 'fake_wine_name',
							year		: '2000',
							grapes		: 'fake_grapes',
							country 	: 'fake_country',
							region 		: 'fake_region',
							description : 'fake_description',
							picture 	: 'no-pic.jpg'
					   
				  }
				];
		return fake_wine;
    };	
	
	 AIM_wineFactory.getAirports = function () {
        return $http.get(urlBaseAirport);
    };

    AIM_wineFactory.getAirport = function (id) {
        return $http.get(urlBaseAirport + '/' + id);
    };

    return AIM_wineFactory;
}]);


// Create 'AIM_AirportFactory' factory component for AIMApp
var AIM_AirportFactory =   AIMApp.factory('AIM_AirportFactory', ['$http', function($http,$location) {

	var urlBaseAirport;

	(AIMconf_local==true) ? urlBaseAirport='http://localhost:3000/airports' : urlBaseAirport='/airports';
	
    var AIM_AirportFactory = {};

	 AIM_AirportFactory.getAirportsList = function () {
        return $http.get(urlBaseAirport);
    };

    AIM_AirportFactory.getAirport = function (id) {
        return $http.get(urlBaseAirport + '/' + id);
    };

    return AIM_AirportFactory;
}]);


// Create 'OT_MBD_Factory' factory component for AIMApp
var OT_MBD_Factory =   AIMApp.factory('OT_MBD_Factory', ['$http', function($http,$location) {

	var urlBase_OT_MBD;

	(AIMconf_local==true) ? urlBase_OT_MBD='http://localhost:3000/OT_MBD' : urlBase_OT_MBD='/OT_MBD';
	
    var OT_MBD_Factory = {};

	 OT_MBD_Factory.getOT_MBD_List = function () {
        return $http.get(urlBase_OT_MBD);
    };

    OT_MBD_Factory.getOT_MBD = function (id) {
        return $http.get(urlBase_OT_MBD + '/' + id);
    };

    return OT_MBD_Factory;
}]);



 // Create "Basic" controller
var BasicController = AIMApp.controller('BasicController', function($scope, $route) {
    var foo = $route.current.foodata;
    //alert(foo); 
});


// Create 'WinesListController' controller component
var WinesListController = AIMApp.controller('WinesListController', ['$scope','$route', '$routeParams', '$location', 'AIM_wineFactory', 
        function ($scope, $route, $routeParams, $location, AIM_wineFactory) {

	var tplUrl = $route.current.templateUrl;
	var params = $route.current.params;
	var path = location.hash;

    $scope.WinesList_status;
    $scope.WinesList;
	
	getWines();
		
    function getWines() {
        AIM_wineFactory.getWines()
            .success(function (wines) {
                $scope.WinesList = wines;
				$scope.WinesList_status = 'getWines():loaded wine data: OK!';
            })
            .error(function (error) {
                $scope.WinesList_status = 'Unable to load wine data: ' + error.message;
            });
    }

    $scope.getWines = function () {
		getWines();
    };
	/*
    $scope.insertWine = function (id) {
        var wine;
        for (var i = 0; i < $scope.WinesList.length; i++) {
            var currentWine = $scope.WinesList[i];
            if (currentWine.id === id) {
                wine = currentWine;
                break;
            }
        }

        AIM_wineFactory.insertWine(wine)
          .success(function () {
              $scope.WinesList_status = 'insertWine(wine):Updated Wine! Refreshing wine list.';
          })
          .error(function (error) {
              $scope.WinesList_status = 'insertWine(wine):Unable to update wine: ' + error.message;
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
        AIM_wineFactory.insertWine(wine)
            .success(function () {
                $scope.WinesList_status = 'insertWine():Inserted Wine! Refreshing wine list.';
                $scope.WinesList.push(wine);
            }).
            error(function(error) {
                $scope.WinesList_status = 'insertWine():Unable to insert wine: ' + error.message;
            });
    };

    $scope.deleteWine = function (id) {
        AIM_wineFactory.deleteWine(id)
        .success(function () {
            $scope.WinesList_status = 'deleteWine(wine):Deleted Wine! Refreshing wine list.';
            for (var i = 0; i < $scope.WinesList.length; i++) {
                var wine = $scope.WinesList[i];
                if (wine.id === id) {
                    $scope.WinesList.splice(i, 1);
                    break;
                }
            }
            $scope.orders = null;
        })
        .error(function (error) {
            $scope.WinesList_status = 'deleteWine(wine):Unable to delete wine: ' + error.message;
        });
    };
	*/

}]);

 // Create "WineItemController" controller
var WineItemController = AIMApp.controller('WineItemController', function ($scope, $route, $routeParams, $location,AIM_wineFactory) {
    var foo = $route.current.foodata;
	//var tplUrl = $route.current.templateUrl;
	var params = $route.current.params;
	//var path = location.hash;
	
    $scope.WineItem_status;
    $scope.WineItem;
	
	if (params.id==="add"){
			//	todo : create default values to fill in the html
				$scope.WineItem = AIM_wineFactory.getFakeWine();
				$scope.WineItem_status = 'WineItemController -> add: loaded fake_wine_data: OK!';
	}
	else{ // regular get acces to wine data
		var intValue = parseInt(params.id);
		getWine(intValue);
	}
	
	function getWine(id) {
        AIM_wineFactory.getWine(id)
        .success(function (WineItem) {
                $scope.WineItem = WineItem;
				$scope.WineItem_status = 'getWine('+id+'):loaded wine data: OK!';
        })
        .error(function (error) {
            $scope.WineItem_status = 'getWine('+id+'):Error retrieving wine where id='+id+' !  :' + error.message;
        });
	}
	/*
    $scope.getWine = function (id) {
		getWine(id);
    };*/
	
	
});
// Create "AirportsListController" controller 
var AirportsListController = AIMApp.controller('AirportsListController', function ($scope, $route, $routeParams, $location, AIM_AirportFactory) {
	var tplUrl = $route.current.templateUrl;
	var params = $route.current.params;
	var path = location.hash;

    $scope.AirportsList_status;
    $scope.AirportsList;
	
	getAirportsList();
		
    function getAirportsList() {
        AIM_AirportFactory.getAirportsList()
            .success(function (AirportsList) {
                $scope.AirportsList = AirportsList;
				$scope.AirportsList_status = 'getAirportsList():loaded Airport data: OK!';
            })
            .error(function (error) {
                $scope.AirportsList_status = 'Unable to load Airport data: ' + error.message;
            });
    }

    $scope.getAirportsList = function () {
		getAirportsList();
    };
	
});
// Create "AirportItemController" controller 
var AirportController = AIMApp.controller('AirportItemController', function ($scope, $route, $routeParams, $location, AIM_AirportFactory) {
    var foo = $route.current.foodata;
	var params = $route.current.params;
	
    $scope.AirportItem_status;
    $scope.AirportItem;
	
	// regular get access to Airport data
	var intValue = parseInt(params.id);
	getAirport(intValue);
		
	function getAirport(id) {
        AIM_AirportFactory.getAirport(id)
        .success(function (AirportItem) {
                $scope.AirportItem = AirportItem;
				$scope.AirportItem_status = 'getAirport('+id+'):loaded data: OK!';
        })
        .error(function (error) {
            $scope.Airport_status = 'getAirport('+id+'):Error retrieving where id='+id+' !  :' + error.message;
        });
	}
	
});

// Create "OT_MBD_ListController" controller 
var OT_MBD_ListController = AIMApp.controller('OT_MBD_ListController', function ($scope, $http, $route, $routeParams, $location, OT_MBD_Factory) {
	var tplUrl = $route.current.templateUrl;
	var params = $route.current.params;
	var path = location.hash;

    $scope.OT_MBD_List_status;
    $scope.OT_MBD_List;
	
    $scope.filter = "$";
    $scope.search = {name:'', phone:'', $:''};
    $scope.changeFilterTo = function(pr) {
        $scope.filter = pr; 
    }
	
	$scope.item = {};
    $scope.createItem = function() {
        $http({
            method : 'POST',
            url : 'OT_MBD/create',
            data : $scope.item
        })
    }
	
	$scope.updateItem = function() {
        $http({
            method : 'PUT',
            url : 'OT_MBD/'+$scope.item.id,
            data : $scope.item
        })
    }
	
    $scope.deleteItem = function() {
        $http({
            method : 'DELETE',
            url : 'OT_MBD/'+$scope.item.id,
            data : $scope.item
        })
    }

	
	
	getOT_MBD_List();
		
    function getOT_MBD_List() {
        OT_MBD_Factory.getOT_MBD_List()
            .success(function (OT_MBD_List) {
                $scope.OT_MBD_List = OT_MBD_List;
				$scope.OT_MBD_List_status = 'getOT_MBD_List():loaded OT_MBD data: OK!';
            })
            .error(function (error) {
                $scope.OT_MBD_List_status = 'Unable to load OT_MBD data: ' + error.message;
            });
    }

    $scope.getOT_MBD_List = function () {
		getOT_MBD_List();
    };
	
});
// Create "OT_MBD_ItemController" controller 
var OT_MBD_ItemController = AIMApp.controller('OT_MBD_ItemController', function ($scope, $route, $routeParams, $location, OT_MBD_Factory) {
    var foo = $route.current.foodata;
	var params = $route.current.params;
	
    $scope.OT_MBD_Item_status;
    $scope.OT_MBD_Item;
	
	// regular get access to Airport data
	var intValue = parseInt(params.id);
	getOT_MBD(intValue);
		
	function getOT_MBD(id) {
        OT_MBD_Factory.getOT_MBD(id)
        .success(function (OT_MBD_Item) {
                $scope.OT_MBD_ItemItem = OT_MBD_Item;
				$scope.OT_MBD_Item_status = 'getOT_MBD('+id+'):loaded data: OK!';
        })
        .error(function (error) {
            $scope.Airport_status = 'getOT_MBD('+id+'):Error retrieving where id='+id+' !  :' + error.message;
        });
	}
	
});

// Create config component (for routes) -> which html template to load
var AIMAppConfig = AIMApp.config(['$routeProvider',
  function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'templates/home.html',
			controller: 'BasicController',
			foodata: 'home'
		}).
			when('/settings', {
			templateUrl: 'templates/settings.html',
			controller: 'BasicController',
			foodata: 'settings'
		}).
			when('/about', {
			templateUrl: 'templates/about.html',
			controller: 'BasicController',
			foodata: 'about'
		}).
		when('/airports', {
			templateUrl: 'templates/AirportsList.html',
			controller: 'AirportsListController',
			foodata: 'airports'
		}).
		when('/airports/:id', {
			templateUrl: 'templates/AirportItem.html',
			controller: 'AirportItemController',
			foodata: '/airports/:id'
		}).		
		when('/OT_MBD', {
			templateUrl: 'templates/OT_MBD_List.html',
			controller: 'OT_MBD_ListController',
			foodata: 'OT_MBD'
		}).
		when('/OT_MBD/:id', {
			templateUrl: 'templates/OT_MBD_Item.html',
			controller: 'OT_MBD_ItemController',
			foodata: '/OT_MBD/:id'
		}).	
		when('/wines', {
			templateUrl: 'templates/WinesList.html',
			controller: 'BasicController',
			foodata: 'this is a foo data show wine'
		}).
		when('/wines/:id', {
			templateUrl: 'templates/WineItem.html',
			controller: 'WineItemController',
			foodata: 'get view on a specific wine item'
		}).
		when('/wines/add', {
			templateUrl: 'templates/WineItem.html',
			controller: 'WineItemController',
			foodata: 'this is a foo data add wine'
		})
		;
}
]);
 

// Configuring $translateProvider to manage translation inside the AIM App
AIMApp.config(['$translateProvider', function ($translateProvider) {
    var lang_default = 'en_EN'; // set English as default language
	//defining English strings data
	var AIM_language_en =
	{
		'AIM_Welcome': 'Welcome on AIM Service',
		'AIM_ChooseLang':'Choose language',
		'AIM_SettingTitle_1': 'Setting°1 Title',
		'AIM_SettingDesc_1':'This is the sample text for Setting°1 Title',
		'AIM_Browse':'Browse',
		'AIM_Browse_SubMenu_1':'"Airports" database',		
		'AIM_Browse_SubMenu_2':'"Wines" database (test)',
		'AIM_Browse_SubMenu_3':'"OT_MBD" database (test)',
		'AIM_Add':'Add',
		'AIM_Settings':'Settings',
		'AIM_Menu_1':'Language',
		'AIM_SubMenu_1':'English',
		'AIM_SubMenu_2':'French',
		'AIM_ToolsUsed':'This application was build using',
		'AIM_About' :'About',
		'AIM_BackHome' :'Back Home',	
		'AIM_AIRPORT_ITEM_DETAIL' :'Details about this airport ',
		'AIM_ITEM_DETAIL' :'Item Details',
		'AIM_BUTTON_DELETE' :'Delete',
		'AIM_BUTTON_SAVE' :'Save',	
		
		'AIM_ABOUT_What_Title' :'What is the "AIM Service" ?',
		'AIM_ABOUT_What_Desc' :'The application "AIM Service" is a service whose goal is ....',
		'AIM_ABOUT_Report_Title' :'Report a problem',
		'AIM_ABOUT_Report_Desc' :'If you encountered a problem during use of the the application "AIM Service", please describe it here.',
		
		'AIM_Start':'Start',		
		'AIM_Service':'AIM Service'
    };
	//defining French strings data
	var AIM_language_fr =
	{
		'AIM_Welcome': 'Bienvenue sur le service AIM',
		'AIM_ChooseLang':'Choix de la langue',
		'AIM_SettingTitle_1': 'Titre du Parametre °1',
		'AIM_SettingDesc_1':'Ceci est un texte échantillon pour Titre du Parametre °1',
		'AIM_Browse':'Parcourir',
		'AIM_Browse_SubMenu_1':'Base des aéroports',		
		'AIM_Browse_SubMenu_2':'Base des vins (test)',
			'AIM_Browse_SubMenu_3':'Base "OT_MBD" (test)',
		'AIM_Add':'Ajouter',
		'AIM_Settings':'Paramètres',
		'AIM_Menu_1':'Langue',
		'AIM_SubMenu_1':'Anglais',
		'AIM_SubMenu_2':'Francais',
		'AIM_ToolsUsed':'Cette application est basée sur ',
		'AIM_About' :'A propos',
		'AIM_BackHome' :'Retour Accueil',
		'AIM_AIRPORT_ITEM_DETAIL' :'Details concernant cet aéroport ',
		'AIM_ITEM_DETAIL' :'Details de l\'item',
		'AIM_BUTTON_DELETE' :'Supprimer',
		'AIM_BUTTON_SAVE' :'Sauvegarder',
		
		'AIM_ABOUT_What_Title' :'Qu\'est ce que le "Service AIM" ?',
		'AIM_ABOUT_What_Desc' :'Cette application "Service AIM" est un service dont le but est ....',
		'AIM_ABOUT_Report_Title' :'Signaler une anomalie',
		'AIM_ABOUT_Report_Desc' :'Si vous avez rencontré un problème lors de l\'utilisation de  "Service AIM", veuillez le décrire ici.',
		
		'AIM_Start':'Demarrer',	
		'AIM_Service':'Service AIM'
    };
    // Simply register translation table as object hash
    $translateProvider.translations('en_EN', AIM_language_en);   
    $translateProvider.translations('fr_FR', AIM_language_fr); 
    $translateProvider.uses(lang_default); // using English translation
}]);

AIMApp.controller('TransCtrl', ['$translate', '$scope', function ($translate, $scope) {
	$scope.setLang = function (lang) {
		$translate.uses(lang);
    };
	$scope.MatisLogo = 'img/logos/logo_matis.png';
	$scope.AngularLogo = 'img/logos/logo_angularjs.png';
	$scope.BSLogo = 'img/logos/logo_bootstrap.png';
	$scope.ExpressLogo= 'img/logos/logo_expressjs.png';
	$scope.MySQLLogo = 'img/logos/logo_mySQL.png';
	$scope.NodeLogo = 'img/logos/logo_nodejs.png';
	
}]);


