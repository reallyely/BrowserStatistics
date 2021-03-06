import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserStatistics } from '../../api/browserStatistics.js';
import { Browsers } from '../../api/browsers.js';
import { Customers } from '../../api/customers.js';
import { OperatingSystems } from '../../api/operatingSystems.js';
import StatsChart from '../StatsChart.jsx';
import StatsTable from '../StatsTable.jsx';

import _ from 'lodash';

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
						/>
				</div>
			)
		} else {
			return null
		}
	}
}

export default createContainer(({filters}) => {
	console.log(filters);
	let subscription = Meteor.subscribe('browserstatistics');
	let loading = !subscription.ready()

	let filter = {}
	if (filters.browsers.length > 0) filter.browser_name = {$in: filters.browsers}
	else if (filters.customers.length > 0) filter.customer_id = {$in: filters.customers}
	else if (filters.prod.length > 0) filter.prod_id = {$in: filters.prod}
	else filter = {}

  return {
		BrowserStatistics: BrowserStatistics.find(filter, {sort: ["prod_id", "customer_id"], limit: 150}).fetch(),
		loading,
  };
}, Stats);
