import React, { Component } from 'react';
import * as utilities from './../sharedModules/utilities';
import * as c3 from 'c3';
import '../styles/partials/Barchart.css';
import * as indexdb from './../sharedModules/indexedDB';
const _ = require("lodash");

class Barchart extends Component {
	Constructor(){

	};
	
	componentDidMount() {
	this._updateChart();
	}
	componentDidUpdate() {
	this._updateChart();
	}
	_updateChart() {
		//var data = this.props.detail[0];
		//var sortedData = _.map(_.sortBy(this.props.detail[1].siva.state, ['date'], ['desc']), _.values);

let dataLoad = this.props.detail;
 console.log("Bar Data ==> "+dataLoad);

	const chart = c3.generate({
	  bindto: '#BarChart',
	  data: {
	    columns: dataLoad,
	    type: "spline",
	  },
	  grid:{
	  	y:{
	  		show:true
	  	}
	  },
	  axis:{
	  	x:{
	  		type: 'category',
	  		categories:dataLoad[0]
	  	}
	  },
	  legend:{
	  		hide:true
	  }	  
	});
	}	
	render(){
		console.log(c3);
		return (
			<div id="BarChart">Here Bar Chart!</div>
		);
	}
}
export default Barchart;