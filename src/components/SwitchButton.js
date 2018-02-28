import React, { Component } from 'react';
import '../styles/partials/SwitchButton.css';
class SwitchButton extends Component {
	constructor(props){
		super(props);
		this.updateLabel = this.updateLabel.bind(this);
		this.state = {connection:"Online"}
	}
	updateLabel(evt){
		let sliderElement = evt.target.parentElement.getElementsByClassName("slider")[0];
		if(evt.target.checked){
			this.setState({connection:"Offline"});
			//sliderElement.setAttribute("data-value","Offline");
		}else{
			//sliderElement.setAttribute("data-value","Online");
			this.setState({connection:"Online"});
		}

	}
	
	
	render(){
		return (
		  <label className="switch" onClick={this.props.handler}>
		          <input type="checkbox" onChange={this.updateLabel}/>
		          <span className="slider round">
		          	<span className="labelTxt">{this.state.connection}</span>
		          </span>
		  </label>
		)
	}
}

export default SwitchButton;