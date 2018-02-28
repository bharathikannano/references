import React, { Component } from 'react';
import * as utilities from './../sharedModules/utilities';
// import * as d3 from "d3";

const _ = require("lodash");

class TxnList extends Component {

constructor(props){
		super(props);
		 this.state = {currentCount:10};
		  this.countChange = this.countChange.bind(this);
        // this.TitleLastTrans = this.TitleLastTrans.bind(this);

		var cate = {};
     cate.PURCHASEval = [];
     cate.ATMval = [];
     cate.UPIval = [];
     cate.IMPSval = [];
     cate.NACHval = [];
     cate.PAYMENTval = [];
     cate.Otherval = [];
     this.state.categories = cate;
	};

  // TitleLastTrans(val){
  //   if(val != "" && val == "true"){
  //    // document.getElementsByClassName("filter-container")[0].classList.add("hide");
  //   }else {
  //     document.getElementById("tes").classList.add("hide");         
  //   }
  // }


// componentDidMount() {
//   this.TitleLastTrans(lasttrans);
//   };

	countChange(event){
  this.setState({currentCount:event.target.value});
};
  render(){
  	 var sortedData1 = this.props.sortedData;
     var lasttrans = this.props.lasttrans;
     
  	var txnList = sortedData1.map((txn,index)=>{
         if (txn[1].toLowerCase().indexOf("dr") >= 0) {
             if (txn[3].toUpperCase().indexOf("PURCHASE AT") >= 0) {
                 this.state.categories.PURCHASEval.push(txn);

             } else if (txn[3].toUpperCase().indexOf("ATM WITH") >= 0) {
                 this.state.categories.ATMval.push(txn);
             } else if (txn[3].toUpperCase().indexOf("UPI") >= 0) {
                 this.state.categories.UPIval.push(txn);

             } else if (txn[3].toUpperCase().indexOf("IMPS") >= 0) {
                 this.state.categories.IMPSval.push(txn);

             } else if (txn[3].toUpperCase().indexOf("NACH") >= 0) {
                 this.state.categories.NACHval.push(txn);

             } else if (txn[3].toUpperCase().indexOf("PAYMENT GATE") >= 0) {
                 this.state.categories.PAYMENTval.push(txn);

             } else {
                 this.state.categories.Otherval.push(txn);
             }
         }    
         var count = this.state.currentCount;     
      if(index <= count){     
        if (txn[1].indexOf('cr') !== -1) {
          return <div className='app__meeting' key={index}><p className='green-amount'>{utilities.denom(txn[0])}<span className='transType'>{txn[1]}</span></p><p className='app__meeting-info'><span className='date-mini'>{txn[2]}</span><span className='desc_mini'>{txn[3]}</span></p></div>;
        } else {
           return <div className='app__meeting' key={index}><p className='red-amount'>{utilities.denom(txn[0])}<span className='transType'>{txn[1]}</span></p><p className='app__meeting-info'><span className='date-mini'>{txn[2]}</span><span className='desc_mini'>{txn[3]}</span></p></div>;
        }
      }
    });



    return (
    	<div>
    	 <div className="app__days">
            <div className={this.props.lasttrans?'filter-container':'filter-container hide'} id="tes">
              <p>Last<span className="sltbox">
              <select id="filterTxn" onChange={this.countChange}>
                <option value="10" defaultValue>10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              </span>transactions</p>
              <span id="date"></span>
              <div className="date-picker hide">
                <input type="date" name="fromDate" data-placeholder="From" />
                <input type="date" name="toDate"data-placeholder="To" />
              </div>
            </div>
            <div className={this.props.lasttrans?'hide':'app__title__header'}>
              <p className="title-text">
                <span>Transaction details</span>
                <span className="float_right">Amount</span>
              </p>
            </div>
          </div>
            <div id="state" className="app__meetings">{txnList}</div>
        </div>
     )
  }

}

export default TxnList;