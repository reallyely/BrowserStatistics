import React, { Component, PropTypes } from 'react';
import StatsTable from './StatsTable';
import _ from 'lodash';
// Task component - represents a single todo item
export default class Statistics extends Component {
	constructor(props) {
		super(props)

		this.renderStats = this.renderStats.bind(this)
	}

	renderStats(categories) {
		if (Array.isArray(categories)) {
			return categories.map( (category, i) => {
				return (<StatsTable key={i} data={category}></StatsTable>)
			})
		}
	}

  render() {
		console.log('from stats', this.props.data.categories);
		let categories = this.props.data.categories
    return (
			<div style={{width: "960px"}}>
				<h2>{this.props.title}</h2>
				{this.renderStats(categories)}
      </div>
    );
  }
}
