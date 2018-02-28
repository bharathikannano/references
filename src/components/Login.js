import React, { Component } from 'react';
import Button from './Button';
import SwitchButton from './SwitchButton';
import Input from './Input';
import logo from './../images/icons/trustmark.png';
import InfoIcon from './../images/icons/info-icon.png';
import CloseBtn from './../images/icons/close-icon.png';
import {withRouter} from 'react-router-dom';
import * as indexdb from './../sharedModules/indexedDB';
import * as utilities from './../sharedModules/utilities';
var fields = [];
class Login extends Component {
  constructor(props) {
    super(props);
    this.goToBalance = this.goToBalance.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.getSwitchMode = this.getSwitchMode.bind(this);
  };	
  getSwitchMode(evt){
    if(evt.target.textContent != "" && evt.target.textContent == "Online"){
      document.getElementsByClassName("onlineLogin")[0].classList.add("hide");
      document.getElementsByClassName("offlineLogin")[0].classList.remove("hide");   
    }else if(evt.target.textContent != "" && evt.target.textContent == "Offline"){
      document.getElementsByClassName("onlineLogin")[0].classList.remove("hide");
      document.getElementsByClassName("offlineLogin")[0].classList.add("hide");         
    }
  }
handleSignIn(){
       utilities.toggleLoader("show");
       if (window.Worker) { // Check if Browser supports the Worker api.
           // Requires script name as input
           var myWorker = new Worker("/worker.js");
           myWorker.postMessage([1, 2]);
       }
       let runWorker = new Promise((resolve, reject) => {
       		myWorker.onmessage = function(e){
       			resolve(e);
       		}
       });
       runWorker.then((response)=>{
        indexdb.deleteValues();
        indexdb.insertDB(response.data);
        utilities.toggleLoader("hide");
           this.props.history.push({
           	pathname:'/Balance',
           	state:{detail:response.data,login:true}
           });       	
       });
};
goToBalance(){
  var data = indexdb.getAllRecords();
  console.log(indexdb);
  setTimeout(()=>{
    indexdb.idbpromise.then((response)=>{
      if(response != undefined){
        this.props.history.push({
          pathname:'/Balance',
          state:{detail:response}
        });
      }else{
        alert("Please login with online connectivity");
      }
    });    
  },100);
  }
  toggleToolTip(evt){
    if(evt.target.parentNode.className == "closeBtn"){
      evt.target.parentNode.parentNode.classList.add("hide");
    }else{
      evt.target.parentNode.getElementsByClassName("toolTip")[0].classList.remove("hide");  
    }
  }
  render(){
    var fields = [];
    indexdb.openDb(fields);
    return (
          <div className="login">      
            <img src={logo} className="trustmark"/>
            <div className="login__form">
              <div className="onlineLogin">
                <div className="login__row">
                  <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
                    <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                  </svg>
                  <Input type="text" className="name" placeholder="Username" />
                </div>
                <div className="login__row">
                  <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
                    <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                  </svg>
                  <Input type="password" className="pass" placeholder="Password" />
                </div>
                <Button id="signin" value="Login" onClick={this.handleSignIn}/>
              </div>
              <div className="offlineLogin hide">
                <h2>Enter your offline PIN</h2>
                <div className="inputGroup">
                <input type="password" id="pin1" maxLength="1" pattern="[0-9]*" inputMode="numeric"/>
                <input type="password" id="pin2" maxLength="1" pattern="[0-9]*" inputMode="numeric"/>
                <input type="password" id="pin3" maxLength="1" pattern="[0-9]*" inputMode="numeric"/>
                <input type="password" id="pin4" maxLength="1" pattern="[0-9]*" inputMode="numeric"/>
                </div>
                <Button id="offlinesignin" value="Login" onClick={this.goToBalance}/>
              </div>
              <p className="login__signup hide"><a>Register with 2FA</a></p>
          </div>
          <p className="toggleContainer">
              Your connecting mode
              <img src={InfoIcon} className="infoIcon" alt="" onClick={this.toggleToolTip}/>
              <SwitchButton handler={this.getSwitchMode}/>
              <span className="toolTip hide"><span className="closeBtn" onClick={this.toggleToolTip}><img src={CloseBtn} alt="Close"/></span>Note: While offline login, you would see the information which has been synced from you last login.<br/><br/>Set your offline PIN once you logged in successfully.</span>
          </p>
        </div>    	
    )
  }

}

export default withRouter(Login);