
app.LoadScript("SwitchApi.js");
//app.SetBackColor("#ffffff");
function OnStart(){
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	
	swi = app.CreateSwitch(40, 20, "pt");
	lay.AddChild(swi);
	
	var style = {
	  circle: {
	    size: 0.25,
	    color: "#ffffff"
	  },
	  span: {
	    color: "#3F51B5"
	  }
	}
	
	swi = app.CreateSwitch();
	swi.SetStyle(style);
	swi.SetOnChange(function(){
	  
  });
  swi.SetFunction(function(fr, dur, fps){
    return Math.pow(fr/dur*1000/fps, 2)
  })
	lay.AddChild(swi);
	
	var style = {
	  circle: {
	    size: 0.9,
	    color: "#eeeeee"
	  },
	  span: {
	    width: 0.4,
	    height: 1,
	    color: "#53d769"
	  }
	}
	
	swi = app.CreateSwitch();
	swi.SetStyle(style);
	swi.SetOnChange(function(){
	  
  });
	swi.SetFunction(function(fr, dur, fps){
    return Math.pow(fr/dur*1000/fps, 0.75);
  })
	lay.AddChild(swi);
	
	app.AddLayout( lay );
}