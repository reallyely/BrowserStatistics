import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import _ from 'lodash';

// API
import { BrowserStatistics } from '../api/browserStatistics.js';
import { Browsers } from '../api/browsers.js';
import { Customers } from '../api/customers.js';
import { OperatingSystems } from '../api/operatingSystems.js';

import StatsChart from './StatsChart.jsx';
import StatsTable from './StatsTable.jsx';
import FilterControls from './Controls.jsx';
import './App.css';

// App component - represents the whole app
class App extends Component {
	constructor(props) {
		super(props)
	}


  render() {
		console.log(this.props.Prods);
		let prods = _.uniq(_.map(this.props.Prods, 'prod'))
		let browsers = _.uniq(_.map(this.props.Browsers, 'name'))
		let customers = _.uniq(_.map(this.props.Customers, 'name'))

    return (
			<div className="container">
				<h1>Browser Stats:</h1>
				<FilterControls
					filterCategories={['Prod', 'Customers', 'Browsers']}
					filterValues={{
						Prod: prods,
						Customers: customers,
						Browsers: browsers
					}}/>
					<StatsChart title="Stats Chart" data={this.props.BrowserStatistics} />
					<StatsTable
						title="Stats Table"
						data={this.props.BrowserStatistics}
						columns={['Prod', 'Customer', 'Browser', 'Total','30 Day', '90 Day']}
						keys={['prod', 'customer', 'name', 'total','30days', '90days']}
						/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    BrowserStatistics: BrowserStatistics.find({}, {sort: ["prod", "customer"]}).fetch(),
		Browsers: Browsers.find({}).fetch(),
		Customers: Customers.find({}).fetch(),
		OperatingSystems: OperatingSystems.find({}).fetch(),
		Prods: Customers.find({}, {fields: {prod: 1, _id: 0}, reactive:false}).fetch()
  };
}, App);

//
// Customers: BrowserStatistics.find(
// 	{$and: [
// 		{'categories.category': {$eq: "browsersbycustomer"}},
// 		{'categories.data.customer': {$exists: true}}
// 	]},
// 	{fields: {'categories.data.customer': 1}}
// ).map(doc => {
// 	return (
// 		_.flatten(doc.categories.map(cat => {
// 			return _.compact(cat.data.map(dat => {
// 				return dat.customer
// 			}))
// 		}))
// 	)
// })
