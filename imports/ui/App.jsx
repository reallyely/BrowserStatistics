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

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeFilters: {browsers: [], customers: []}
		}
		this.handleClick = this.handleClick.bind(this);
	}

	getUniqueList(arrayOfObjs, field) {
		return _.uniq(_.map(arrayOfObjs, field))
	}

	handleClick(category, value) {
		Meteor.call('browserstatistics.update.filters',
			category, value, this.state.activeFilters,
			(err, val) => this.setState({ activeFilters: val }))

	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.loading) {
			Meteor.call('browserstatistics.get.filters',
				nextProps.BrowserStatistics,
				(err, filters) => this.setState({filters}) || console.log(err)
			)
		}
	}

  render() {
		if (! this.props.loading) {
			return (
				<div className="container">
					<h1>Browser Stats:</h1>
						<FilterControls
							filters={this.state.filters}
							activeFilters={this.state.activeFilters}
							onFilter={this.handleClick}
						/>
						<StatsChart title="Stats Chart" data={this.props.BrowserStatistics} />
						<StatsTable
							title="Stats Table"
							data={this.props.BrowserStatistics}
							columns={['Prod', 'Customer', 'Browser', 'Total','30 Day', '90 Day', '180 Day']}
							keys={['prod_id', 'customer_id', 'browser_name', 'total','30days', '90days', '180days']}
						/>
				</div>
			);
		} else {
			return null;
		}
  }
}

export default createContainer(() => {
	let subscription = Meteor.subscribe('browserstatistics');
	let loading = !subscription.ready()
  return {
		BrowserStatistics: BrowserStatistics.find({}, {sort: ["prod_id", "customer_id"]}).fetch(),
		loading,
  };
}, App);
