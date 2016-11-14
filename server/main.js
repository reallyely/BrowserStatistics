// TODO: Normalize data trends against total hits
import watch from 'node-watch';

import { read } from 'excel-data';
import { Meteor } from 'meteor/meteor';

import { BrowserStatistics } from '../imports/api/browserStatistics.js';
import { OperatingStatistics } from '../imports/api/operatingStatistics.js';

import { Customers } from '../imports/api/customers.js';
import { Browsers } from '../imports/api/browsers.js';
import { OperatingSystems } from '../imports/api/operatingSystems.js';

let sheetsPath = 'C:\\MeteorTest\\BrowserStats\\sheets'
Meteor.startup(() => {
	// When a a file in the sheets directory changes, automatically run script to update DB with new information
	let wrappedWatch = Meteor.wrapAsync(watch);
	wrappedWatch(sheetsPath, filename => {
		BrowserStatistics.remove({})
		if (filename.startsWith(`${sheetsPath}\\BrowserStatistics`)) {
			let prod = /(\d+)\.xls$/.exec(filename)[1]

			if (BrowserStatistics.find({prod_id: prod})) {
				console.log(`removing prod_id: ${prod}`);
				BrowserStatistics.remove({prod_id: prod})
				// Browsers.remove({})
				// Customers.remove({})
				// OperatingSystems.remove({})
			}

			read(filename).then(Meteor.bindEnvironment(
				(result) => {
					let browsers = result.browsersbycustomer.data
					let operatingSystems = result.operatingsystems.data

					browsers.forEach(record => {
						if (Array.isArray(record.browser.match(/^(\D*)\s(.*)/))) {
							var [browser, browserName, browserVer] = /^(\D*)\s(.*)/.exec(record.browser)
						} else {
							var browserName = record.browser
							var browserVer = 0
						}

						BrowserStatistics.insert(
							{
								browser_id: record.browser,
								customer_id: record.customer,
								prod_id: prod,
								browser_name: browserName,
								browser_version: browserVer,
								total: Number(record.total),
								mtd: Number(record.mtd),
								ytd: Number(record.ytd),
								"365days": Number(record["365days"]),
								"180days": Number(record["180days"]),
								"90days": Number(record["90days"]),
								"30days": Number(record["30days"]),
							}
						)
					})

					operatingSystems.forEach(record => {
						OperatingStatistics.upsert(
							{prod: prod},
							{
								$setOnInsert: {prod: prod},
								$addToSet: {
									operatingsystems: {
										name: record.operatingsystem,
										total: record.total,
										mtd: record.mtd,
										ytd: record.ytd,
										"365days": record["365days"],
										"180days": record["180days"],
										"90days": record["90days"],
										"30days": record["30days"]
									}
								}
							}
						);
					});
				}
			)).catch(err=>console.log(err));
		}
	})

});
