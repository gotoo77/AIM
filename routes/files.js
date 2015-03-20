var path = 'C:/Users/EPR_Consultant07/Desktop/node.js_test/AIM_rest/files/';


exports.download = function(req, res) {
    var id = req.params.id;
    console.log('downloading file id: ' + id);
/*
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + ".wines WHERE id=" + id;
	debugger;
	dbClient.query(mySQLQuery, function(err, rows){
		if (err != null) {
			trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery +':'+err.code);
		} else {
			trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery);
			console.log(util.inspect(rows, false, null));
			res.send(rows);
		}
	});*/
	// downloading a file from specified path 
	res.download(path+'test.pdf');
};

exports.createPDF = function(req, res) {
	var phantom = require('phantom');
	
	phantom.create(function(ph){
	  ph.createPage(function(page) {
		page.open("http://www.google.com", function(status) {
		  page.render('google.pdf', function(){

			console.log('Page Rendered');
			ph.exit();

		  });
		});
	  });
	});
}

