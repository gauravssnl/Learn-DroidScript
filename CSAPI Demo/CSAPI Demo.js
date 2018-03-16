
app.SetDebugEnabled(false);
app.LoadScript("CSAPI.js");

function OnStart(){
  lay = app.CreateLayout("Linear", "FillXY");
  lay.SetOnTouch(function(ev){
	  lay.SetBackColor(clrs[Math.floor(ev.y[0]*clrs.length)]);
	});
  app.AddLayout(lay);
  clrs = smoothColors("#4CAF50,#FFEB3B,#FF5722");
  alert(clrs)
  lay.SetBackColor(clrs[Math.floor(clrs.length/2)]);
}