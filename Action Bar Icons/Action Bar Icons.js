
var iconsList = "", currentProgram;

function OnStart()
{
//if( !app.IsAPK() ) app.WriteFile( "Img/Icons.txt",app.ListFolder("Img/Icons") );
iconsList = app.ReadFile("Img/Icons.txt").split(",");
app.SetOrientation("Portrait");
app.EnableBackKey(false);
app.SetDebugEnabled(false);
CreateLayout();
}

function CreateLayout()
{
	lay = app.CreateLayout("linear","tcenter,fillxy");
	lay.SetBackColor("#ffffff");
	
	var bar = function(title,desc,lay){
		var tor = app.CreateLayout("linear","vcenter,left");
		tor.SetBackGradient("#ff22A7F0","#ff177FB7");
		tor.SetPadding(0.04,0,0,0.003);
		tor.SetSize(1,0.1);
		lay.AddChild(tor);
		
		var txtx = app.CreateText(title);
		txtx.SetTextSize(22);
		txtx.SetTextColor("#ffffff");
		tor.AddChild(txtx);
		
		var txty = app.CreateText(desc);
		txty.SetTextSize(14);
		txty.SetTextColor("#ffffff");
		if(desc) tor.AddChild(txty);
		
		return txty;
		}
		
	var barX = bar("Icons","Choose icons for add on your program. [",lay);
	
	edt = app.CreateTextEdit("",1,-1,"singleline,nospell");
	edt.SetTextColor("#000000");
	edt.SetCursorColor("#ff22A7F0");
	edt.SetHint("Search");
	lay.AddChild(edt);
	
	edt.SetOnChange(function(){
		var text = this.GetText();
		var list = [], nlst = lst1.list.split(",");
			for( var i=0; i<nlst.length; i++ ) {
				if( String(nlst[i]).split(":")[0].indexOf(text) > -1 ) {
				list.push(nlst[i]);
				}
			}
		lst1.SetList(list);
		});
	
	lst1 = app.CreateList("",1,0.825,"Menu");
	lay.AddChild(lst1);
	
	lst1.SetOnTouch(function(a,b,c,d){
		var dest = currentProgram+"/ic_"+a;
			if( app.FileExists(dest) ) {app.ShowPopup("Already exists"); return}
		app.CopyFile("Img/Icons/ic_"+a, dest);
		app.ShowPopup("Icon \""+a+"\" added in your program");
		});
	
	layf = app.CreateLayout("linear","tcenter,fillxy");
	layf.SetBackColor("#ffffff");
	
	bar("Programs","Choose a program you want to insert icons.",layf);
	
	lst2 = app.CreateList("",1,0.9,"Menu");
	layf.AddChild(lst2);
	
	lst2.SetOnTouch(function(a,b,c,d){
		currentProgram = "/sdcard/DroidScript/"+a+"/Img";
		barX.SetText( barX.GetText()+a+"]" );
		layf.Animate("SlideToBottom");
		edt.Focus();
		});
	
	app.AddLayout(lay);
	app.AddLayout(layf);
	
	var list = [];
	var tmpFldr = "/sdcard/.actionbaricons_tmp";
	app.ShowProgressBar("Getting list");
	app.MakeFolder(tmpFldr);
	for( var i=0; i<iconsList.length; i++ ) {
	var item = iconsList[i].replace("ic_","");
	var icon = "Img/Icons/ic_"+item;
		if( item.indexOf("white") > -1 ) {
		var img = app.CreateImage(icon);
		icon = tmpFldr+"/image_"+i;
		img.Save(icon);
		}
	app.UpdateProgressBar( (i/iconsList.length)*50 );
	list.push(item+":"+icon);
	}
	lst1.list = String(list);
	lst1.SetList(list);
	
	var list = [];
	var programs = app.ListFolder("/sdcard/DroidScript");
	for( var i=0; i<programs.length; i++ ) {
	var icon = "/Sys/Img/Icon.png";
		if( app.FileExists("/sdcard/DroidScript/"+programs[i]+"/"+programs[i]+".js") || app.FileExists("/sdcard/DroidScript/"+programs[i]+"/"+programs[i]+".html") ) {
			if( app.FileExists("/sdcard/DroidScript/"+programs[i]+"/Img/"+programs[i]+".png") )
				icon = "/sdcard/DroidScript/"+programs[i]+"/Img/"+programs[i]+".png";
		list.push(programs[i]+":"+(app.FileExists("/sdcard/DroidScript/"+programs[i]+"/"+programs[i]+".js")?"Native":"HTML")+":"+icon);
		}
	app.UpdateProgressBar( ( (i/programs.length)*50)+50 );
	}
	app.UpdateProgressBar(100);
	lst2.SetList( list.sort() );
	app.HideProgressBar();
}

function OnBack()
{
var tmpFldr = "/sdcard/.actionbaricons_tmp";
app.DeleteFolder(tmpFldr);
app.Exit();
}