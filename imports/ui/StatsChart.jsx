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
		console.log(this.props.data);
    return (
			<div style={{width: "960px"}}>
				<h2>Prod: {this.props.title}</h2>
				<div> shart</div>
				{JSON.stringify(this.props.data, 2)}
      </div>
    );
  }
}
