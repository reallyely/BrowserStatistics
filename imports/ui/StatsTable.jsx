import React from 'react';
import _ from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class StatsTable extends React.Component {
	constructor(props) {
		super(props)

		// this.renderHeaders = this.renderHeaders.bind(this)
		// this.renderRows = this.renderRows.bind(this)
	}
	// renderHeaders(columns) {
	// 	_.keys(columns).map((columnName, i) => {
	// 		return (<TableHeaderColumn key={i}>{columnName}</TableHeaderColumn>)
	// 	})
	// }
	//
	// renderRows(data, columns) {
	// 	data.map(datum => {
	// 		_.keys(columns).map(colName => {
	// 			return (
	// 				<TableRow key={colName}>
	// 					<TableRowColumn>
	// 						{colName}
	// 					</TableRowColumn>
	// 				</TableRow>
	// 			)
	// 		});
	// 	})
	// }

	render() {
		console.log('from stats table', this.props.data);
		// console.log(records);

		return (
			<div>
				<h2>{this.props.title}</h2>
					<Table>
					<TableHeader>
						<TableRow>
							{
								this.props.columns.map(column => (
									<TableHeaderColumn>{column}</TableHeaderColumn>
								))
							}
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							this.props.data.map((datum, i) => {
								return (
									datum.browsers.map((browserDat, i) => (
										<TableRow key={i}>
										{
											this.props.keys.map(key => (
												<TableRowColumn key={key}>{browserDat[key] || null}</TableRowColumn>
											))
										}
										</TableRow>
									))
								)
							})
						}
					</TableBody>
					</Table>
			</div>
		);
	}
}

export default StatsTable;
