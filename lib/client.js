var RestClient = require('node-rest-client').Client;
var moment = require('moment'); 

// We will use the REST client to POST events to iFLUX
var restClient = new RestClient();


/**
 * Constructor for the iFLUX Client. 
 * @constructor
 * @param {string} endpointUrl - The URL prefix for the API (e.g. http://api.iflux.io/api)
 */
var Client = function(endpointUrl) {
		this.endpointUrl = endpointUrl;
	}

/**
 * Notify an event by POSTing an event payload to the /events endpoint
 * @param {object} event - the event to notify
 */
Client.prototype.notifyEvent = function(event) {
	var events = [];
	events.push(event);

	var args = {
	  data: events,
	  headers:{"Content-Type": "application/json"} 
	};

	restClient.post(this.endpointUrl + "/events", args, function(data, response) {
		console.log(data);
	});
}

Client.prototype.executeAction = function(action) {
	var actions = [];
	actions.push(action);
	
	var args = {
	  data: events,
	  headers:{"Content-Type": "application/json"} 
	};

	restClient.post(this.endpointUrl + "/actions", args, function(data, response) {
		console.log(data);
	});
	
}

/**
 * Represents an Event, to be pushed to the iFLUX /events endpoint 
 * @constructor
 * @param {string} type - The URL prefix for the API (e.g. http://api.iflux.io/api)
 * @param {Object} properties - an object with property names and values
 * @param {Date} [timestamp=current time] - when did the event happen
 */
var Event = function(type, properties, timestamp) {
	this.type = type;	
	this.properties = properties;
	
	if (timestamp === undefined) {
		this.timestamp = moment.utc();
	} else {
		this.timestamp = moment.utc(timestamp);
	}
	this.timestamp = this.timestamp.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
}

Event.prototype.setTimestamp = function(timestamp) {
	this.timestamp = timestamp;
}

Event.prototype.setType = function(type) {
	this.type = type;
}

// Exports
module.exports.Client = Client;
module.exports.Event = Event;
