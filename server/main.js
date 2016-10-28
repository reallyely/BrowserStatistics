import watch from 'node-watch';
import { read } from 'excel-data';
import { Meteor } from 'meteor/meteor';
import { BrowserStatistics } from '../imports/api/browserStatistics.js';
import _ from 'lodash';

Meteor.startup(() => {
	BrowserStatistics.remove({})
	// When a a file in the sheets directory changes, automatically run script to update DB with new information
	let wrappedWatch = Meteor.wrapAsync(watch);
	wrappedWatch('C:/MeteorTest/BrowserStats/sheets', filename => {
		if (filename.match(/BrowserStatistics/i)) {
			let prod = /(\w+)\.xls$/.exec(filename)[1]

			if (BrowserStatistics.find({prod})) {
				BrowserStatistics.remove({prod})
			}

			read(filename).then(Meteor.bindEnvironment(
				(result) => {
					BrowserStatistics.insert({prod})
					_.keys(result).forEach(key => {
						console.log(key);
						BrowserStatistics.upsert({prod}, {
							$push: {
								categories: {records: result[key], title: key}
							}
						})
					})
				}
			)).catch(err=>console.log(err));
		}
	})

});

//
// Meteor.publish('browserstats', () => {
// 	return BrowserStatistics.find({})
// })
