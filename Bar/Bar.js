
function OnStart()
{
	lay = app.CreateLayout("linear");
	
	var icon = "Img/Back.png"; //[fa-bars]
	
	//long =>
	bar = app.CreateBar("Title",icon,function(){app.ShowPopup("Back");},"[fa-undo],[fa-search]",function(){app.ShowPopup(bar.GetLastButton());},"Tab 1,Tab 2,Tab 3",function(){app.ShowPopup(bar.GetLastItem());},"tcenter");
	lay.AddChild(bar);
	
	var list = function(){var x=[]; for( var i=1; i<=100; i++ ) x.push("Item "+i); return String(x);}
	
	lst = app.CreateList( list(),1,bar.GetFreeHeight() );
	lst.SetTextColor("#000000");
	bar.GetTabLayoutByIndex(0).AddChild(lst);
	
	bar.GetTabLayoutByIndex(1).AddChild( app.CreateButton("Button") );
	bar.GetTabLayoutByIndex(1).SetPadding(0,0.3);
	
	bar.GetTabLayoutByIndex(2).AddChild( app.CreateImage("/Sys/Img/Hello.png",0.3) );
	bar.GetTabLayoutByIndex(2).SetPadding(0,0.25);
	
	app.AddLayout(lay);
}

app.CreateBar = function(title,button,callback,btnList,btnCallback,horizList,horizCallback,options)
{
var h = 1;
var color = "#ff22A7F0";
btnList = btnList?btnList:"";
horizList = horizList?horizList:"";

var tor = app.CreateLayout("absolute");
tor.SetBackColor("#ffffff");
tor.SetSize(1,h);

var layBg = app.CreateLayout("linear",options?options:"vcenter");
tor.AddChild(layBg);

tor.bg_layout = layBg;

var layBar = app.CreateLayout("absolute");
layBar.SetSize(1,0.11); h -= 0.11;
layBar.SetBackColor(color);
tor.AddChild(layBar);

var shw = app.CreateImage("Img/Shadow.png",1,0.006);
shw.SetPosition( (1/2)-(shw.GetWidth()/2),0.11 );
shw.SetAlpha(0.3);
tor.AddChild(shw);

if( String(options).indexOf("noshadow") > -1 ) shw.Hide();

var layLeft = app.CreateLayout("linear","vcenter,horizontal,left");
layLeft.SetPadding(0.2);
layLeft.SetSize(0.5,0.11);
layBar.AddChild(layLeft);

var txt = app.CreateText(title?title:"");
txt.SetTextColor("#ffffff");
txt.SetTextSize(23);
layLeft.AddChild(txt);

var isFa = true;

if( String(button).indexOf("[fa-") == -1 && button ) {
	isFa = false;
	var img = app.CreateImage(button,-1,0.05);
	img.SetPosition( 0.045,(0.11/2)-(img.GetHeight()/2)-0.001 );
	layBar.AddChild(img);
	}
	
var btn = app.CreateButton(!isFa?"":button,0.2,0.2,"FontAwesome,Custom");
btn.SetStyle("#50ffffff","#50ffffff",0,null,0,0);
btn.SetBackColor("#00000000");
btn.SetPosition( -0.0168,(0.11/2)-(0.2/2)+0.0065 ); //-0.0405);
btn.SetOnTouch(callback);
btn.SetTextSize(23);
layBar.AddChild(btn);

tor.first_btn = btn;
if(!button) {btn.Hide(); layLeft.SetPadding(0.05);}

var list = btnList.split(",");
for( var i=0; i<list.length; i++ ) {
	var posWbase = 1.0-( 0.16*(i+1) )+( (i+1>1?0.0065:0)*(i) );
	
	var btn = app.CreateButton(list[i],0.18,0.2,"FontAwesome,Custom");
	btn.SetStyle("#50ffffff","#50ffffff",0,null,0,0);
	btn.SetBackColor("#00000000");
	btn.SetPosition( posWbase-(i==0?0.01:0),(0.11/2)-(0.2/2)+0.0065 ); //-0.0405);
	btn.SetTextSize(23);
	btn.sequence = list.length-i;
	layBar.AddChild(btn);
	
	btn.SetOnTouch(function(){tor.last_btn=this; setTimeout(btnCallback,0);});
	}

var layHorizLst = app.CreateLayout("absolute");
layHorizLst.SetSize(1,0.09);
layHorizLst.SetPosition(0,0.11);
layHorizLst.SetBackColor(color);
if(horizList) {tor.AddChild(layHorizLst); shw.SetPosition((1/2)-(shw.GetWidth()/2),0.11+0.0894); h -= 0.0894;}

var laySob = app.CreateLayout("linear");
laySob.SetSize(1,0.09);
laySob.SetBackColor("#15000000");
layHorizLst.AddChild(laySob);

var img = app.CreateImage(null,0.1,0.008);
img.SetColor("#ffffff");
layHorizLst.AddChild(img);

tor.hz_m = img;

var list = horizList.split(",");
img.SetSize( 1/list.length );

for( var i=0; i<list.length; i++ ) {
	var baseW = 1/list.length;
	var posWbase = baseW*i;
	
	var btn = app.CreateButton(list[i],baseW,0.2,"Custom");
	btn.SetStyle("#50ffffff","#50ffffff",0,null,0,0);
	btn.SetBackColor("#00000000");
	btn.SetPosition( posWbase,-0.05 );
	btn.SetEllipsize("end");
	btn.SetTextSize(18);
	btn.name = list[i];
	btn.sequence = i;
	layHorizLst.AddChild(btn);
	
	btn.SetOnTouch(function(){
		if( tor.hz_index==this.sequence ) return;
		tor.last_listbtn = this.name;
		tor.SelectItemByIndex(this.sequence);
		setTimeout(horizCallback,0); 
		});
	
	var img = app.CreateImage(null,0.1,0.08);
	img.SetColor("#40ffffff");
	img.SetPosition( posWbase,(0.09/2)-(img.GetHeight()/2) );
	img.SetSize(1,-1,"px");
	if(i!=0) layHorizLst.AddChild(img);
	
	var layTmp = app.CreateLayout("linear","tcenter");
	layTmp.SetSize(1,h+0.002);
	layTmp.SetPosition(0,1-h);
	tor.AddChild(layTmp);
	
	eval( "tor.hz_m.x"+i+" = layTmp;" );
	}

tor.SelectItemByIndex = function(index){ //select a tab
	var w = this.hz_m.GetWidth()*index;
	this.hz_m.SetPosition( w,0.09-this.hz_m.GetHeight() );
	this.hz_index = index;
	
	var lgn = horizList.split(",").length;
		for( var i=0; i<lgn; i++ ) this.GetTabLayoutByIndex(i).Gone();
	this.GetTabLayoutByIndex(index).Show();
	}
tor.GetTabLayoutByIndex = function(index){ //get the tab layout
	var type = this.hz_m;
	return eval( "type.x"+index );
	}
tor.GetLastButton = function(p1){ //get the button sequence or object
	if( String(p1).indexOf("btn") > -1 ) return this.last_btn;
	else return this.last_btn.sequence;
	}
tor.GetLastItem = function(){ //last item touched (tab)
	return this.last_listbtn;
	}
tor.GetFreeHeight = function(){ //get what's left of the screen
	return this.ov_height;
	}
tor.GetLayout = function(){ //get layout if tabs are not used
	return this.bg_layout;
	}

tor.SelectItemByIndex(0);
layBg.SetPosition( 0,1-(h) );
h += 0.002;
layBg.SetSize(1,h);
tor.ov_height = h;

return tor;
}