var
	_ = require('underscore'),
	moment = require('moment');

module.exports = function() {
	/**
	 * Represents an Event, to be pushed to the iFLUX /events endpoint
	 *
	 * @param {string} typeId The type id
	 * @param {Object} properties An object with property names and values
	 * @param {Date} [timestamp=current time] When did the event happen
	 * @constructor
	 */
	function Event(typeId, properties, timestamp) {
		this.typeId = typeId;
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
		 * @param {string} typeId The event type
		 */
		setTypeId: function (typeId) {
			this.typeId = typeId;
		},

		/**
		 * @param source The event source
		 */
		setSource: function (source) {
			this.source = source;
		}
	});

	// Exports
	return Event;
};

module.exports['@require'] = [];