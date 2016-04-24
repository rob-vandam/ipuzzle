document.addEventListener('deviceready', onDeviceReady, false);

function populateDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS PUZZELTOCHT');
     tx.executeSql('CREATE TABLE IF NOT EXISTS PUZZELTOCHT (id unique, data, iBeacon, finished)');
     tx.executeSql('INSERT INTO PUZZELTOCHT (id, data, iBeacon, finished) VALUES (1, "First row", "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0", "False")');
     tx.executeSql('INSERT INTO PUZZELTOCHT (id, data, iBeacon, finished) VALUES (2, "Second row", "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0", "False")');
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!!!!!");
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM PUZZELTOCHT', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data + " Data1 =  " + results.rows.item(i).iBeacon);
    }
}


function onDeviceReady() {
    var db = window.openDatabase("Puzzeltocht", "1.0", "Puzzeltocht", 200000);
    db.transaction(populateDB, errorCB, successCB);
    db.transaction(queryDB, errorCB);
}