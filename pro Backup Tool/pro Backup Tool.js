_AddOptions("nodom");

t = 0;
dens = app.GetScreenDensity();
ds = "/storage/emulated/0/DroidScript/"
pers = 0
lastproc = ""
proc = "waiting"
pi = Math.PI

theme = app.CreateTheme();
theme.AdjustColor(35, 0, -10);
theme.SetBackColor("#333333");
theme.SetBtnTextColor("#ffffffff");
theme.SetButtonOptions("custom");
theme.SetButtonStyle("#4285F4", "#4285F4", 4, "#ffffff", 0, 1);
theme.SetTextColor("#ff666666");
app.SetTheme( theme );

function OnStart(){
  lay = app.CreateLayout("linear", "FillXY");
  zip = app.CreateZipUtil();
  btnZip = app.CreateButton("Create Backup");
  btnZip.SetOnTouch(function(){
    img.SetAlpha(0);
    proc = "creating"
	  zip.Create(ds+"APKs/test.zip");
	  var list = app.ListFolder(ds);
	  var n = 0
	  function req(){
      var i = list[n]
      n++
      if(i!=".edit"&&i!="APKs"&&app.FolderExists(ds+i))
        zipProject(i);
	    if(n<list.length)setTimeout(function(){
        lastpers = pers
	      pers = Math.round(n/(list.length-1)*100)
	      req();
      }, 250)
      else{
        zip.Close();
        setTimeout(function(){
          proc = "done"
          pers = 0
	      }, 500)
      }
    }
	  req()
	});
  lay.AddChild(btnZip);
  
  s = 512
  lw = 10
  img = app.CreateImage(null, s, s, "px");
  img.SetAutoUpdate(false);
  img.SetPixelMode(true);
  img.SetPaintStyle("line");
  img.SetTextSize(144/dens*s/3);
  img.SetLineWidth(144/dens*lw);
  lay.AddChild(img);
  
	app.AddLayout(lay);
	app.Animate(Draw, 60);
}

function zipProject(path){
	app.ListFolder(ds+path).forEach(function(i, n){
    if(app.FolderExists(ds+path+"/"+i))
      zipProject(path+"/"+i);
    else zip.AddFile(path+"/"+i, ds+path+"/"+i);
	})
}

function Draw(time, dt){
  img.Clear();
  
  if(lastproc!=proc){
    t=0
    lastproc = proc
  }
  switch(proc){
    case "waiting":
      
      break;
    case "creating":
      OnProgress(dt);
      break;
    case "done":
      OnDone();
      break;
  }
  
  img.Update();
  t+=dt
}

lastpers = 0
pdt = 0
function OnProgress(dt){
  Animate("fadein", 500, 0)
  pdt += dt
  var dpers = pers-lastpers
  if(lastpers<pers)//
  lastpers = pers 
  img.DrawArc(lw/2, lw/2, s-lw/2, s-lw/2, -90, 3.6*lastpers+dpers);
  var text = img.MeasureText(pers);
  img.SetPaintStyle("fill");
  img.DrawText(pers, s/2-text.width/2, s/2+144/dens*s/2);
  img.SetPaintStyle("line");
}

function OnDone(){
  var x = t/250
  var d = Math.pow(x, 2)
  var nd = d
  if(d>=1)nd=1
  var x1 = s/6
  var y1 = s/3*2
  var xl = s/2-x1
  var yl = s-y1
  var x2 = x1+xl*nd
  var y2 = y1+yl*nd
  
	img.DrawLine(x1, y1, x2, y2);
  nd=0
  if(d>1)nd = d-1
  if(d>=2)nd = 1
  var xl = s/4
  var yl = -s+s/4
  var x3 = x2+xl*nd
  var y3 = y2+yl*nd
	img.DrawLine(x2, y2, x3, y3);
	
}

function Animate(type, dur, nt){
  var dt = t-nt
  if(dt<=dur&&dt>0)
  switch(type){
    case "fadein":
      img.SetAlpha(dt/dur);
      break;
    case "fadeout":
      img.SetAlpha(1-dt/dur);
      break;
  }
}