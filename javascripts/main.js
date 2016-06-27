"use strict";

var Catalog = angular.module('catalog', ['ngRoute']);

Catalog.config(($routeProvider) => {

  firebase.initializeApp({
    apiKey: "AIzaSyCSJtE8Eh9Lx1TylzCIg3xmG-HKY6ybxFk",
    authDomain: "catalogr-52a59.firebaseapp.com",
    databaseURL: "https://catalogr-52a59.firebaseio.com",
    storageBucket: "catalogr-52a59.appspot.com",
  });

  // $routeProvider.otherwise({
  //   controller: 'AuthCtrl',
  // 	redirectTo: '/auth/login'
  // });
  $routeProvider
  .when('/', {
    // controller: 'TestCtrl',
    controller: 'AuthCtrl',
    controllerAs: 'auth',
    templateUrl: '/auth/login.html'
  })
  .when('#index', {
  	controller: 'MainCtrl',
  	controllerAs: 'main',
  	templateUrl: 'index.html'
  });

})
.controller('MainCtrl', function($timeout) { 
	const main = this;

	firebase.database().ref('/').on('value', (snap) => {
	  const data = snap.val();
	  console.log("data = ", data);
	  main.test = data;
	  console.log("main.test.media = ", main.test.media);
	  $timeout();
	});


	// Onclick event for setting the ownership of an item true or false in firebase
	main.isOwned = function(id, value) {

		firebase.database().ref(`/media/${id}`).child("owned").set(value);
	};

	// Onclick event for deleting the item from the database
	main.deleteItem = function(id) {

		firebase.database().ref(`/media`).child(id).set(null);
	};

	main.setType = function(id, value) {

		firebase.database().ref(`/media/${id}`).child("mediaType").set(value);
	};


})
.service('myAuth', function() {


}) 
.service('TestJson', function($http) {

	const test = this;

	test.getJson = function(x) {
		$http.get('testjson/geb.json')
		.success(function(data) {
		  x(data);
		});
	};
});