import React from 'react';
import _ from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class StatsTable extends React.Component {
	constructor(props) {
		super(props)
		// columns from keys
		// {
	  //   "browser": "Blackberry 4",
	  //   "total": "156",
	  //   "mtd": "132",
	  //   "ytd": "242",
	  //   "365days": "5323",
	  //   "180days": "22",
	  //   "90days": "235",
	  //   "30days": "3",
	  //   "_sheet": "browsers",
	  //   "_file": "c:\\meteortest\\browserstats\\sheets\\browserstatistics-234012-prod1.xls"
		// }
		this.renderHeaders = this.renderHeaders.bind(this)
		this.renderRows = this.renderRows.bind(this)
	}
	renderHeaders(columns) {
		_.keys(columns).map((columnName, i) => {
			return (<TableHeaderColumn key={i}>{columnName}</TableHeaderColumn>)
		})
	}

	renderRows(data, columns) {

		data.map(datum => {
			_.keys(columns).map(colName => {
				return (
					<TableRow key={colName}>
						<TableRowColumn>
							{colName}
						</TableRowColumn>
					</TableRow>
				)
			});
		})
	}

	render() {
		let {records} = this.props.data
		console.log(records);

		return (
			<div>
				<h2>{this.props.title}</h2>
					<Table>
					<TableHeader>
						<TableRow>
							{this.renderHeaders(records.header.originalColumns)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{this.renderRows(records.data, records.header.columns)}
					</TableBody>
					</Table>
			</div>
		);
	}
}

export default StatsTable;
