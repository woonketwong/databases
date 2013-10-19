var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {
  port: 3306
});

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

var http = require("http");
var handler = require("./request-handler");
var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(request, response){
  handler(request, response, Sequelize, sequelize);
});
server.listen(port, ip);
console.log("Listening on http://" + ip + ":" + port);