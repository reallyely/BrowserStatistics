import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MicroBarChart from 'react-micro-bar-chart';
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
							]
						}
							columns={['Prod', 'Customer', 'Browser', 'Version', 'Total', '180 Days']}
							keys={['prod_id', 'customer_id', 'browser_name','browser_version', 'total', '180days']}
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
		console.log(this.props);
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
		console.log(data);
		return (
			<div>
				<MicroBarChart
					tooltip
					data={data}
					fillColor="rgb(71, 71, 209)"
					fillColor="rgb(71, 155, 209)"
					tipTemplate={(d, i, data) => `${keys[i]}: ${d}`}
					/>
			</div>
		)
	}
}
