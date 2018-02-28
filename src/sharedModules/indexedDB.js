 var DB_NAME = 'txnhistory';
 var DB_VERSION = 3;
 var DB_STORE_NAME = 'usertxndata';
 var db,req;
 var idbpromise;
export {idbpromise};
export function openDb(fields) {
    var result = '';
    var req = indexedDB.open(DB_NAME);
    req.onsuccess = function(evt) {
        db = evt.target.result;
    };
    req.onerror = function(evt) {
        console.error("openDb:", evt.target.errorCode);
        result = 'Error: ' + evt.target.errorCode;
    };
    req.onupgradeneeded = function(evt) {
        var store;
        if(evt.oldVersion!==0 && evt.oldVersion < DB_VERSION){
            evt.currentTarget.result.deleteObjectStore(DB_STORE_NAME);
            store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });    
        }else{
            store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });       
        }
        if (fields.length > 0) {
            for (var i = 0; i < fields.length; i++) {
                var unique_value = (fields[i].unique === 1) ? true : false;
                store.createIndex(fields[i].field_name, fields[i].field_name, { unique: unique_value });
            }
        }        
        result = 'Database Created Successfully';
    };
    //return result;
}

export function insertDB(jsonData) {
    var result = '';
    var store = getObjectStore('readwrite');
    console.log(store);
    var req;
    console.log(jsonData);
    if(store != undefined){
        try {
            req = store.add(jsonData);
            result = "Data inserted Successfully";
        } catch (e) {
            if (e.name === 'DataCloneError')
                result = "Error: This engine doesn't know how to clone a Blob, " + "use Firefox";
            throw e;
        }
        req.onsuccess = function(evt) {
            result = "Data Inserted Successfully";
        };
        req.onerror = function() {
            result = "Error: " + this.error;
        };
        getValues();
        return result;
    }else{
        alert('Error:01 - DB not updated');
    }
}

export function deleteValues() {
    console.log("deletePublication:", arguments);
    var store = getObjectStore('readwrite');
    if(store != undefined){
        req = store.openCursor();
        var i = 0;
        var result_array = [];
        req.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
                var req = store.get(cursor.key);

                req.onsuccess = function(evt) {
                    var value = evt.target.result;
                    console.log("req value ID-->"+evt.target.result.id);
                     deletePublication(evt.target.result.id, store);
                    console.log("req value-->"+value);
                    console.log(value);
                    result_array[i] = value;
                    localStorage.setItem('session', JSON.stringify(result_array));
                };
                cursor.continue();
                i++;
            }
        };
    }else{
        alert('Error:02 - DB not updated');
    }
}

export function getValues() {
    var store = getObjectStore('readonly');
    if(store != undefined){
        req = store.openCursor();
        var i = 0;
        var result_array = [];
        req.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
                var req = store.get(cursor.key);

                req.onsuccess = function(evt) {
                    var value = evt.target.result;
                    console.log("req value-->"+value);
                    console.log(value);
                    result_array[i] = value;
                    localStorage.setItem('session', JSON.stringify(result_array));
                };
                cursor.continue();
                i++;
            }
            
        };
        return result_array;
    }else{
        alert('Error:03 - DB not updated');
    }
}

export function getAllRecords() {
    if (typeof db === 'undefined') {
        var req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onsuccess = function(evt) {
            db = this.result;
            var tx = db.transaction(DB_STORE_NAME, 'readonly');
            var store = tx.objectStore(DB_STORE_NAME);
            var resultData;
            if(store!==undefined){
               idbpromise = new Promise((resolve, reject) => {
                let idb = store.getAll();
                idb.onsuccess = function(e){
                    resultData = e.target.result[0];
                    resolve(resultData);
                }            
               });        
            }
        };
        req.onerror = function(evt) {
            console.log("ON Error ==>" + evt)
        };        
    }else{
        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);
        var resultData;
        if(store!==undefined){
           idbpromise = new Promise((resolve, reject) => {
            let idb = store.getAll();
            idb.onsuccess = function(e){
                resultData = e.target.result[0];
                resolve(resultData);
            }            
           });        
        }
    }
}

export function getObjectStore(mode) {
    if (typeof db === 'undefined') {
        var req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onsuccess = function(evt) {
            db = this.result;
            var tx = db.transaction(DB_STORE_NAME, mode);
            return tx.objectStore(DB_STORE_NAME);
        };
        req.onerror = function(evt) {
            console.log("ON Error ==>" + evt)
        };
    } else {
        var tx = db.transaction(DB_STORE_NAME, mode);
        return tx.objectStore(DB_STORE_NAME);
    }
}


export function deletePublication(key, store) {
    console.log("deletePublication:", arguments);

    if (typeof store === 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readwrite');

    // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
    // the result of the Object Store Deletion Operation algorithm is
    // undefined, so it's not possible to know if some records were actually
    // deleted by looking at the request result.
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var record = evt.target.result;
        console.log("record:", record);
        if (typeof record === 'undefined') {
            console.log("No matching record found");
            return;
        }
        // Warning: The exact same key used for creation needs to be passed for
        // the deletion. If the key was a Number for creation, then it needs to
        // be a Number for deletion.
        req = store.delete(key);
        req.onsuccess = function(evt) {
            console.log("evt:", evt);
            console.log("evt.target:", evt.target);
            console.log("evt.target.result:", evt.target.result);
            console.log("delete successful");
            console.log("Deletion successful");
            
        };
        req.onerror = function(evt) {
            console.error("deletePublication:", evt.target.errorCode);
        };
    };
    req.onerror = function(evt) {
        console.error("deletePublication:", evt.target.errorCode);
    };
}