import React from 'react';
import _ from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Griddle from 'griddle-react';
import TextField from 'material-ui/TextField';

class StatsTable extends React.Component {
	constructor(props) {
		super(props)

		// this.renderHeaders = this.renderHeaders.bind(this)
		// this.renderRows = this.renderRows.bind(this)
	}

	render() {
		console.log('from stats table', this.props.data);
		return (
			<Griddle
				results={this.props.data}
				columns={this.props.keys}
				showFilter={true}
				showSettings={true}
				bodyHeight={600}
				enableInfiniteScroll={true}
				useFixedHeader={true}
				columnMetadata={this.props.columnMeta}
				/>
		);
	}
}

export default StatsTable;

// <div>
	// <h2>{this.props.title}</h2>
		// <Table>
		// <TableHeader>
			// <TableRow>
				// {
					// this.props.columns.map(column => (
						// <TableHeaderColumn key={column}>{column}</TableHeaderColumn>
					// ))
				// }
			// </TableRow>
		// </TableHeader>
		// <TableBody>
			// {
				// this.props.data.map((datum, i) => {
					// return (
						// <TableRow key={i}>
							// {
								// this.props.keys.map(key => (
									// <TableRowColumn key={`${i}_${key}`}>
										// {datum[key]}
									// </TableRowColumn>
								// ))
							// }
						// </TableRow>
					// )
				// })
			// }
		// </TableBody>
		// </Table>
// </div>
