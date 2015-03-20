var moment = require('moment');
var util = require('util');

// definition de variable "utilitaires"
var nodeServerName = '[AIM@IFE_server]>';
var MSG_SUCCESS = ' <Succes> ';
var MSG_ERROR = ' <ERROR> ';
var MSG_INFO = ' <Info> ';
var timeFormat = ' DD-MM-YYYY|hh:mm:ss:SSS a>'

var b_TRACE_ENABLED = true;
var TRACE_type = 2;

var trace = function(mymsg){
	if (b_TRACE_ENABLED)
	{
		switch(TRACE_type) 
		{ 
			case 0: 
				console.log(mymsg);
			break; 		
			case 1: 
				console.log(moment().format(timeFormat) + mymsg);
			break; 
			case 2: 
				console.log(nodeServerName + moment().format(timeFormat) + mymsg);
			break; 
			default: 
				console.log(nodeServerName + mymsg);
			break; 
		}
	}	
}

var trace_err = function(mymsg) {
  trace( MSG_ERROR + mymsg);
}

var trace_ok = function (mymsg) {
  trace( MSG_SUCCESS + mymsg);
}

var trace_info = function (mymsg) {
  trace( MSG_INFO + mymsg);
}

exports.trace = trace;
exports.trace_err = trace_err;
exports.trace_ok = trace_ok;
exports.trace_info = trace_info;

var randomIntFromInterval = function (min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.randomIntFromInterval = randomIntFromInterval;
