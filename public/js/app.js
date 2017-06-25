(function () {
  'use strict';
  angular.module('agAppts', ['ui.router', 'ui.bootstrap'])
    .config(config)
    .run(run)
    .controller('HeaderController', ['$scope', function($scope) {
      var vm = this;
      vm.title = "Appointment List";
    }]);

  function config($stateProvider, $urlRouterProvider) {
    // default route
    $urlRouterProvider.otherwise("/appointments");

    $stateProvider
      .state('appointments', {
        url: '/appointments',
        templateUrl: '/js/appointments/appointments.html',
        controller: 'AppointmentsController',
        controllerAs: 'vm'
      });
  }

  function run($rootScope) {
    //code goes here - checks for state change etc. any horizontal concerns go here too
    // if it grows big move it to a runs.js file
  }
})();
