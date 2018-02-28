import React, {
    Component
} from 'react';
import * as utilities from './../sharedModules/utilities';
import * as d3 from "d3";
import * as c3 from 'c3';
import '../styles/partials/YouSpent.css';
import Barchart from './Barchart';
import Categories from './Categories';
import * as indexdb from './../sharedModules/indexedDB';
const _ = require("lodash");
//const columnData1 = utilities.chartData(indexdb,null);

//console.log("siva vvvv"+columnData1);



class YouSpent extends Component {

    constructor(props) {
        super(props);
        this.Categories = this.Categories.bind(this);
        this.navBack = this.navBack.bind(this);
        this.state = { currentCount: 10 };


    };
    addBackBtnCls() {
        return ' back';
    };
    navBack() {
        var data = indexdb.getAllRecords();
        setTimeout(()=>{
            indexdb.idbpromise.then((response) => {
                this.props.history.push({
                    pathname: '/Balance',
                    state: {
                        detail: response,
                        login:this.props.location.state.login
                    }
                });
            });
        },100);
    };
    
    Categories(cata){
console.log(cata);
 var data = indexdb.getAllRecords();
  console.log(indexdb);
  setTimeout(()=>{
      indexdb.idbpromise.then((response)=>{
        var sortedData = _.map(_.sortBy(response.siva.state, ['date'], ['desc']), _.values);
        let dataLoad = utilities.barChartCateData(indexdb, sortedData, cata);
        this.props.history.push({
          pathname:'/Categories',
          state:{
            detail:dataLoad,
            login:this.props.location.state.login
        }
        });
      });
  },100);
}
    componentDidMount() {
        this._updateChart();
    }
    componentDidUpdate() {
        this._updateChart();
    }
    _updateChart() {

        var data = this.props.location.state.detail.siva;
        var sortedData = _.map(_.sortBy(this.props.location.state.detail.siva.state, ['date'], ['desc']), _.values);

        console.log("MApValu -==>" + utilities.chartCateData(indexdb, sortedData));

        let dataLoad = utilities.chartCateData(indexdb, sortedData);
        console.log("extdata ==>" + dataLoad);
        const obivan = [];
        let totalSpent = 0;
        for (let v of dataLoad) {
            obivan.push(v[0]);
            totalSpent = totalSpent + v[1];
        }

        const chart = c3.generate({
            bindto: '#donutcanvas',
            data: {
                columns: [],
                type: 'donut',
                onclick: function(d, i) {
                    console.log("onclick", d, i);
                },
                onmouseover: function(d, i) {
                    console.log("onmouseover", d, i);
                },
                onmouseout: function(d, i) {
                    console.log("onmouseout", d, i);
                }
            },
            transition: {
                duration: 2000
            },
            color: {
                pattern: ['#b7e660', '#61e794', '#ff9a6e', '#61b7e6', '#6072e6', '#d55fe6', '#e66073','#e6d560']
            },
            donut: {
                title: utilities.denom(totalSpent),
                width: 8
            },
            legend: {
                show: false
            },
            tooltip: {
                show: false
            },
            size: {
                width: 180,
                height: 180
            }
        });
        let timeout = 0;

        function addSpent(data, delay) {
            let dataTmp = [data[0], 0];
            setTimeout(function() {
                chart.internal.d3.transition().duration(0);
                chart.load({
                    columns: [
                        dataTmp
                    ]
                });
            }, timeout);
            timeout += 0;
            data.forEach(function(value, index) {
                setTimeout(function() {
                    dataTmp[index] = value;
                    if (index < 10) dataTmp.push(0);
                    chart.load({
                        columns: [
                            dataTmp
                        ],
                        length: 0
                    });
                }, (timeout + (delay / data.length * index)));
            });
            timeout += delay;
        }
        let indexvale;

        d3.select('#donutcanvas').attr('style', '');
        d3.select('#donutcanvas > svg').attr('style', '').attr('class', 'piChart align_center').attr('width', 180).attr('height', 180);
       dataLoad = dataLoad.sort(function(val1, val2) {
          return val1[1] - val2[1];
        });
        for (indexvale of dataLoad) {
            addSpent([indexvale[0], indexvale[1]], 100);
            d3.select(`span[data-id='${indexvale[0]}']`).style('background-color', chart.color(indexvale[0])).style('width', 100 / (totalSpent / indexvale[1]) + '%');
            d3.select(`span[cat-id='${indexvale[0]}']`).text(`${indexvale[1]}`);
        }
    }
    render() {

        var data = this.props.location.state.detail.siva;
        var sortedData = _.map(_.sortBy(this.props.location.state.detail.siva.state, ['date'], ['desc']), _.values);

        let dataLoad = utilities.chartCateData(indexdb, sortedData);
        let obivan = [], totalSpent = 0;
       dataLoad = dataLoad.sort(function(val1, val2) {
          return val1[1] - val2[1];
        });
         for (let v of dataLoad) {
            obivan.push(v[0]);
            totalSpent = totalSpent + v[1];
        }

 let elements = obivan.map((element, index) =>
                <div className="app__meeting" onClick={() => this.Categories(element)} key={index}>
                <p className="app__meeting-info">
                <span>{element}</span>
                <span cat-id={element} className="float_right"></span>
                <span className="myProgress">
                <span className="myBar" data-id={element}> </span>
                </span>
                </p>
                </div>)

        return ( <div className = "tracker active youSpent">< div className = "app__top">
    <div className = {"app__menu-btn" + this.addBackBtnCls()} onClick = {this.navBack}><span></span></div><p className = "app__hello"
id = "descr">Expenses</p><div className = "container"><div className = "progress"><span className = "align_center"
id = "donutcanvas"></span></div></div></div><div className = "app__bot"><div id = "tes"><p className = "title-text"><
span>Expense Descriptions</span><span className="float_right">Amount</span></p></div ><div id = "legend"><div className = "legend">{elements}</div></div></div></div>
        );
    }
}
export default YouSpent;
