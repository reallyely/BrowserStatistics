import React from 'react';
import _ from 'lodash';
import Griddle from 'griddle-react';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import './StatsTable.css';

class StatsTable extends React.Component {
	constructor(props) {
		super(props)
		// this.renderHeaders = this.renderHeaders.bind(this)
		// this.renderRows = this.renderRows.bind(this)
	}

	render() {
		console.log('from stats table', this.props.data);
		return (
			<div style={{display:"flex",justifyContent:"space-around", alignItems: "center"}}>

				<Griddle
					useGriddleStyles={false}
					results={this.props.data}
					showFilter={true}
					showSettings={true}
					bodyHeight={600}
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
			</div>
		);
	}
}

export default StatsTable;


class HeaderFilter extends React.Component {
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
		let styles = {
			headerText: {
				fontVariant: "small-caps",
				fontStyle: "italic",
				fontWeight: "300",
				fontSize: "1.2em",
				color: "#D6C0BA",
			},
			headerBox: {
				boxShadow: "0px -5px 10px 2px rgba(60, 34, 68, 0.20)",
				borderSpacing: "5px",
				borderRadius: "1px",
				padding: ".5em",
				backgroundColor: "#413D45",
			},
			filterInput: {
				fontFamily: "'Raleway', sans-serif",
				fontSize: "0.5em",
				backgroundColor: "transparent",
				borderBottom: "#b6d7e3 0.1em solid",
				borderTop: "none",
				borderRight: "none",
				borderLeft: "none",
				color: "#b6d7e3",
				margin: "0em",
				padding: "0em",
				width: "100%",
			}
		}
		console.log(this.props);
    return (
      <span>
        <div>{this.props.displayName}</div>
        <input
					style={styles.filterInput}
					type='text'
					onChange={this.filterText}
					onClick={this.textOnClick}
					placeholder={<span class="fa fa-search" />}
				/>
      </span>
    );
  }
}

class MiniGraph extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		keys = ['365days', '180days', '90days', '30days']

		data = keys.map(key => {
			return this.props.rowData[key]
		})
		if (_.some(data, val => _.gt(val, 0))) {
			// console.log(data);
			return (
				<div>
					<Sparklines data={data} height={30} style={{margin: "0px", padding: "0px"}}>
						 <SparklinesLine color="#413D45" style={{strokeWidth: 1, strokeOpacity: ".75", fill: "#b6d7e3", fillOpacity: ".8"}} />
						 <SparklinesSpots size={4} style={{ stroke: "#413D45", strokeWidth: 1, fill: "transparent" }} />
					</Sparklines>
				</div>
			)
		} else {
			return <div> No Data </div>
		}

	}
}

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
