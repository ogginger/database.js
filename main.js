//node_main.js: Main logic for Node application.
/* This file depends on nodejs and nodejs modules. */

/*
	Nodejs Module Dependencies: 
		1. requirejs
		2. fs
		3. jquery
*/

var requirejs = require("requirejs");

requirejs.config({
        nodeRequire: require,
        paths: {
		"rsvp": "lib/rsvp.min",
		"backbone": "lib/backbone.min",
		"underscore": "lib/underscore.min"
	},
        bundles: {
		"lib/snip.min": [ "Snip" ],
		"lib/file.min": [ "file" ],
                "lib/testsuite.min": [ "TestSuite" ],
                "lib/promise.min": [ "promise" ]
	},
	shim: {
		"underscore": {
			deps: [
				"jquery"
			],
			exports: "_"
		},
		"backbone": {
			deps: [
				"underscore"
			],
			exports: "Backbone"
		},
		"file": {
			deps: [
				"fs",
				"rsvp"
			],
			exports: "file"
		},
		"Snip": {
			deps: [
				"file",
				"backbone"
			],
			exports: "Snip"
		},
		"promise": {
                        deps: [
                                "rsvp"
                        ],
                        exports: "promise"
                }

	}
});

requirejs([
	"promise",
	"Models/Database",
	"file",
	"Snip",
	"Functions/tests/test_bCreateDatabase",
	"Functions/log"
], function(
	promise,
	Database,
	file,
	Snip,
	test_bCreateDatabase,
	log
) {
	console.log("Main initialized successfully!");
//*
	var Home = new Database({
		"host": "172.17.0.2",
		"user": "josh",
		"password": "1q2w3e4r",
		"database": "Example"
	});

	Home.use(promise(function( resolve ) {
		Home.query("Select * from List").then(function( Result ) {
			log("Result: " + JSON.stringify( Result ));
			
		});
	}));
//*/

	//new test_bCreateDatabase();


	/*
        var xSnip = new Snip({
                "Dir": "/home/josh/database/Snippets/",
                "Snippets": {
                        "testsuite":"testsuite.txt",
                        "function":"function.txt",
			"model":"model.txt"
                }
        });

        var sTemplateType = "model";
        var sFileName = "/home/josh/database/Models/Database.js";

        xSnip.snip( sTemplateType ).then(function( Template ) {
                file.create({
                        "Name": sFileName,
                        "Body": Template
                }).then(function() {
                        console.log("Done.");
                }).catch(function( Error ) {
                        console.log( "File error: " + Error );
                });
        }).catch(function( Error ) {
                console.log("Snip error: " + JSON.stringify( Error ));
        });
        //*/

});
