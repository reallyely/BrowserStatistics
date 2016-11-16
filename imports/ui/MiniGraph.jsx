import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';

export default class MiniGraph extends React.Component {
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
						 <SparklinesLine color="#5b5258"
						 	style={{
								strokeWidth: 1, strokeOpacity: ".75", fill: "#95DBE5", fillOpacity: "1",
								backgroundBlendMode: "multiply"}} />
						 <SparklinesSpots size={4} style={{ stroke: "#5b5258", strokeWidth: 1, fill: "transparent" }} />
					</Sparklines>
				</div>
			)
		} else {
			return <div> No Data </div>
		}

	}
}
