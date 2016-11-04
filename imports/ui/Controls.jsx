import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

const styles = {
	default: {
		margin: '8px'
	},
	isActive: {
		backgroundColor: 'red'
	}
}

export default class FilterControls extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFilters: []
		}
		this.renderFilters = this.renderFilters.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(value) {
		var foundIndex = _.indexOf(this.state.activeFilters, value)
		console.log(foundIndex);
		if (foundIndex >= 0) {
			var newValue = _.without(this.state.activeFilters, value)
		} else {
			var newValue = _.concat(this.state.activeFilters, value)
		}

		this.setState({
			activeFilters: newValue
		})
	}

	renderFilters() {
		console.log(this.state.activeFilters);
		// console.log(this.props.filterCategories);
		return (
			this.props.filterCategories.map(
				(category, i) => {return (
					<div key={i}>{category}
					{
						this.props.filterValues[category].map( (value, i) =>
							<RaisedButton
								key={i}
								label={value}
								onClick={e => this.handleClick(value)}
								style={styles.default || (_.find(this.state.activeFilters, value) && styles.isActive)}
							/>
						)
					}
					</div>
				)}
			)
		)
	}

	render() {
		return (
			<Card>
				<CardActions>
					<TextField hintText="Type to filter" fullWidth={true}/>
					<br />
					{this.renderFilters()}
				</CardActions>
				<CardText>
				</CardText>
			</Card>
		);
	}
}

FilterControls.propTypes = {
	filterCategories: React.PropTypes.array,
	filterValues: React.PropTypes.object
}
