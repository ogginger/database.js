//test_bCreateDatabase.js: Testing Logic.

define([
  "TestSuite",
  "Functions/log",
  "Functions/bCreateDatabase"
], function(
  TestSuite,
  log,
  bCreateDatabase
) {
  return TestSuite.extend({
    "initialize": function() {
      log("test_bCreateDatabase initialized successfully!");
      var xTestSuite = this;
      xTestSuite.set( "MethodUnderTest", "bCreateDatabase" );
      
      xTestSuite.add({
	"Async": true,
        "Name": "bCreateDatabase_DataStructure_Data_ReturnsTrue",
        "Input": {},
        "Function": bCreateDatabase,
        "ExpectedOutput": true
      });
      
      xTestSuite.test();
    }
  });
});
