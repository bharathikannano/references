import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import './styles/App.css';
import Loader from './components/Loader';
import Login from './components/Login';
import Balance from './components/Balance';
import Barchart from './components/Barchart';
import YouSpent from './components/YouSpent';
import Categories from './components/Categories';
import registerServiceWorker from './registerServiceWorker';

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

ReactDOM.render((
	<div>
    <Router>
  		<AnimatedSwitch atEnter={bounceTransition.atEnter} atLeave={bounceTransition.atLeave} atActive={bounceTransition.atActive} mapStyles={mapStyles} className="switch-wrapper">
  		 	<Route exact path="/" component={Login}/>
        	<Route path="/Balance" component={Balance}/>
		  	   <Route path="/YouSpent" component={YouSpent}/>
           <Route path="/Categories" component={Categories}/>

        	</AnimatedSwitch>
  	</Router>
    <Loader enable="false"/>
  </div>
), document.getElementById('cont'));
registerServiceWorker();
