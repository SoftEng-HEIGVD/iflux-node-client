var _ = require('underscore');

module.exports = function(restClient, print) {
	/**
	 * Constructor for the iFLUX Client.
	 *
	 * @param {string} endpointUrl The URL prefix for the API (e.g. http://api.iflux.io/api)
	 * @param {string} sourceId The event source id
	 * @constructor
	 */
	function Client(endpointUrl, sourceId) {
		this.restClient = new restClient.Client();

		this.endpointUrl = endpointUrl;

		if (this.endpointUrl) {
			// Remove the trailing slash if necessary
			if (this.endpointUrl.indexOf('/', this.endpointUrl.length - 1) !== -1) {
				this.endpointUrl = this.endpointUrl.substr(0, this.endpointUrl.length - 2);
			}

			// Add the default version if not present
			// TODO: The client should take care of the version in a better way
			if (this.endpointUrl.indexOf('/v1', this.endpointUrl.length - 3) === -1) {
				this.endpointUrl = this.endpointUrl + '/v1';
			}
		}

		if (sourceId !== undefined) {
			this.sourceId = sourceId;
		}
	}

	_.extend(Client.prototype, {
		/**
		 * Notify an event by POSTing array of events payload to the /events endpoint
		 *
		 * @param {Object[]} events the events to notify
		 */
		notifyEvents: function (events) {
			// Check and enrich the event source if necessary
			_.each(events, function (event) {
				if (event.sourceId === undefined) {
					event.setSourceId(this.sourceId);
				}
			}, this);

			var options = {
				data: events,
				headers: { "Content-Type": "application/json" }
			};

			this.restClient.post(this.endpointUrl + "/events", options, function (data, response) {
				print(data);
			});
		},

		/**
		 * Notify an event by POSTing an event payload to the /events endpoint
		 *
		 * @param {Object} event The event to notify
		 */
		notifyEvent: function (event) {
			var events = [];

			events.push(event);

			this.notifyEvents(events);
		}
	});

	// Exports
	return Client;
};

module.exports['@require'] = [ 'node-rest-client', 'print' ];