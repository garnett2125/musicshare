var app = angular.module('MusicShareApp',[]);
app.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });


app.directive('showhide', function() {
  return {
    restrict: "A", // A = Attribute, C = Class Name, E = Element, M = HTML Comment
    link: function(scope, element, attributes) {

      //element.css('display', 'none');
      element.parent().bind('mouseenter', function() {
        //element.css('display', 'block');

      });
      element.parent().bind('mouseleave', function() {
        //element.css('display', 'none');
      });
    }
  };
});

