import React, { Component, PropTypes } from 'react';
import StatsTable from './StatsTable';
import _ from 'lodash';
// Task component - represents a single todo item

export default class StatsChart extends Component {
	constructor(props) {
		super(props)

	}

  render() {
		// console.log('from stats', this.props.data.categories);
    return (
			<div style={{width: "960px"}}>
				<h2>Prod: {this.props.title}</h2>
				<div>
					{
						this.props.keys.map(col => {
							return (
								_.sumBy(this.props.data, datum => {
									if (datum.browser_name === 'Chrome') {
										return datum.total
									}
								})
							)
						})
					}
				</div>
				<div>shart</div>
      </div>
    );
  }
}
