//function.js: Functional Logic.

define([ "promise" ], function() {
  return function( Input ) {
	return promise(function( resolve ) {
		resolve( false );
	});
  };
});
