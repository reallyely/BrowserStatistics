import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { BrowserStatistics } from '../api/browserStatistics.js';

import Statistics from './Statistics.jsx';
import './App.css';

// App component - represents the whole app
class App extends Component {
	constructor(props) {
		super(props)

		this.renderStats = this.renderStats.bind(this)
	}
  renderStats() {
    return this.props.BrowserStatistics.map((data) => (
      <Statistics key={data._id} title={data.prod} data={data} />
    ));
  }

  render() {
		console.log(this.props.BrowserStatistics);
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <div>
					{this.renderStats()}
        </div>
      </div>
    );
  }
}


export default createContainer(() => {
  return {
    BrowserStatistics: BrowserStatistics.find({}).fetch(),
  };
}, App);
