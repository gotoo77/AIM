// Declaring 'require' moduled used
var mysql = require('mysql');
var util = require('util');
var aim_utl = require('./AIM_util');
var fs = require("fs");

// Setting config parameters for connection with mySQL db
var mySQLConf =     {
      host     : 'localhost',
      user     : 'root',
      password : '',
	  port     : 3306,
      database : 'aimdb',
    }
	var SQL_table = 'airports';
// Connexion to the SQL database
var SQLconnection = mysql.createConnection( mySQLConf );
SQLconnection.connect();

var MSG_DBCONNECT = 'Connecting to mySQL database' + mySQLConf.database + '"';
var MSG_DBQUERY = 'Executing query on "' + mySQLConf.database + '"';;

var count=0; 


exports.resetDefaultDatabase = function(req, res) {
var mySQLQuery = "";
fs.readFile("example.txt", "UTF8", function(err, data) {
    if (err) { throw err };
    global_data = data;
    console.log(global_data);
});

}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving "airport item" by id: ' + id);
	
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + "." +SQL_table+" WHERE id=" + id;
	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery +':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery);
			console.log(util.inspect(SQL_result_rows, false, null));
			res.send(SQL_result_rows);
		}
	});
};

exports.findAll = function(req, res) {

	console.log('Retrieving all "airports" items...');
	console.log("req.query="+util.inspect(req.query, false, null));
 	console.log("req.params="+util.inspect( req.params, false, null));
	console.log("req.route="+util.inspect(req.route, false, null));	
	
	var critere = req.query.order_by;
	var orderBy=["id","name","country","description","picture"];

	aim_utl.trace_info("critere_value="+critere+" :"+orderBy[critere]);
	if (critere == null || critere <0 || critere >= orderBy.length)	{
		critere=3; // set default order by criteria
	}
	
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + "."+SQL_table+" ORDER BY "+orderBy[critere];
	// Executing SQL request 
	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery +':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery);
			console.log(util.inspect(SQL_result_rows, false, null));
			res.send(SQL_result_rows);
		}
	});

};

