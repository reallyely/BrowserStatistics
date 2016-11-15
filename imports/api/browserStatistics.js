import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import _ from 'lodash';

export const BrowserStatistics = new Mongo.Collection('browserstatistics');

const filterSchema = {
	browsers: 'browser_name',
	// customers: 'customer_id'
}

// mutate this to track state for db calls??
let filterState = {}

function getFilterValues(data) {
	return _.reduce(this.filterSchema, (obj, field, key) => {
		return obj[key] = _.uniq(_.map(data, field))
	}
	, {})
}

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('browserstatistics', (filter) => {
    return BrowserStatistics.find(filterState);
  });
}

Meteor.methods({
	'browserstatistics.get.filters'(data) {
		let out = _.reduce(filterSchema,
			(obj, field, key) => {
				obj[key] = []
				obj[key] = _.uniq(_.map(data, field))
				return obj
			}, {});
		return out
	},
	
	'browserstatistics.update.filters'(filterCategory, filterValue, previousState) {
		var state = previousState
		var foundIndex = _.indexOf(state[filterCategory], filterValue)
		if (foundIndex >= 0) {
			var newValue = _.without(state[filterCategory], filterValue)
		} else {
			var newValue = _.concat(state[filterCategory], filterValue)
		}

		state[filterCategory] = newValue
		filterState = state
		console.log(filterState);
		return state
	},
	getBrowserData( filter ) {
		let group = {
			_id: {
				browser: '$browser'
			},
			total: {
				$sum: '$total'
			}
		}
		return BrowserStatistics.aggregate(
			{ $match: 'Chrome'},
			{ $group: group}
		)
	}

})
