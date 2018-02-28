import React, { Component } from 'react';

class Input extends Component {

  render(){
    return (
    	 <input type={this.props.type} className={'login__input '+this.props.class} placeholder={this.props.placeholder}/>
    )
  }

}

export default Input;