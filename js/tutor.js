console.log(' in tutor.js');

let myApp = angular.module('uiRouterApp',[
    'ui.router'
]);

myApp.config(function ($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    }

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<div ng-controller="aboutController"><h3 ng-bind="title"></h3></div>'
    }

    var peopleState = {
        name:'people',
        url: "/people",
        resolve: {
            people: function(PeopleService) {
                return PeopleService.getPeople();
            }
        },
        component: 'people'
    }

    var personState = {
        name: 'people.person',
        url: "/{personId}",
        resolve: {
            person: function(people, $stateParams) {
                return people.find((person) => {
                    return person.id === $stateParams.personId
                });
            }
        },
        component: 'person'
    }

    $stateProvider
        .state(helloState)
        .state(aboutState)
        .state(peopleState)
        .state(personState);

});


myApp.controller('aboutController',['$scope',function ($scope) {
    console.log('in controller')
    $scope.title = 'Its the UI-Router hello world app!';
}]);


myApp.component('people',{
    bindings: {people: '<'},
    templateUrl: "/tmpl/people.html",
    controller: function () {
        console.log('this.people',this.people)
    }
});

myApp.component('person',{
    bindings: {person: '<'},
    templateUrl: "/tmpl/person.html"
});


myApp.service('PeopleService',['$http', function ($http) {
   var service = {};

   service.getPeople = function () {
       return $http.get('people.json', {cache: true}).then((resp) => {
           return resp.data
       })
   };

   service.getPerson = function (personId) {
     function getPersonById(person) {
        return person.id === personId
     }
     return service.getPeople().then((persons) => {
         return persons.find(getPersonById)
     })
   };

   return service
}]);