
import React from 'react';
import * as Ion from '@ionic/react';
import { Chart } from 'chart.js';

function transpose(array) {
  // transpose
  let transposed = Object.assign(...Object.keys(array[0]).map( key =>
    ({ [key]: array.map( o => o[key] ) })
  ));
  return transposed;
}

const colors = [
	'#36A2EB',
	'rgba(255, 206, 86, 1)',
	'#555E67'
];

export default class Predictions extends React.Component {

	state = {
		maxClasses: null
	}

	getMaxClasses() {
		const sorted = this.props.predictions.sort((a,b) => {
			return b.probability - a.probability
		});
		const bestCandidates = [];
		const first = sorted[0];
		first.color = colors[0]
		bestCandidates.push(first);
		const second = sorted[1];
		second.color = colors[1]
		bestCandidates.push(second);
		const other = {
			label: 'Other', 
			probability: 100 - sorted[0].probability - sorted[1].probability,
			color: colors[2]
		};
		other.probability = Math.round(other.probability*10)/10
		bestCandidates.push(other)
		return bestCandidates;
	}



	componentDidMount() {
		const maxClasses = this.getMaxClasses();
		this.setState({maxClasses});
		const data = transpose(this.getMaxClasses());
		const ctx = document.getElementById('chart').getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'doughnut',
		    data: {
		        labels: data.label,
		        datasets: [{
		            data: data.probability,
		            backgroundColor: colors
		        }]
		    },
		    options: {
		    	legend: {
		    		display: false
		    	},
			    scales: {
			        xAxes: [{
			        	display: false
			        }],
		            yAxes: [{
		                display: false
		            }]
			    }
		    }
		});

	}

	renderList() {
		return this.state.maxClasses && this.state.maxClasses.map(el => (
			<Ion.IonItem key={el.label}>
				<span style={{color: el.color, width: 70}}><b>{el.probability } %</b></span>
				<Ion.IonLabel>{el.label}</Ion.IonLabel>
			</Ion.IonItem>
		));
	}

	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<Ion.IonList>
					{this.renderList()}
				</Ion.IonList>
				<canvas id="chart"></canvas>
			</div>
		);
	}
}