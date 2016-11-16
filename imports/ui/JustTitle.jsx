import React from 'react';
import TweenMax from 'gsap';
import { findDOMNode } from 'react-dom';

export default class JustTitle extends React.Component {
	constructor (props) {
		super(props)
	}

	componentWillEnter (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 10,
			{
				opacity: 0,
			},
			{
				opacity: 100,
				onComplete: callback}
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
			<div style={{alignSelf: "flex-start"}}>{this.props.title}</div>
		)
	}
}
