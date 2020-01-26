
import React from 'react';
import * as Ion from '@ionic/react';

export default class Predictions extends React.Component {

	getMaxClasses() {
		const sorted = this.props.predictions.sort((a,b) => {
			return a.probability - b.probability
		});
		const bestCandidates = [];
		bestCandidates.push(sorted[0]);
		bestCandidates.push(sorted[1]);
		bestCandidates.push({other: 100-sorted[0].probability - sorted[1].probability})
		return bestCandidates;
	}

	render() {
		return (
			<div>
				<p>{JSON.stringify(this.getMaxClasses())}</p>
			</div>
		);
	}
}