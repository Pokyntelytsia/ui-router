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

    $stateProvider.state(helloState).state(aboutState);
   // $stateProvider.state(aboutState);
});
myApp.controller('aboutController',['$scope',function ($scope) {
    console.log('in controller')
    $scope.title = 'Its the UI-Router hello world app!';
}]);