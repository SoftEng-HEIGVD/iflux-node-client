var
	_ = require('underscore'),
	RestClient = require('node-rest-client').Client,
	moment = require('moment');

// We will use the REST client to POST events to iFLUX
var restClient = new RestClient();


/**
 * Constructor for the iFLUX Client.
 * @constructor
 * @param {string} endpointUrl - The URL prefix for the API (e.g. http://api.iflux.io/api)
 */
var Client = function(endpointUrl, source) {
	this.endpointUrl = endpointUrl;

	if (source !== undefined) {
		this.source = source;
	}
}

/**
 * Notify an event by POSTing array of events payload to the /events endpoint
 * @param {Array(object)} events - the events to notify
 */
Client.prototype.notifyEvents = function(events) {
	// Check and enrich the event source if necessary
	_.each(events, function(event) {
		if (event.source === undefined) {
			event.setSource(this.source);
		}
	}, this);

	var args = {
	  data: events,
	  headers:{"Content-Type": "application/json"}
	};

	restClient.post(this.endpointUrl + "/events", args, function(data, response) {
		console.log(data);
	});
}

/**
 * Notify an event by POSTing an event payload to the /events endpoint
 * @param {object} event - the event to notify
 */
Client.prototype.notifyEvent = function(event) {
	var events = [];

	events.push(event);

	this.notifyEvents(events);
}

Client.prototype.executeAction = function(action) {
	console.log("POSTing action to " + action.target);
	var actions = [];
	actions.push(action.payload);

	var args = {
	  data: actions,
	  headers:{"Content-Type": "application/json"}
	};

	restClient.post(action.target + "/actions", args, function(data, response) {
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

Event.prototype.setSource = function(source) {
	this.source = source;
}

// Exports
module.exports.Client = Client;
module.exports.Event = Event;
