import React from 'react';
import FilterInput from './FilterInput';
import JustTitle from './JustTitle';
import TransitionGroup from 'react-addons-transition-group';


export default class HeaderFilter extends React.Component {
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
			<span style={{float:"left", width:"90%", margin: "0px", padding: "0px"}}
				onMouseEnter={this.handleHover}
				onMouseLeave={this.handleHover}
			>
		    <span style={{
						overflow:"hidden",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "flex-start",
						alignContent: "flex-start",
						alignSelf: "flex-start",
						width: "100%",
						margin: "0px",
						padding: "0px"
					}}
				>

					<TransitionGroup className="test" style={{margin:"0px", padding: "0px"}}>
						{this.state.hovered || this.state.hasValue || this.state.focused
							? <FilterInput
									handleChange={this.handleChange}
									handleFocus={this.handleFocus}
									handleBlur={this.handleFocus}
									columnName={this.props.columnName}
									filterByColumn={this.props.filterByColumn}
									id={this.props.columnName}
									displayName={this.props.displayName}
								/>
							: <JustTitle title={this.props.displayName} />}
					</TransitionGroup>
		    </span>
			</span>
    );
  }
}
