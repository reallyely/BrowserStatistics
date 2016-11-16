import React from 'react';
import TweenMax from 'gsap';
import { findDOMNode } from 'react-dom';

import './App.css';

let styles = {
	filterInput: {
		fontFamily: "FontAwesome, Raleway, sans-serif",
		fontSize: "1em",
		backgroundColor: "#D6C0BA",
		borderBottom: "none",
		borderTop: "none",
		borderRight: "none",
		borderLeft: "none",
		color: "#5b5258",
		padding: "0.0em",
		margin: "0em",
		width: "100%"
	}
}

export default class FilterInput extends React.Component {
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
		TweenMax.fromTo(el, 10,
			{
				opacity: 0,
			},
			{
				opacity: 100,
				onComplete: callback
			}
		);
	}

	componentWillLeave (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 10,
			{
				opacity: 100
			},
			{
				opacity:0,
				delay: 1,
			 	onComplete: callback
			}
		);
	}

	render() {
		return (
			<div
				key={'uniq'}
				style={{position:'relative', alignSelf: 'flex-start', padding: "0px", margin: "0px"}}
			>
				<input
					id={this.props.id}
					type='text'
					onFocus={this.props.handleFocus}
					onBlur={this.props.handleBlur}
					style={styles.filterInput}
					onChange={this.filterText}
					onClick={this.textOnClick}
					className="placeholderDark"
					placeholder={`\uf002 ${this.props.displayName}`}
				/>
			</div>
		)

	}

}
