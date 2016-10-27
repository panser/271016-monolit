(function() {
    'use strict';

    angular
        .module('271016MonolitApp')
        .controller('TicketDialogController', TicketDialogController);

    TicketDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Ticket', 'Customer'];

    function TicketDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Ticket, Customer) {
        var vm = this;

        vm.ticket = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.customers = Customer.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.ticket.id !== null) {
                Ticket.update(vm.ticket, onSaveSuccess, onSaveError);
            } else {
                Ticket.save(vm.ticket, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('271016MonolitApp:ticketUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.departureDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
