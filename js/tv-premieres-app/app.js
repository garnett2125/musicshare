var app = angular.module('TVPremieresApp',[]);
app
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
