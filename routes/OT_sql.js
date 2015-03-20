// Declaring 'require' moduled used
var mysql = require('mysql');
var util = require('util');
var aim_utl = require('./AIM_util');

// Setting config parameters for connection with mySQL db
var mySQLConf =     {
      host     : 'localhost',
      user     : 'root',
      password : '',
	  port     : 3306,
      database : 'ObjTech',
    }
	var SQL_table = 'table1';
// Connexion to the SQL database
var SQLconnection = mysql.createConnection( mySQLConf );
SQLconnection.connect();

var MSG_DBCONNECT = 'Connecting to mySQL database' + mySQLConf.database + '"';
var MSG_DBQUERY = 'Executing query on "' + mySQLConf.database + '"';
console.log(MSG_DBCONNECT);
var count=0; 

exports.findItemById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving "OT_MBD_CR item" by id: ' + id);
	
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

exports.findAllItems = function(req, res) {

	console.log('Retrieving all "OT_MBD_CR" items...');
	console.log("req.query="+util.inspect(req.query, false, null));
 	console.log("req.params="+util.inspect( req.params, false, null));
	console.log("req.route="+util.inspect(req.route, false, null));	
	
	var critere = req.query.order_by;
	var orderBy=["id"];

	aim_utl.trace_info("critere_value="+critere+" :"+orderBy[critere]);
	if (critere == null || critere <0 || critere >= orderBy.length)	{
		critere=3; // set default order by criteria
	}
	
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + "."+SQL_table;
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

exports.addItem = function(req, res) {
    var OT_MBD_CR = req.body;
	//var RandYear = aim_utl.randomIntFromInterval(1990, 2010);
    console.log('Adding OT_MBD_CR: ' + JSON.stringify(OT_MBD_CR));
	console.log("req.query="+util.inspect(req.query, false, null));
 	console.log("req.params="+util.inspect( req.params, false, null));
	console.log("req.route="+util.inspect(req.route, false, null));		
	count++;

	var mySQLQuery ="INSERT INTO " + mySQLConf.database + "."+SQL_table + "(RC_Number,Iss_MBD,Ind_Matis,WU,Priority,Status,Customer,PN,Part_name,Aircraft,Program,Prestation,Comments) VALUES (49318	,	2	,	'A'	,	'"+count+"'	,'"+OT_MBD_CR.name+"',	'delivered'	,'"+OT_MBD_CR.email+"','18968-000-01'	,'Caisson','Dauphin','Com&Mil','Matis','"+OT_MBD_CR.pwd+"')";

	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(SQL_result_rows, false, null));
			res.send(SQL_result_rows);
		}
	});

}

exports.updateItem = function(req, res) {
    var id = req.params.id;
    var OT_MBD_CR = req.body;
    //delete OT_MBD_CR._id;
    console.log('Updating OT_MBD_CR: ' + id);
    console.log(JSON.stringify(OT_MBD_CR));
	
	var mySQLQuery = "UPDATE " + mySQLConf.database + "." +SQL_table+" SET RC_Number="+OT_MBD_CR.RC_Number+", Iss_MBD="+OT_MBD_CR.Iss_MBD+", Ind_Matis="+OT_MBD_CR.Ind_Matis+" , WU='"+OT_MBD_CR.WU+"' WHERE id="+OT_MBD_CR.id;
	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(SQL_result_rows, false, null));
			res.send(OT_MBD_CR);
		}
	});
}

exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Deleting OT_MBD_CR: ' + id);

	var mySQLQuery = "DELETE  FROM " + mySQLConf.database + "." +SQL_table+" WHERE id="+ id;
	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(SQL_result_rows, false, null));

			res.send(req.body);
		}
	});
}