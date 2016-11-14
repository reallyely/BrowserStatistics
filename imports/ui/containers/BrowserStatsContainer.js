import React from 'react';
import Sparkline from 'react-sparkline';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserStatistics } from '../../api/browserStatistics.js';
import { Browsers } from '../../api/browsers.js';
import { Customers } from '../../api/customers.js';
import { OperatingSystems } from '../../api/operatingSystems.js';
import StatsChart from '../StatsChart.jsx';
import StatsTable from '../StatsTable.jsx';

import _ from 'lodash';

// const BrowserStatsContainer = createContainer((params) => {
// 	console.log('thisodfihasodifhoih');
// 	console.log(params);
// 	const subscription = Meteor.subscribe('browserstatistics');
// 	let loading = !subscription.ready();
// 	let browserstats = BrowserStatistics.find({}, {sort: ["prod_id", "customer_id"]}).fetch()
//   return {
// 		BrowserStatistics: browserstats,
// 		loading
// 		// Browsers: Browsers.find({}).fetch(),
// 		// Customers: Customers.find({}).fetch(),
// 		// OperatingSystems: OperatingSystems.find({}).fetch(),
// 		// Prods: Customers.find({}, {fields: {prod: 1, _id: 0}, reactive:false}).fetch()
//   };
// }, App);

class Stats extends React.Component {
	render() {
		if (!this.props.loading) {
			return (
				<div>
					<StatsChart title="Stats Chart" data={this.props.BrowserStatistics}
						columns={['Total']}
						keys={['total']}
					/>
					<StatsTable
						title="Stats Table"
						data={this.props.BrowserStatistics}
						columnMeta={[
							{
								"columnName": "prod_id",
								"customHeaderComponent": HeaderComponent,
								"displayName": 'Prod'
							},
							{
								"columnName": "browser_name",
								"customHeaderComponent": HeaderComponent,
								"displayName": 'Browser Name'
							},
							{
								"columnName": "customer_id",
								"customHeaderComponent": HeaderComponent,
								"displayName": 'Customer'
							},
							{
								"columnName": "browser_version",
								"customHeaderComponent": HeaderComponent,
								"displayName": 'Browser Version'
							},
							{
								"columnName": "180days",
								"customComponent": MiniGraph,
								"displayName": "Over Time"
							},
						]}
						columns={['Prod', 'Customer', 'Browser', 'Version', 'Total', '180 Days']}
						keys={['prod_id', 'customer_id', 'browser_name','browser_version', 'total', '180days']}
					/>
				</div>
			)
		} else {
			return null
		}
	}
}

export default createContainer(({filters}) => {
	let subscription = Meteor.subscribe('browserstatistics');
	let loading = !subscription.ready()

	let filter = {}
	if (filters.browsers.length > 0) {
		filter = {browser_name: {$in: filters.browsers}}
	} else {
		filter = {}
	}

  return {
		BrowserStatistics: BrowserStatistics.find(filter, {sort: ["prod_id", "customer_id"]}).fetch(),
		loading,
  };
}, Stats);


class HeaderComponent extends React.Component {
	constructor(props) {
		super(props)
		this.textOnClick = this.textOnClick.bind(this)
		this.filterText = this.filterText.bind(this)
	}
  textOnClick(e) {
    e.stopPropagation();
  }

  filterText(e) {
    this.props.filterByColumn(e.target.value, this.props.columnName)
  }

  render(){
		// console.log(this.props);
    return (
      <span>
        <div><strong>{this.props.displayName}</strong></div>
        <input type='text' onChange={this.filterText} onClick={this.textOnClick} />
      </span>
    );
  }
}

class MiniGraph extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		keys = ['180days', '90days', '30days']
		data = keys.map(key => {
			return this.props.rowData[key]
		})
		// console.log(data);
		return (
			<div>
				<Sparkline
					tooltip
					data={data}
					strokeColor="rgb(71, 71, 209)"
					strokeWidth="5px"
					/>
			</div>
		)
	}
}
