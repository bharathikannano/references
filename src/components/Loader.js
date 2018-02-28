import React, { Component } from 'react';
import '../styles/partials/Loader.css';
class Loader extends Component {
	constructor(props){
		super(props);
		this.setClass.bind(this);
	};
	setClass(){
		if(this.props.enable === 'false'){
			return 'hide';
		}else{
			return 'show';
		}
	};
	render(){
		return (
		<div id="loader-container" className={'loader-container '+ this.setClass()}>
		<div className="cube-wrapper">
		  <div className="cube-folding">
		    <span className="leaf1"></span>
		    <span className="leaf2"></span>
		    <span className="leaf3"></span>
		    <span className="leaf4"></span>
		  </div>
		  <span className="loading" data-name="Loading">Loading</span>
		</div>			
		</div>
			)
	}
}
export default Loader;