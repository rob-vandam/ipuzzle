var app = {};

var pagecounter = 0;

app.beaconRegions =
[
	{
		id: 'eerste',
		uuid:'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0',
		major: 1234,
		minor: 5678
	},
	{
		id: 'tweede',
		uuid:'E2C56DB5-DFFB-48D2-B060-D0F5A71096E1',
		major: 1234,
		minor: 5678
	},
	{
		id: 'derde',
		uuid:'E2C56DB5-DFFB-48D2-B060-D0F5A71096E2',
		major: 1234,
		minor: 5678
	}
]

app.currentPage = 'start-pagina'

var paginalijst = []

for (i = 0; i < app.beaconRegions.length; i++){
	paginalijst.push(app.beaconRegions[i].id)
}

//paginalijst.push('laatste');

//console.log('paginalijst = ' + paginalijst)



//console.log(app.beaconRegions);

app.initialize = function()
{
	document.addEventListener('deviceready',app.onDeviceReady,false)
	app.gotoPage(app.currentPage)
}

app.onDeviceReady = function()
{
	// Specify a shortcut for the location manager that
	// has the iBeacon functions.
	window.locationManager = cordova.plugins.locationManager
	cordova.plugins.locationManager.isBluetoothEnabled()
	.then(function(isEnabled){
	//hyper.log("isEnabled: " + isEnabled);
	if (isEnabled) {
	//cordova.plugins.locationManager.disableBluetooth();
	} else {
	//cordova.plugins.locationManager.enableBluetooth();
	alert('Zet bluetooth aan');
	}
	})
	.fail(console.error)
	.done();
	// Start tracking beacons!
	app.startScanForBeacons()
}

app.startScanForBeacons = function()
{
	//console.log('startScanForBeacons')

	// The delegate object contains iBeacon callback functions.
	var delegate = new cordova.plugins.locationManager.Delegate()

	delegate.didDetermineStateForRegion = function(pluginResult)
	{
		//console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
	}

	delegate.didStartMonitoringForRegion = function(pluginResult)
	{
		//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
	}

	delegate.didRangeBeaconsInRegion = function(pluginResult)
	{
		//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
		app.didRangeBeaconsInRegion(pluginResult)
	}

	// Set the delegate object to use.
	locationManager.setDelegate(delegate)

	// Start monitoring and ranging our beacons.
	for (var r in app.beaconRegions)
	{
		var region = app.beaconRegions[r]

		var beaconRegion = new locationManager.BeaconRegion(
			region.id, region.uuid, region.major, region.minor)

		// Start monitoring.
		locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done()

		// Start ranging.
		locationManager.startRangingBeaconsInRegion(beaconRegion)
			.fail(console.error)
			.done()
	}
}

app.didRangeBeaconsInRegion = function(pluginResult)
{
	////console.log('numbeacons in region: ' + pluginResult.beacons.length)

	// There must be a beacon within range.
	if (0 == pluginResult.beacons.length)
	{
		return
	}

	// Our regions are defined so that there is one beacon per region.
	// Get the first (and only) beacon in range in the region.
	var beacon = pluginResult.beacons[0]

	// The region identifier is the page id.
	var pageId = pluginResult.region.identifier
	//hyper.log('ranged beacon: ' + pageId + ' ' + beacon.proximity + beacon.rssi)
	//hyper.log(pagecounter);
	//hyper.log(pageId);
	// If the beacon is close and represents a new page, then show the page.
	//if ((beacon.proximity == 'ProximityImmediate')&& pageId == paginalijst[pagecounter])
	if ((beacon.rssi > -65 )&& pageId == paginalijst[pagecounter])
	{
		//console.log(pageId + paginalijst[pagecounter]);
		if ((pagecounter -1) < paginalijst.length){
		pagecounter += 1;
		}
		if (paginalijst.length == pagecounter){
		pageId = 'laatste'
		}
		//console.log(pagecounter);
		app.gotoPage(pageId)

		return
	}

	// If the beacon represents the current page but is far away,
	// then show the default page.
	//if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityNear')
	//	&& app.currentPage == pageId)
	//{
	//	app.gotoPage('start-pagina')
	//	return
	//}
}

app.gotoPage = function(pageId)
{
	app.hidePage(app.currentPage)
	app.showPage(pageId)
	app.currentPage = pageId
}

app.showPage = function(pageId)
{
	document.getElementById(pageId).style.display = 'block'
}

app.hidePage = function(pageId)
{
	document.getElementById(pageId).style.display = 'none'
}

app.initialize()