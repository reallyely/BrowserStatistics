import watch from 'node-watch';

import { read } from 'excel-data';
import { Meteor } from 'meteor/meteor';

import { BrowserStatistics } from '../imports/api/browserStatistics.js';
import { OperatingStatistics } from '../imports/api/operatingStatistics.js';

import { Customers } from '../imports/api/customers.js';
import { Browsers } from '../imports/api/browsers.js';
import { OperatingSystems } from '../imports/api/operatingSystems.js';

Meteor.startup(() => {
	// When a a file in the sheets directory changes, automatically run script to update DB with new information
	let wrappedWatch = Meteor.wrapAsync(watch);
	wrappedWatch('C:/MeteorTest/BrowserStats/sheets', filename => {
		if (filename.match(/BrowserStatistics/i)) {
			let prod = /(\d+)\.xls$/.exec(filename)[1]

			if (BrowserStatistics.find({prod_id: prod})) {
				console.log(`removing prod_id: ${prod}`);
				BrowserStatistics.remove({prod_id: prod})
				Browsers.remove({})
				Customers.remove({})
				OperatingSystems.remove({})
			}

			read(filename).then(Meteor.bindEnvironment(
				(result) => {
					let flag = 0
					if (flag === 1) {
						console.log(result)
						let flag = 1
					}

					let browsers = result.browsersbycustomer.data
					let operatingSystems = result.operatingsystems.data

					browsers.forEach(record => {
						let [browser, browserName, browserVer] = /^(\D*)\s(.*)/.exec(record.browser)
						BrowserStatistics.insert(
							{
								browser_id: record.browser,
								customer_id: record.customer,
								prod_id: prod,
								browser_name: browserName,
								browser_version: browserVer,
								total: record.total,
								"mtd": record["mtd"],
								"ytd": record["ytd"],
								"365days": record["365days"],
								"180days": record["180days"],
								"90days": record["90days"],
								"30days": record["30days"]
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
										"MTD": record["mtd"],
										"YTD": record["ytd"],
										"365Days": record["365days"],
										"180Days": record["180days"],
										"90Days": record["90days"],
										"30Days": record["30days"]
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

//
// Meteor.publish('browserstats', () => {
// 	return BrowserStatistics.find({})
// })

// 		prods: [
// 			{name: 'name', customers: ['custs']}
// 		]

// 		customers: [
// 			{name: 'name', prod: 'prod'},
// 		]

// 		browsers: [
// 			'chrome', 'ff'
// 		]

// 		os: [
// 			'iphone', 'win 7'
// 		]

// v2
// browserstats: [
// 	{
// 		prod: 1,
// 		customer: 'CustomerName',
// 		browsers: [
// 			{name: 'chrome', total:123, mtd: 0, ytd: 23},
// 			{name: 'edge', ...}
// 		],
// 		oss: [
//			{name: 'iPhone', total: 21, mtd: 203},
// 			{}
//	 ]
// 	}
// ]

// browserstats: [
// 	{
// 		prod: 1,
// 		data: [
// 			{
// 				customer: 'Customer 1',
// 				browsers: [
// 					{name: 'chrome', total:123, mtd: 0, ytd: 23},
// 					{name: 'edge', ...}
// 				],
// 				os: [{name: 'iPhone', count: 21}, {}]
// 			},
// 		]
// 	}
// ]
