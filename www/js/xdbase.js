document.addEventListener('deviceready', onDeviceReady, false);

function populateDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS DEMO');
     tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!!!!!");
}

function onDeviceReady() {
//    var db = window.sqlitePlugin.openDatabase({name: "test.db"});
//    db.executeSql("DROP TABLE IF EXISTS tt");
//    db.executeSql("CREATE TABLE tt (data)");
//    window.sqlitePlugin.echoTest(successCB, errorCB);
//    var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

//document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
//function onDeviceReady() {
//  var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
//  alert('database created');
//}


//var db;
//var dbCreated = false;

//document.addEventListener("deviceready", onDeviceReady, false);

//function onDeviceReady() {

//var db = window.sqlitePlugin.openDatabase({name: 'mydatabase', location: 'default'}, successCB, errorCB);

//window.sqlitePlugin.echoTest(successCB, errorCB);
//  console.log('test321');
//  window.sqlitePlugin.echoTest(successCallback, errorCallback);
//  db = window.sqlitePlugin.openDatabase({name: 'wieskamppuzzle2.db', location: 'default'}, function(db) {
//  db.transaction(function(tx) {
//  console1.log('succes!!!!');
    // ...
//  }, function(err) {
//    console.log('Open database ERROR: ' + JSON.stringify(err));
//  });
//});
//console.log('test123');
//}

