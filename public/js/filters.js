angular.module('HeaderModule')
  .filter('toUpperCase', function() {
    return function(input) {
      return input.toUpperCase();
    };
  });
