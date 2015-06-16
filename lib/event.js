var
	_ = require('underscore'),
	moment = require('moment');

module.exports = function() {
	/**
	 * Represents an Event, to be pushed to the iFLUX /events endpoint
	 *
	 * @param {string} type The type
	 * @param {Object} properties An object with property names and values
	 * @param {Date} [timestamp=current time] When did the event happen
	 * @constructor
	 */
	function Event(type, properties, timestamp) {
		this.type = type;
		this.properties = properties;

		if (timestamp === undefined) {
			this.timestamp = moment.utc();
		}
		else {
			this.timestamp = moment.utc(timestamp);
		}

		this.timestamp = this.timestamp.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
	}

	_.extend(Event.prototype, {
		/**
		 * @param {Date} timestamp The timestamp
		 */
		setTimestamp: function (timestamp) {
			this.timestamp = timestamp;
		},

		/**
		 * @param {string} type The event type
		 */
		setType: function (type) {
			this.type = type;
		},

		/**
		 * @param sourceId The event source instance id
		 */
		setSourceId: function (sourceId) {
			this.sourceId = sourceId;
		}
	});

	// Exports
	return Event;
};

module.exports['@require'] = [];