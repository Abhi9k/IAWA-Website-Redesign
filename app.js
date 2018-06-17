// Code goes here

// Code goes here
var app = angular.module('iawaApp', ['ngMaterial', 'ngRoute']);

var searchFilter = function(item, q) {

    for(var k in item) {
      if(k==="documents")
        continue;
      v = item[k];
      if(v.toLowerCase().includes(q.toLowerCase()))
        return true;
    }
  return false;
}

var getDataTitled = function(arr, title) {
  for(var i=0; i<arr.length; i++) {
    var item = arr[i];
    if(item.title==title)
      return item
  }
}

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'mainController'
  })
  .when('/collections', {
    templateUrl: 'collections.html',
    controller: 'mainController'
  })
  .when('/collections/item/:param1', {
    templateUrl: 'collection-item.html',
    controller: 'mainController'
  })
  .when('/collections/item/document/:param1', {
    templateUrl: 'document.html',
    controller: 'mainController'
  })
  .when('/bookmarks', {
    templateUrl: 'bookmarks.html',
    controller: 'mainController'
  })
  .when('/about', {
    templateUrl: 'about.html',
    controller: 'mainController'
    
  })
  .when('/help', {
    templateUrl: 'help.html',
    controller: 'mainController'
  })
  .when('/signin', {
    templateUrl: 'sign-in.html',
    controller: 'mainController'
  })
  .when('/contact', {
    templateUrl: 'contact.html',
    controller: 'mainController'
  })
});

app.controller('mainController', ['$scope', '$filter', '$location', '$routeParams', function($scope, $filter, $location, $routeParams) {
  $scope.searchTerm = "";
  $scope.data_raw = [
    {"title": "The Berta Rahm Architectural Collection",
     "year": "1998",
     "architect": "Berta Rahm",
     "description": "Architect of Switzerland. Educated at l'Ecole Polytechnique Federale de Zurich (Diploma in architecture, 1934). Inspired by her uncle",
     "documents": [
        {
          "title": "title",
          "img": "",
          "description": "asdfsadfasdfsadfsadfsafd",
          "cite": "asdfasdfafsfsdfasdf",
          "type": "asdfas"
        } 
      ]
    },
    {"title": "Sigrid L. Rupp Architectural Collection",
     "year": "1997",
     "architect": "Sigrid L. Rupp",
     "description": "Rupp's collection encompasses over twenty years of her firm, SLR/Architects, and includes",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    },
    {"title": "Liane Zimbler Architectural Collection",
     "year": "1988",
     "architect": "Liane Zimbler",
     "description": "Liane Zimbler was born in Czechoslovakia in 1892. She studied Art and Architecture at the State Art School in Austria",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    },
    {"title": "The L. Jane Hastings Architectural Papers",
     "year": "1951",
     "architect": "L. Jane Hastings",
     "description": "L. Jane Hastings was born and raised in Seattle, Washington. She received a Bachelor of Architecture from the University of Washington in 1952",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    }
    ];
  $scope.viewType = "list";
    
  $scope.changeView = function(viewType) {
    $scope.viewType = viewType;
  }
  
  $scope.checkViewType = function(viewType){
    return viewType === $scope.viewType;
  }
  
  var title=$routeParams.param1;
  if(title)
    $scope.currCollection = getDataTitled($scope.data_raw, title);
  else
    $scope.currCollection = getDataTitled($scope.data_raw, "Liane Zimbler Architectural Collection");
  

  $scope.openCollection = function(title) {
    $location.path("/collections/item/"+title)
  }
  $scope.gotosignin = function() {
    $location.path("/signin");
  }
  $scope.gotoBookmarks = function() {
    $location.path("/bookmarks")
  }

  $scope.openDocument = function(title) {
    $location.path("/collections/item/document/"+title)
  }
  $scope.searchQuery = function() {
    $scope.data = $scope.data_raw.filter(x=>searchFilter(x, $scope.searchTerm));
    console.log($scope.searchTerm);
  }


  $scope.data = JSON.parse(JSON.stringify($scope.data_raw));
  $scope.showSearchbar = false;
  
  $scope.filterChange = function(changeObj, type) {
    var showFilter = function(arr, value, type) {
      var valid = arr.filter(x=>x['isChecked']);
    
      if(valid.length === 0){
        valid = arr.filter(x=>true);
      }
      valid = valid.map(x=>x[type]);
      return valid.includes(value);
    }
    if(type==="year") {
      $scope.data = $scope.data_raw.filter(x=>showFilter($scope.years, x['year'], 'year'));
      $scope.apply();
    }
    else if(type==="architect") {
     $scope.data = $scope.data_raw.filter(x=>showFilter($scope.architects, x['architect'], 'architect'));
     $scope.apply();
    }
  }
  var yearFilterObj = function(year) {
    return {"year": year, "isChecked": false}
  }
  var architectFilterObj = function(name) {
    return {"architect": name, "isChecked": false}
  }
  $scope.years = $scope.data.map(x=>new yearFilterObj(x["year"]));
  $scope.architects = $scope.data.map(x=>new architectFilterObj(x["architect"]));
  $scope.sortResults = function(sortBy) {
    $scope.data = $filter('orderBy')($scope.data, sortBy, false)
  }
  
}]);


app.controller('collectionController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.data_raw = [
    {"title": "The Berta Rahm Architectural Collection",
     "year": "1998",
     "architect": "Berta Rahm",
     "description": "Architect of Switzerland. Educated at l'Ecole Polytechnique Federale de Zurich (Diploma in architecture, 1934). Inspired by her uncle",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    },
    {"title": "Sigrid L. Rupp Architectural Collection",
     "year": "1997",
     "architect": "Sigrid L. Rupp",
     "description": "Rupp's collection encompasses over twenty years of her firm, SLR/Architects, and includes",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    },
    {"title": "Liane Zimbler Architectural Collection",
     "year": "1988",
     "architect": "Liane Zimbler",
     "description": "Liane Zimbler was born in Czechoslovakia in 1892. She studied Art and Architecture at the State Art School in Austria",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    },
    {"title": "The L. Jane Hastings Architectural Papers",
     "year": "1951",
     "architect": "L. Jane Hastings",
     "description": "L. Jane Hastings was born and raised in Seattle, Washington. She received a Bachelor of Architecture from the University of Washington in 1952",
     "documents": [
        {
          "title": "",
          "img": "",
          "description": "",
          "cite": "",
          "type": ""
        } 
      ]
    }
    ];
}]);


