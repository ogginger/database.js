//log.js: Functional Logic.

define([
  "jquery",
  "underscore"
], function(
      $,
      _
) {
  return function( Input, Boolean ) {
    if ( Boolean === undefined ) {
      Boolean = true;
    }
    
    
    if ( Boolean === true ) {
      console.log( Input ); 
    }
  };
});