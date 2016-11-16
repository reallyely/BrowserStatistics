import React, { Component, PropTypes } from 'react';
import Button from 'react-button';
import _ from 'lodash';

const theme = {
	style: {
		borderColor: '#867982',
		borderRadius: '2px',
		padding: '0.4em',
		margin: '0.2em',
		transition: 'all 0.25s ease-out'

	},
	pressedStyle: {
		background: '#95DBE5',
		fontWeight: 'bold',
		color: '#BEA7A7',
		transition: 'all 0.25s ease-out'
	},
	overPressedStyle: {
		background: '#C1EAF0',
		transition: 'all 0.25s ease-out',
	},
	overStyle: {
		background: '#5B5258',
		color: '#BEA7A7',
		transition: 'all 0.25s ease-out',
	}
}

export default class BSButton extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (<Button theme={theme} {...this.props}/>)
	}
}
