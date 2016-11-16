import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import BSButton from './BSButton';
import _ from 'lodash';

export default class FilterControls extends React.Component {
	constructor(props) {
		super(props);

		this.renderFilters = this.renderFilters.bind(this);
	}

	renderFilters() {
		// console.log(this.props.filters);
		return (
			_.keys(this.props.filters).map(
				(category, i) => (
					<div
						key={i}
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<h3 style={{marginBottom: '0.3em',}}>{_.capitalize(category)}</h3>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								flexWrap: 'wrap',
							}}
						>

							{
								this.props.filters[category].map( (value, i) =>
									<BSButton
										key={i}
										label={value}
										onClick={e => this.props.onFilter(category, value)}
										pressed={
											_.indexOf(this.props.activeFilters[category], value) >= 0
										}
									/>
								)
							}
						</div>
					</div>
				)
			)
		)
	}

	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
					{this.renderFilters()}
			</div>
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
