var app = angular.module('MusicShareApp',[]);
app
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
