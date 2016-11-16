import React from 'react';

import Griddle from 'griddle-react';
import Dimensions from 'react-dimensions';

import HeaderFilter from './HeaderFilter';
import MiniGraph from './MiniGraph';


import './StatsTable.css';

export default class StatsTable extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log('from stats table', this.props.data);
		return (
			<Griddle
				useGriddleStyles={false}
				results={this.props.data}
				showSettings={true}
				bodyHeight={500}
				enableInfiniteScroll={true}
				useFixedHeader={true}
				columnMetadata={[
					{
						"columnName": "prod_id",
						"customHeaderComponent": HeaderFilter,
						"displayName": 'Prod'
					},
					{
						"columnName": "browser_name",
						"customHeaderComponent": HeaderFilter,
						"displayName": 'Browser Name'
					},
					{
						"columnName": "customer_id",
						"customHeaderComponent": HeaderFilter,
						"displayName": 'Customer'
					},
					{
						"columnName": "browser_version",
						"customHeaderComponent": HeaderFilter,
						"displayName": 'Browser Version'
					},
					{
						"columnName": "total",
						"customHeaderComponent": HeaderFilter,
						"displayName": 'Total'
					},
					{
						"columnName": "180days",
						"customHeaderComponent": HeaderFilter,
						"customComponent": MiniGraph,
						"displayName": "Over Time"
					},
				]}
				columns={['prod_id', 'customer_id', 'browser_name','browser_version', 'total', '180days']}
				sortAscendingComponent={<span className="fa fa-sort-alpha-asc"></span>}
				sortDescendingComponent={<span className="fa fa-sort-alpha-desc"></span>}
			/>
		);
	}
}
