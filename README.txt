//Database.js is a map of http methods to database crud methods.

HTTP.POST -> Database.Create
HTTP.GET -> Database.Read
HTTP.PUT -> Database.Update
HTTP.DELETE -> Database.Delete

Database has a database object passed to it on the server and then exposes restful functionality to the client for interacting with the database.


