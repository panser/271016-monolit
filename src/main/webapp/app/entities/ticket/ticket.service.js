(function() {
    'use strict';
    angular
        .module('271016MonolitApp')
        .factory('Ticket', Ticket);

    Ticket.$inject = ['$resource', 'DateUtils'];

    function Ticket ($resource, DateUtils) {
        var resourceUrl =  'api/tickets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.departureDate = DateUtils.convertLocalDateFromServer(data.departureDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.departureDate = DateUtils.convertLocalDateToServer(copy.departureDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.departureDate = DateUtils.convertLocalDateToServer(copy.departureDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
