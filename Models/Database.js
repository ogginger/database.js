//Database.js: Data logic.

define([
	"mysql",
        "jquery",
        "underscore",
        "backbone",
	"promise",
        "Functions/log"
], function(
	mysql,
        $,
        _,
        Backbone,
	promise,
        log
) {
        return Backbone.Model.extend({
		"initialize": function( Input ) {
			log("Database model initialized successfully!");
			var xDatabase = this;
			xDatabase.setup( Input );
		},
	
		defaults: function() {
			return {
				"Info": {
					"host": "localhost",
                                	"user": "",
                                	"password": ""
				},
				"Connection": undefined,
				"Status": "Down"
			};
		},

		"setup": function( Input ) {
		/* 
			Setup is called during the initialization of the model 
			to properly extend the model's state given that the 
			input for the model's instantiation does not always 
			match the structure of model's attributes.
		*/ 
			log( "Database is setting up..." );
			var xDatabase = this;
			
			
                        xDatabase.clear().set(xDatabase.defaults());
			if (
				_.has( Input, "user" ) &&
				_.has( Input, "password" )
                        ) {
                               	_.extend( xDatabase.attributes.Info, Input );
                       	} else {
                               	_.extend( xDatabase.attributes, Input );
                        }
		},

		"connect": function() {
		//Connect the database model to the nodejs mysql driver.
			log("Database is connecting...");
			var xDatabase = this;
			return promise(function( resolve, reject ) {
				try {
					xDatabase.set( "Connection", mysql.createConnection(
						xDatabase.get("Info")
					));

					xDatabase.get("Connection").connect(function( Error ) {
						if ( Error ) {
							throw Error;
						} else {
							xDatabase.set( "Status", "Connected" );
						}
					});
					log("Database connected!");
					resolve();
				} catch ( Error ) {
					xDatabase.set("Status", "Error: " + Error );
					reject( Error );
				}
			});	
		},

		"close": function() {
			log("Database is closing...");
			var xDatabase = this;
			if ( xDatabase.get("Connection") ) {
				xDatabase.get("Connection").end();
			}
		},

		"use": function( Input ) {
			var xDatabase = this;
			return promise(function( resolve, reject ) {
				xDatabase.connect().then(function() {
					Input.then(function() {
						xDatabase.close();
						resolve();
					}).catch(function( Error ) {
						reject( Error );
					});	
				});
			});
		},

		"query": function( Input ) {
			log("Database is making a query...");
			var xDatabase = this;
			return promise(function( resolve, reject ) {
				xDatabase.get("Connection").query( Input, function( Error, Result ) {
					if ( Error ) {
						reject ( Error );
					} else {
						resolve( Result );
					}
				});
			});
		}
	/*
		"create": function() {},
		"read": function() {},
		"update": function() {},
		"delete": function() {}
	//*/
        });
});

