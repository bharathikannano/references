// import * as indexdb from './../sharedModules/indexedDB';

export function toggleLoader(arg) {
    if (arg === "show") {
        document.getElementById('loader-container').classList.remove('hide');
    } else if (arg === "hide") {
        document.getElementById('loader-container').classList.add('hide');
    }
}

export function denom(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function chartData(indexdb, SortedData) {
    // {
    //        "amount" : "5000",
    //        "annot" : "cr",
    //        "date" : "10-11-2017",
    //        "desc" : "CASH DEPOSIT",
    //        "id" : "211"
    //      }
    var data;
    var sDate = [];
    var sAmount = [];
    var charDataArr = [];
    var dateString;
    var dateParts;
    //sAmount.push("My Numbers");
    //sDate.push("x");

    if (SortedData === null || SortedData === undefined) {
        data = indexdb.getAllRecords();
        if (data !== undefined) {
            SortedData = data[1].siva.state;
            SortedData.map((txn, index) => {
                if (txn.annot.toLowerCase().indexOf("dr") >= 0) {
                    sAmount.push(parseInt(txn.amount,10));
                    dateString = "";
                    dateParts = "";
                    dateString = txn.date; //10-11-2017
                    dateParts = dateString.split("-");
                    sDate.push(dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0]);

                }
            });
        }
    }
    charDataArr.push(sDate);
    charDataArr.push(sAmount);

    return charDataArr;
}

export function chartCateData(indexdb, SortedData) {

    var retunArray = [];
    var PURCHASEvaltotalVal = 0;
    var ATMvaltotalVal = 0;
    var UPIvaltotalVal = 0;
    var IMPSvaltotalVal = 0;
    var NACHvaltotalVal = 0;
    var PAYMENTvaltotalVal = 0;
    var OthervaltotalVal = 0;
    var cate = {};
    cate.PURCHASEval = [];
    cate.ATMval = [];
    cate.UPIval = [];
    cate.IMPSval = [];
    cate.NACHval = [];
    cate.PAYMENTval = [];
    cate.Otherval = [];

    SortedData.map((txn, index) => {

        if (txn[1].toLowerCase().indexOf("dr") >= 0) {
            if (txn[3].toUpperCase().indexOf("PURCHASE AT") >= 0) {
                cate.PURCHASEval.push(txn);
                PURCHASEvaltotalVal = PURCHASEvaltotalVal + parseInt(txn[0],10);

            } else if (txn[3].toUpperCase().indexOf("ATM WITH") >= 0) {
                cate.ATMval.push(txn);
                ATMvaltotalVal = ATMvaltotalVal + parseInt(txn[0],10);
            } else if (txn[3].toUpperCase().indexOf("UPI") >= 0) {
                cate.UPIval.push(txn);
                UPIvaltotalVal = UPIvaltotalVal + parseInt(txn[0],10);

            } else if (txn[3].toUpperCase().indexOf("IMPS") >= 0) {
                cate.IMPSval.push(txn);
                IMPSvaltotalVal = IMPSvaltotalVal + parseInt(txn[0],10);

            } else if (txn[3].toUpperCase().indexOf("NACH") >= 0) {
                cate.NACHval.push(txn);
                NACHvaltotalVal = NACHvaltotalVal + parseInt(txn[0],10);

            } else if (txn[3].toUpperCase().indexOf("PAYMENT GATE") >= 0) {
                cate.PAYMENTval.push(txn);
                PAYMENTvaltotalVal = PAYMENTvaltotalVal + parseInt(txn[0],10);

            } else {
                cate.Otherval.push(txn);
                OthervaltotalVal = OthervaltotalVal + parseInt(txn[0],10);
            }
        }

    });

    retunArray.push(["PURCHASE Details", PURCHASEvaltotalVal]);
    retunArray.push(["ATM Withdraval details", ATMvaltotalVal]);
    retunArray.push(["UPI Transfers done by you", UPIvaltotalVal]);
    retunArray.push(["IMPS Transfers done by you", IMPSvaltotalVal]);
    retunArray.push(["NACH Home Loan", NACHvaltotalVal]);
    retunArray.push(["PAYMENT GATE Online purchase", PAYMENTvaltotalVal]);
    retunArray.push(["Other details", OthervaltotalVal]);

    return retunArray;
}

export function barChartCateData(indexdb, SortedData, data) {
    var mainArray = [];
    var catearray =[];
    var retunArray = [];
    var valX = [], valY = [];
    var cate = {}, findCate;
    var cateVal = ['PURCHASE AT', 'ATM WITH', 'UPI', 'IMPS', 'NACH', 'PAYMENT GATE', 'Other'];
    for(let i of cateVal){
        if (data.toUpperCase().indexOf(i) >= 0){
            findCate = i;
        }
    }
    // var findCate = data.toLowerCase().indexOf('PURCHASE AT') ? 'PURCHASE AT'
     SortedData.map((txn, index) => {
        if (txn[1].toLowerCase().indexOf("dr") >= 0) {
            if (txn[3].toUpperCase().indexOf(findCate) >= 0) {
                var ddmmtxn= txn[2].split("-")[1] + "-" + txn[2].split("-")[0];
                valX.push(ddmmtxn);
                valY.push(parseInt(txn[0],10));
                catearray.push(txn);



            }
        }

     });
     //valX.unshift('x');
     valY.unshift('My Numbers');
      retunArray.push(valX, valY);
mainArray.push(retunArray);
mainArray.push(catearray);
mainArray.push(data);
 return mainArray;
}