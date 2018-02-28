 
import React, { Component } from 'react';
import userPicture from './../images/user_profile.png';
// import * as indexdb from './../sharedModules/indexedDB';
// import * as utilities from './../sharedModules/utilities';
import * as d3 from "d3";

class ProgressChart extends Component {
constructor(props)
{
    super(props);
   this.availBalChart = this.availBalChart.bind(this);
   this.hideElement = this.hideElement.bind(this);
};
hideElement(){
  if(this.props.isLogin){
    return 'hide';
  }else {
    return '';
  }
};

  render(){
    return (
      <div className="progress">
            <span className="align_center" id="dashboard"/>
            <span className="container_progress">
              <span className='align_center app__user' id="rotate_flip" data-bal={'Account Balance '+this.props.databal}>
                <img src={userPicture} alt="" className="app__user-photo" />
              </span>
              <span className={'align_center app__user bal_indicator '+this.hideElement()} id="amountIndicator"/>
              </span>
            </div>
            )
  }



availBalChart(){
  var allRecords = this.props.completeData;
  var drCount = 0, crCount = 0;
  allRecords.state.map((item, index)=> {
     if (item.annot.toLowerCase().indexOf("dr") >= 0) {
        drCount = Number(drCount) + Number(item.amount);
      }else if(item.annot.toLowerCase().indexOf("cr") >= 0){
        crCount = Number(drCount) + Number(item.amount);
      }
  });

      var total = (drCount/crCount)*100;
       var spendCal = {
        chartPercentage: total
       }
       this.drawBalanceChart(spendCal);
        console.log("total======>"+total);

};
drawBalanceChart(){

const chartPercentage = 80;
const chartValue = 1.1242;
const radius = 75;
const border = 7;
const padding = 0;
const width = 400;
const height = 400;
const twoPi = Math.PI * 2;
const boxSize = (radius + padding) * 2;

let svg;

const setArc = d3.arc()
  .startAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border)
  .cornerRadius(50);

// const arcParams = {};

  //$("#amountIndicator").empty();

  svg = d3.select("#amountIndicator").append("svg")
    .attr('width', width)
    .attr('height', height);

  // svg.append("foreignObject")
  //   .attr("width", boxSize)
  //   .attr("height", boxSize)
  //   .append("xhtml:div")
  //   .attr('class', 'radial-wrapper')
  //   .html(`<div class="radial-content"></div>`);

  const field = svg.append('g')
    .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

  const meter = field.append('g')
    .attr('class', 'progress-meter');

  const background = meter
    .append("path")
    .attr('class', 'background')
    .attr('fill', '#2D2E2F')
    .attr('fill-opacity', 0.1)
    .attr("d", setArc({ endAngle: twoPi }));

  const foreground = meter
    .append("path")
    .transition()
    .ease(d3.easeBounce)
    .duration(2000)
    .attr('class', 'foreground')
    .attr('fill', '#4ede00')
    .attr('fill-opacity', 1)
    .attrTween("d", function() {
      return arcTween({ endAngle: 0 }, chartPercentage/100 )
    })

    function arcTween(d, new_score) {
    var new_startAngle = 0
    var new_endAngle = new_startAngle + new_score * 2 * Math.PI
    var interpolate_start = d3.interpolate(d.startAngle, new_startAngle)
    var interpolate_end = d3.interpolate(d.endAngle, new_endAngle)
    return function(t) {
      d.endAngle = interpolate_end(t)
      d3.select('.radial-content')
        .text((d.endAngle / new_endAngle * chartValue).toFixed(4));
      return setArc(d)
    }
}  
};

componentDidMount() {
  this.availBalChart();
    //var $this = $(ReactDOM.findDOMNode(this));
    // set el height and width etc.
  };
  }
export default ProgressChart;

  