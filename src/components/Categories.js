import React, { Component } from 'react';
import * as utilities from './../sharedModules/utilities';
import * as indexdb from './../sharedModules/indexedDB';
import Barchart from './Barchart';
import TxnList from './TxnList';

class Categories extends Component {
	constructor(props){
		super(props);
		this.navBack = this.navBack.bind(this);
	};
	addActiveCls(){
  		return ' active';
	};
	addBackBtnCls(){
  		return ' back';
	};
	navBack() {
	  	var data = indexdb.getAllRecords();
	  	setTimeout(()=>{
		    indexdb.idbpromise.then((response)=>{
		      this.props.history.push({
		        pathname:'/YouSpent',
		        state:{
		        	detail:response,
		        	login:this.props.location.state.login
		        }
		      });
		    });
		},100);
	};

	
	render(){
		return (
	 <div className={'app' + this.addActiveCls()}>
    	<div className="app__logout">
          <svg className="app__logout-icon svg-icon" viewBox="0 0 20 20">
            	<path d="M6,3 a8,8 0 1,0 8,0 M10,0 10,12" />
          </svg>
    	</div>
      	<div className="app__top">
        	<div className={'app__menu-btn' + this.addBackBtnCls()} onClick={this.navBack}>
          		<span></span>
        	</div>
        	<svg className="app__icon search svg-icon hide" viewBox="0 0 20 20">
          			<path d="M20,20 15.36,15.36 a9,9 0 0,1 -12.72,-12.72 a 9,9 0 0,1 12.72,12.72" />
        	</svg>
        	<p className="app__hello" id="descr">{this.props.location.state.detail[2]}</p>
        <Barchart detail={this.props.location.state.detail[0]}/>
        
        </div>
        <div className="app__bot">
 			<TxnList sortedData={this.props.location.state.detail[1]} lasttrans = {false}/>
 		</div>
         
 </div>

		);
	}
}
export default Categories;