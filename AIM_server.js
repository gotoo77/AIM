//******************************************************************************
//		AIM server (test)
//******************************************************************************

// Declare all modules used
var express = require('express'),
    path = require('path'),
    http = require('http'),
		//wine = require('./routes/wines'); // original base using mongoDB
    wine = require('./routes/wines_sql'),
	airport = require('./routes/airports_sql'),
	OT_MBD = require('./routes/OT_sql'),
	file = require('./routes/files');
	//aim_util = require('./routes/AIM_util');



var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};



var fs = require('fs');

// Declare variables
var AIM_Port = 3000;
var AIM_Version ='0.2.2';	

// using express module
var app = express();

var app_logFileName = 'AIM_traces.log';
var logFileStream = fs.createWriteStream("./"+app_logFileName, {flags: 'a'}); //use {flags: 'w'} to open in write mode


// Configuration of app
app.configure(function () {
    app.set('port', process.env.PORT || AIM_Port); 	// setting port for AIM application server
	app.set('version', AIM_Version);				// setting version for AIM application server
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.logger(logFileStream));			// setting log file stream for AIM application server
    //app.use(express.bodyParser()), // cf : http://stackoverflow.com/questions/19581146/how-to-get-rid-of-connect-3-0-deprecation-alert
	app.use(express.json());
	app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, 'public'))); // setting access to 'public' directory
	app.use(express.static(path.join(__dirname, 'files'))); // setting access to 'files' directory
});

// Functions to execute when 'CRUD' method received ( REST architecture)
// 'wines' service
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
// 'airport' service
app.get('/airports', airport.findAll);
app.get('/airports/:id', airport.findById);
// 'OT_MBD' service
app.get('/OT_MBD', OT_MBD.findAllItems);
app.get('/OT_MBD/:id', OT_MBD.findItemById);
app.post('/OT_MBD/create', OT_MBD.addItem);
app.put('/OT_MBD/:id', OT_MBD.updateItem);
app.delete('/OT_MBD/:id', OT_MBD.deleteItem);

// test : download a file
app.get('/download', file.download);
// test : create a pdf snapshot file
app.get('/pdf', file.createPDF);


// Running HTTP server on configured port
http.createServer(app).listen(app.get('port'), function () {
	var one_line = "*-*-*************************************************-*-*";
	console.log(one_line);
    console.log("AIM - Node.js server listening on port " + app.get('port'));
	console.log("Version is :"+app.get('version') + " (Powered by Express)");
	console.log(one_line);
});
