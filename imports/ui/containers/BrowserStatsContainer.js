import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserStatistics } from '../../api/browserStatistics.js';
import { Browsers } from '../../api/browsers.js';
import { Customers } from '../../api/customers.js';
import { OperatingSystems } from '../../api/operatingSystems.js';
import App from '../App';

const BrowserStatsContainer = createContainer((params) => {
	console.log('thisodfihasodifhoih');
	console.log(params);
	const subscription = Meteor.subscribe('browserstatistics');
	let loading = !subscription.ready();
	let browserstats = BrowserStatistics.find({}, {sort: ["prod_id", "customer_id"]}).fetch()
  return {
		BrowserStatistics: browserstats,
		loading
		// Browsers: Browsers.find({}).fetch(),
		// Customers: Customers.find({}).fetch(),
		// OperatingSystems: OperatingSystems.find({}).fetch(),
		// Prods: Customers.find({}, {fields: {prod: 1, _id: 0}, reactive:false}).fetch()
  };
}, App);

export default BrowserStatsContainer
