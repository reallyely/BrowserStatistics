import React from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import Griddle from 'griddle-react';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import TransitionGroup from 'react-addons-transition-group';
import TweenMax from 'gsap';
import {RoughEase, Power0} from 'gsap';

import './StatsTable.css';

let styles = {
	filterInput: {
		fontFamily: "FontAwesome, 'Raleway', sans-serif",
		fontSize: "0.75em",
		backgroundColor: "transparent",
		// borderBottom: "#b6d7e3 0.1em solid",
		borderBottom: "none",
		borderTop: "none",
		borderRight: "none",
		borderLeft: "none",
		color: "#b6d7e3",
		margin: "0em",
		padding: "0em",
		paddingLeft: "0.02em",
		width: "100%",
	}
}

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
					showSettings={true}
					bodyHeight={550}
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
		this.state = {
			hovered: false,
			hasValue: false,
			focused: false
		}

		this.handleHover = this.handleHover.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		// this.showFilter = this.showFilter.bind(this)
	}

	handleHover(e) {
		this.setState({hovered: !this.state.hovered})
	}

	handleChange(e) {
		this.setState({hasValue: e.target.value ? true : false})
	}
	handleFocus(e) {
		this.setState({focused: !this.state.focused})
	}

  render(){
    return (
			<span style={{float:"left", width:"90%"}}
				onMouseEnter={this.handleHover}
				onMouseLeave={this.handleHover}
			>
		    <span style={{
						overflow:"hidden",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "flex-start",
						alignContent: "flex-start",
						alignSelf: "flex-start",
						width: "100%",
						transition: "transform 1000ms ease-in-out",
						transform: "translate(0%)"
					}}
					ref={(spanWrapper) => this.spanWrapper = spanWrapper}
				>
					<div style={{alignSelf: "flex-start"}}>{this.props.displayName}</div>
					<TransitionGroup>
						{this.state.hovered || this.state.hasValue || this.state.focused
							? <FilterInput
								handleChange={this.handleChange}
								handleFocus={this.handleFocus}
								handleBlur={this.handleFocus}
								columnName={this.props.columnName}
								filterByColumn={this.props.filterByColumn}
								id={this.props.columnName}/>
							: ''}
					</TransitionGroup>
		    </span>
			</span>
    );
  }
}

class FilterInput extends React.Component {
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
		this.props.handleChange(e)
	}

	componentWillEnter (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 0.35,
			{opacity: 0, height: 0},
			{opacity: 100, height: 25,
				ease: Sine.easeOut,
				onComplete: callback}
		);
	}

	componentWillLeave (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 0.35,
			{height: 25, opacity: 100},
			{height: 0, opacity:0,
				delay: 1,
				ease: Sine.easeOut,
			 	onComplete: callback
			}
		);
	}

	render() {
		return (
			<div
				key={'uniq'}
				style={{position:'relative'}}
			>
				<input
					onFocus={this.props.handleFocus}
					onBlur={this.props.handleBlur}
					id={this.props.id}
					style={styles.filterInput}
					type='text'
					onChange={this.filterText}
					onClick={this.textOnClick}
					placeholder="&#xf002;"
				/>
			</div>
		)

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
						 <SparklinesLine color="#413D45"
						 	style={{
								strokeWidth: 1, strokeOpacity: ".75", fill: "#7cc5df", fillOpacity: ".6",
								backgroundBlendMode: "multiply"}} />
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
