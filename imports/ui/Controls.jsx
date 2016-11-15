import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

const styles = {
	default: {
		margin: '8px'
	}
}
const activeColor = '#2196F3'
export default class FilterControls extends React.Component {
	constructor(props) {
		super(props);

		this.renderFilters = this.renderFilters.bind(this);
	}

	renderFilters() {
		console.log(this.props.filters);
		return (
			_.keys(this.props.filters).map(
				(category, i) => (
					<div key={i}>{category}
						{
							this.props.filters[category].map( (value, i) =>
								<RaisedButton
									key={i}
									label={value}
									onClick={e => this.props.onFilter(category, value)}
									backgroundColor={
										_.indexOf(this.props.activeFilters[category], value) >= 0 && activeColor
									}
								/>
							)
						}
					</div>
				)
			)
		)
	}

	render() {
		return (
			<Card
				style={{backgroundColor:''}}>
				<CardActions>
					{this.renderFilters()}
				</CardActions>
				<CardText>
				</CardText>
			</Card>
		);
	}
}

FilterControls.propTypes = {
	filters: React.PropTypes.object,
	activeFilters: React.PropTypes.object,
}

// activeFilters = {
// 	browserName: ['Android', 'BlackBerry'],
// 	customerName: ['asodfihas', 'asdfh']
// }
