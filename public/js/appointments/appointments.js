'use strict';

angular.module('agAppts')
  .controller('AppointmentsController', ['$scope', '$uibModal', 'AppointmentsService', function($scope, $uibModal, AppointmentsService) {
    let vm = this;
    vm.timeSlots;

    AppointmentsService.getAppointments()
      .then(function (appointments) {
        vm.timeSlots = appointments;
      })
      .catch( function (error) {
        //handle errors
      });

    vm.editSlot = function editSlot (slot) {
      var editSlotModal = $uibModal.open({
        templateUrl: '/js/appointments/editSlot.html',
        controller: 'EditSlotController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          slot: function () {
            return _.cloneDeep(slot);
          }
        }
      });

      editSlotModal.result.then(function (editedSlot) {
        let origSlot = _.find(vm.timeSlots, {'slotId': editedSlot.slotId});
        if (!_.isEmpty(origSlot)) {
          _.assign(origSlot, editedSlot);
        }
        origSlot.isAssigned = !_.isEmpty(_.get(slot, 'customer.name'));
        origSlot.status = origSlot.isAssigned? 'Assigned': 'Open';
      }, function () {
        //error handling goes here
      });
    };

  }])
  .controller('EditSlotController', ['$scope', '$uibModalInstance', 'slot', function ($scope, $uibModalInstance, slot) {
    let vm = this;
    vm.slot = slot;
    $scope.slotAssignForm = {};

    vm.okHandler = function () {
      $uibModalInstance.close(slot);
    };

    vm.cancelHandler = function () {
      $uibModalInstance.dismiss('cancelled');
    };

    vm.removeAssigned = function removeAssigned () {
      vm.slot.customer = undefined;
      $uibModalInstance.close(vm.slot);
    };
  }])
  .factory('AppointmentsService', ['$http', function ($http) {
    var getAppointments = function() {
      return $http.get("http://localhost:3002/appointments")
        .then(function(appointments) {
          return appointments.data;
        });
    };
    return {
      getAppointments: getAppointments
    };
  }]);
