_AddOptions("NODOM")

app.SetBackColor("#444444");

layload = app.CreateLayout("Linear", "FillXY,VCenter");
w = app.GetDisplayWidth()
h = app.GetDisplayHeight()
loadimg = app.CreateImage("Img/"+ app.GetAppName()+".png", w<=h? 0.3 : -1, h<w? 0.3: -1);
loadtxt = app.CreateText("   Загрузка...");
loadtxt.SetTextColor("#ffffff");
layload.AddChild(loadimg);
layload.AddChild(loadtxt);
app.AddLayout(layload);
app.EnableBackKey(false);

preLay = "layHome"
PF = "/storage/emulated/0/PowerDirector/projects";
plist = {}
ns = "Проект не выбран";
function OnStart(){
	lay = app.CreateLayout( "Frame", "FillXY" );
	lay.Hide();
	app.AddLayout(lay);
	
	//START HOME PAGE
  
  layHome = app.CreateLayout("Linear", "VCenter,FillXY");
  lay.AddChild(layHome);
  
  txt = app.CreateText(app.GetAppName(), 1);
  txt.SetMargins(0,0,0,5,"dpi");
  txt.SetTextColor("#dddddd");
  txt.SetTextSize(24);
  layHome.AddChild(txt);
  
  btn = app.CreateButton("Разрезать", .7, -1, "Custom");
  btn.SetOnTouch(function(){
    showLay("laySplit");
	});
  layHome.AddChild(btn);
  
  btn = app.CreateButton("Объединить", .7, -1, "Custom");
	btn.SetOnTouch(function(){
    showLay("layMerge");
	});
  layHome.AddChild(btn);
  
  btn = app.CreateButton("Массовое удаление", .7, -1, "Custom");
	btn.SetOnTouch(function(){
    showLay("layMassDelete");
	});
  layHome.AddChild(btn);
  
  btn = app.CreateButton("Редактор проектов", .7, -1, "Custom");
	btn.SetOnTouch(function(){
    showLay("layEditor");
	});
  layHome.AddChild(btn);
  
  btn = app.CreateButton("О программе", .7, -1, "Custom");
	btn.SetOnTouch(function(){
    showLay("layInfo");
	});
  layHome.AddChild(btn);
  
  //END HOME PAGE
  //START SPLIT PAGE
  
  laySplit = app.CreateLayout("Linear", "VCenter,FillXY");
  laySplit.SetBackColor("#444444");
  lay.AddChild(laySplit);
  laySplit.Hide();
  
  spltxt = app.CreateText(ns, 1);
  spltxt.SetMargins(0,0,0,5,"dpi");
  spltxt.SetTextColor("#dddddd");
  spltxt.SetTextSize(24);
  laySplit.AddChild(spltxt);
  
	btn = app.CreateButton("Выбрать проект", .7, -1, "Custom");
	btn.SetOnTouch(showList);
  laySplit.AddChild(btn);
  
  btn = app.CreateButton("Разрезать", .7, -1, "Custom");
  btn.SetOnTouch(split);
  laySplit.AddChild(btn);
  
  //END SPLIT PAGE
  //START MERGE PAGE
  
  
  
  //END MERGE PAGE
  //START INFO PAGE
  
  layInfo = app.CreateLayout("Linear", "VCenter,FillXY");
  layInfo.SetBackColor("#444444");
  lay.AddChild(layInfo);
  layInfo.Hide();
  
  infTxt = app.CreateText("Приложение написано для себя.<br>Разработчик: <u><a href='http://4pda.ru/forum/index.php?showuser=5074398'>VladAf2001</a></u><br>Версия: "+
    app.GetVersion(), 0.7, -1, "Html,Link,Multiline");
  infTxt.SetTextColor("#dddddd");
  infTxt.SetTextSize(24);
  layInfo.AddChild(infTxt);
  
  //END INFO PAGE
	
	lay.Animate("FadeIn", null, 500);
  layload.Animate("FadeOut", function(){app.DestroyLayout(layload)}, 500);
}

function showLay(lay, back){
  if(typeof(window[lay])=="undefined")return pop("Скоро...", "Short");
  if(back) eval(preLay).Animate("SlideToRight");
	else eval(lay).Animate("SlideFromRight");
	preLay = lay;
}

function OnBack(){
  if(preLay!="layHome") showLay("layHome", true);
  else app.Exit();
}

function split(){
  var text = spltxt.GetText()
  if(text!=ns){
    var num = pname.indexOf(text)
    var nproj = plist.list[num];
    var proj = JSON.parse(app.ReadFile(PF+"/"+nproj.filename));
    var newplist = JSON.parse(JSON.stringify(plist));
    var li = nproj.filename.lastIndexOf(".")
    var filename = nproj.filename.substring(0, li)
    var fileext = nproj.filename.substring(li, nproj.filename.length)
    
    proj.tracks[0].timelineUnit.forEach(function(i, n){
      var tmPFn = "pdtb_"+filename+"("+(n+1)+")"+fileext
      if(!app.FileExists(PF+"/"+tmPFn)){
        var tmp = JSON.parse(JSON.stringify(nproj));
        tmp.filename = tmPFn;
        tmp.name = nproj.name+"("+(n+1)+")";
        tmp.durationUs = i.endUs-i.beginUs;
        tmp.coverClipInTimeUs = i.beginUs;
        newplist.list.push(tmp);
        
        var tmp = i;
        tmp.endUs = i.endUs-i.beginUs;
        tmp.beginUs = 0;
        delete tmp.timelineClip["in-tx"];
        delete tmp.timelineClip["out-tx"];
        
        var tmpproj = JSON.parse(JSON.stringify(proj))
        tmpproj.tracks[0].timelineUnit = [tmp]
        tmpproj.projectName = nproj.name+"("+(n+1)+")"
        
        app.WriteFile(PF+"/"+tmPFn, JSON.stringify(tmpproj));
      }
	  })
	  
	  app.WriteFile(PF+"/.projlist", JSON.stringify(newplist));
    
    pop("Готово");
    spltxt.SetText(ns);
  }
  else pop(ns+"!");
}

function pop(mes){
	app.ShowPopup(mes, "bottom");
}


function showList(){
  if(!app.FolderExists(PF)) return pop("Отсутствует папка с проектами!");
  pname = []
  if(app.FileExists(PF+"/.projlist")){
    plist = JSON.parse(app.ReadFile(PF+"/.projlist"));
    plist.list.forEach(function(i){
      pname.push(i.name);
    })
  }
	list = app.CreateListView("-пусто-,"+pname,"Выберите проект");
	list.SetOnTouch(function(p){
	  if(p=="-пусто-")p=ns;
    spltxt.SetText(p);
	});
	list.Show();
}