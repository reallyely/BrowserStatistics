import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MicroBarChart from 'react-micro-bar-chart';
import _ from 'lodash';

// API
import { BrowserStatistics } from '../api/browserStatistics.js';
import Stats from './containers/BrowserStatsContainer.js';
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

	// getUniqueList(arrayOfObjs, field) {
	// 	return _.uniq(_.map(arrayOfObjs, field))
	// }

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
			return (
				<div className="container">
					<h1>Browser Stats:</h1>
					<FilterControls
						filters={this.state.filters}
						activeFilters={this.state.activeFilters}
						onFilter={this.handleClick}
					/>
					<Stats filters={this.state.activeFilters}/>
				</div>
			);
  }
}


export default createContainer(({params}) => {
	let subscription = Meteor.subscribe('browserstatistics');
	let loading = !subscription.ready()
	let browserStats = BrowserStatistics.find({}, {sort: ["prod_id", "customer_id"]}).fetch()
  return {
		BrowserStatistics: browserStats,
		loading,
  };
}, App);
