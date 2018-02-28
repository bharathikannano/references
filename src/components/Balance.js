import React, { Component } from 'react';
// import Button from './Button';
import TxnList from './TxnList';
import ProgressChart from './ProgressChart';
import YouSpent from './YouSpent';
import userPicture from './../images/user_profile.png';
import * as indexdb from './../sharedModules/indexedDB';
import * as utilities from './../sharedModules/utilities';
import * as d3 from "d3";
const _ = require("lodash");
class Balance extends Component {
  constructor(props) {
    super(props);
	this.YouSpent = this.YouSpent.bind(this);
    this.navBack = this.navBack.bind(this);
    this.hideForLogin = this.hideForLogin.bind(this);
    this.showForLogin = this.showForLogin.bind(this);
    this.hideinlinebalance = this.hideinlinebalance.bind(this);
  };
addActiveCls(){
  return ' active';
};
addBackBtnCls(){
  return ' back';
};
hideForLogin(){
  if(this.props.location.state.login){
    return 'hide';
  }else {
    return '';
  }
};
showForLogin(){
  if(!this.props.location.state.login){
    return 'hide';
  }else {
    return '';
  }
};
hideinlinebalance(){
  if(this.props.location.state.login){
    return 'nobal';
  }
  else{
    return '';
  }
}
navBack(){
  this.props.history.push('/');
};
YouSpent(){

  var data = indexdb.getAllRecords();
  setTimeout(()=>{
    indexdb.idbpromise.then((response)=>{
      this.props.history.push({
        pathname:'/YouSpent',
        state:{detail:response,login:this.props.location.state.login}
      });
    });
  },100);
};
openMenu(evt){
  let appContainer = evt.currentTarget.parentNode.parentNode.classList;
  if(appContainer.contains("menu__open")){
    appContainer.remove("menu__open");
  }else{
    appContainer.add("menu__open");
  }
}


  render(){
    var data = this.props.location.state.detail.siva;
    var sortedData = _.map(_.sortBy(this.props.location.state.detail.siva.state, ['date'], ['desc']), _.values);

    return (
    <div>
    <aside className="menu__container">
    <ul>
      <li><a className="see" href="javascript:;">See</a>
        <ul>
          <li><a href="javascript:;">My Accounts</a></li>
          <li><a href="javascript:;">WealthPro</a></li>
        </ul>
      </li>
      <li><a className="move" href="javascript:;">Move</a>
        <ul>
          <li><a href="javascript:;">To My Accounts</a></li>
          <li><a href="javascript:;">To Other Accounts</a></li>
          <li><a href="javascript:;">Bill Payment</a></li>
          <li><a href="javascript:;">To My Cards</a></li>
          <li><a href="javascript:;">To Octopus OI ePay Account</a></li>
          <li><a href="javascript:;">Transfer History</a></li>
        </ul>
        <li><a className="offline" href="javascript:;">Offline Login</a>
          <ul>
            <li><a href="javascript:;">Enable</a></li>
            <li><a href="javascript:;">Disable</a></li>
          </ul>
        </li>        
        <li><a className="mail" href="javascript:;">Mail box</a></li>
        <li><a className="locate" href="javascript:;">Locate</a></li>
      </li>      
    </ul>
    <div className="app__logout" onClick={this.navBack}>
          <svg className="app__logout-icon svg-icon" viewBox="0 0 20 20">
            <path d="M6,3 a8,8 0 1,0 8,0 M10,0 10,12" />
          </svg>
    </div>    
    </aside>
    <div className={'app' + this.addActiveCls()}>
      <div className="app__top">
        <div className="app__menu-btn" onClick={this.openMenu}>
          <span></span>
        </div>
        <svg className="app__icon search svg-icon hide" viewBox="0 0 20 20">

          <path d="M20,20 15.36,15.36 a9,9 0 0,1 -12.72,-12.72 a 9,9 0 0,1 12.72,12.72" />
        </svg>
        <p className="app__hello" id="descr">{'Welcome '+data.name}</p>
        <div className={'container '+this.hideinlinebalance()}>
        <ProgressChart databal={utilities.denom(data.avaBal)} completeData={data} isLogin={this.props.location.state.login}/>
        <p className={'balance__txt ' + this.showForLogin()}>Your Account Balance<span>{utilities.denom(data.avaBal)}</span></p>
          </div>
          <p className={'noteMsg ' + this.hideForLogin()}>Note: Synced last 30 days transaction. <a href="javascript:;" onClick={this.navBack}>Login as online </a> to see the current balance.</p>
        </div>

        <div className="app__bot">
         <TxnList sortedData={sortedData} lasttrans = {true}/>
        <button type="button" className="login__submit tracker__btn" id="tracker_btn" onClick={this.YouSpent}>Track Your Expenses</button>
        </div>
      </div>
      </div>
    )
  }

}

export default Balance;
