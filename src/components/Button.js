import React, { Component } from 'react';

class Button extends Component {

  render(){
    return (
    	<button type="button" className={'login__submit '+this.props.class} id={this.props.id} onClick={this.props.onClick}>{this.props.value}<span>{this.props.data}</span></button>
    )
  }

}

export default Button;