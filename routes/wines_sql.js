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
      database : 'aimdb',
    }
	var SQL_table = 'wines';
// Connexion to the SQL database
var SQLconnection = mysql.createConnection( mySQLConf );
SQLconnection.connect();

var MSG_DBCONNECT = 'Connecting to mySQL database' + mySQLConf.database + '"';
var MSG_DBQUERY = 'Executing query on "' + mySQLConf.database + '"';;

var count=0; 

	var EventEmitter = require('events').EventEmitter;
	var WineEmit = new EventEmitter();
	
		WineEmit.on('addWine', function(message){
		console.log(message);
	});
	WineEmit.on('updateWine', function(message){
		console.log(message);
	});
		WineEmit.on('deleteWine', function(message){
		console.log(message);
	});
		WineEmit.on('findAll', function(message){
		console.log(message);
	});
		WineEmit.on('findById', function(message){
		console.log(message);
	});
	
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving "wine item" by id: ' + id);
	
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
	
	WineEmit.emit('findById', 'findById wine !');
};

exports.findAll = function(req, res) {

	WineEmit.emit('findAll', 'findAll wine !');
	
	console.log('Retrieving all "wines" items...');
	console.log("req.query="+util.inspect(req.query, false, null));
 	console.log("req.params="+util.inspect( req.params, false, null));
	console.log("req.route="+util.inspect(req.route, false, null));	
	
	var critere = req.query.order_by;
	var orderBy=["id","name","year","grapes","country","region","description","picture"];

	aim_utl.trace_info("critere_value="+critere+" :"+orderBy[critere]);
	if (critere == null || critere <0 || critere >= orderBy.length)	{
		critere=3; // set default order by criteria
	}
	
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + "." +SQL_table+" ORDER BY "+orderBy[critere];
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

exports.addWine = function(req, res) {


	WineEmit.emit('addWine', 'adding new wine !');

    var wine = req.body;

	var RandYear = aim_utl.randomIntFromInterval(1990, 2010);
    console.log('Adding wine: ' + JSON.stringify(wine));
	
	// PHP :
	//$sql = "INSERT INTO wine (name, grapes, country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
	
	count++;
	var mySQLQuery = "INSERT INTO " + mySQLConf.database + "." +SQL_table+" (name, grapes, country, region, year, description, picture) VALUES ('new_item_"+count+"','add_grapes', 'add_country', 'add_region', '"+RandYear+"', 'add_description', 'generic.jpg')";
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

exports.updateWine = function(req, res) {


	WineEmit.emit('updateWine', 'adding new wine !');
	
    var id = req.params.id;
    var wine = req.body;
    delete wine._id;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
	// PHP :
	//$sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description WHERE id=:id";
	var mySQLQuery = "UPDATE " + mySQLConf.database + "." +SQL_table+" SET name='up_name', grapes='up_grapes', country='up_country', region='up_region', year='up_year', description='up_description', picture='up_picture.jpg' WHERE id="+ id;
	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(SQL_result_rows, false, null));
			//res.send(SQL_result_rows);
			res.send(wine);
		}
	});
}

exports.deleteWine = function(req, res) {


	WineEmit.emit('deleteWine', 'adding new wine !');
	
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
	// PHP :
	//$sql = "DELETE FROM wine WHERE id=:id";
	var mySQLQuery = "DELETE  FROM " + mySQLConf.database + "." +SQL_table+" WHERE id="+ id;
	SQLconnection.query(mySQLQuery, function(err, SQL_result_rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(SQL_result_rows, false, null));
			//res.send(SQL_result_rows);
			res.send(req.body);
		}
	});	
}
