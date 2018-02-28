onmessage = function(e) {

    console.log('Message received from main script');
    var online = navigator.onLine;
    console.log("online status ==> " + online);
    // alert('online status ==> '+online);
    // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    var username;
    // var cachess = e.data[0];
    //console.log('Posting message back to main script' + e.data[0]);
    console.log('Posting message back to main script');
    //DOM ref error thats why we are doing once again
    importScripts("https://www.gstatic.com/firebasejs/4.5.1/firebase.js");
    //importScripts("indexedDb.js");

    var config = {
        apiKey: "AIzaSyAtIx-SfeJoPrejDN0hngPOHgx-jiJNPxc",
        authDomain: "pwasample-9c50d.firebaseapp.com",
        databaseURL: "https://pwasample-9c50d.firebaseio.com",
        projectId: "pwasample-9c50d",
        storageBucket: "pwasample-9c50d.appspot.com",
        messagingSenderId: "546321109506"
    };
    firebase.initializeApp(config);

    console.log('Firebase script called');
    //   firebase.database().ref('users/').once('value').then(function(snapshot) {
    //     snapshot.forEach(function(snapshot) {
    //       console.log('called once function');
    //         username = snapshot.val();
    //         postMessage("once"+username.name);
    //     });
    // });
    var ref;
    // if(cachess == null){
    ref = firebase.database().ref('users/');
    //   console.log("ref ==>"+ref);


    //   response = openDb(column_fields);
    //   // if($.trim(response) != '') {
    //   //  $("#msg").html(response);
    //     console.log("res==>",response);
    //   // }

    // //var jsonData = { bankId: bankId, title: title, year: year };
    //     response = insertDB(ref);
    //      console.log("res==> insertDB",response);
    // if(response) {
    //    $("#msg").html(response);
    // }

    // localStorage.setItem("cachedata1", ref);
    // }else{
    //   ref = cachess;
    // }

    firebase.database().ref().on('value', function(snapshot) {

        console.log("JSON Balance ==>", snapshot.val());
        snapshot.forEach(function(snapshot) {
            console.log(snapshot.val());
            console.log("ondata chan worker posted");
            postMessage(snapshot.val());
            // snapshot.forEach(function(snapshot) {
            //  console.log("ondata chan worker");
            //  console.log(snapshot.val());
            //      username = snapshot.val();
            //      postMessage(username.name + username.avabal);
            //        snapshot.forEach(function(snapshot) {
            //          var arr2 = Object.keys(snapshot.val());
            //          console.log(arr2);
            //          var key = arr2[0];
            //          console.log(key) ;
            //            arr2.forEach(function(element) {
            //            postMessage(element);

            //              console.log(element);
            //              });
            //        });
            //  });
        });
        //postMessage(workerResult +snapshot.name);
    });

    //workerResult = workerResult+username.name;
    //postMessage(workerResult);
}