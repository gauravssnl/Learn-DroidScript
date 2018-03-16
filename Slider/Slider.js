
function OnStart()
{
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );
	lay.SetBackColor("#ffffff");

	var files = "Img/Image1.jpg,Img/Image2.jpg,Img/Image3.jpg,Img/Image4.jpg,Img/Image5.jpg";
	
	imgTnt = app.CreateImageTent(files,"horizontal","fuXll");
	lay.AddChild(imgTnt);
	
	/*imgTnt = app.CreateImageTent(files,"horizoXntal","fuXll");
	imgTnt.SetMargins(0,0.03);
	lay.AddChild(imgTnt);*/
	
	app.AddLayout( lay );
}

// circle | circle-o | dot-circle-o
// chevron- | caret-

app.CreateImageTent = function(images,type,options)
{
var tor = app.CreateLayout("absolute","touchspy");
//tor.SetOnTouchDown(function(){this.NextImage();});
tor.SetSize(1,0.35);
tor.SetBackColor("#ffffff");

var isHoriz = (type=="horizontal");

var laymr = app.CreateLayout("linear",isHoriz?"vcenter,horizontal":"vcenter");
laymr.SetPosition(isHoriz?0:-0.005,isHoriz?0.32:0);
laymr.SetSize(isHoriz?1:0.08,isHoriz?-1:0.35);
tor.AddChild(laymr);

var list = images.split(",");

for( var i=0; i<list.length; i++ ) {
	var txt = app.CreateText("[fa-circle-o]",0.06,-1,"fontAwesome");
	txt.SetTextSize(13);
	txt.SetTextColor("#000000");
	txt.SetTextShadow(4,0.5,0.55,"#50000000");
	laymr.AddChild(txt);
	
	eval( "tor.txt"+i+" = txt;" );
	
	var laybg = app.CreateLayout("linear");
	tor.AddChild(laybg);
	laybg.Hide();
		
	eval( "tor.lay"+i+" = laybg;" );
	
	var w = -1; var h = 0.35;
	if( options.indexOf("full") > -1 ){w = 1; h = -1;}
	
	var img = app.CreateImage(list[i],w,h);
	laybg.AddChild(img);
	
	laybg.SetPosition( (1/2)-(img.GetWidth()/2),(0.35/2)-(img.GetHeight()/2) );
	}
	
tor.ChildToFront(laymr);
	
tor.ShowImage = function(index){
	var type = this;
	
	var func = function(){
		eval( "type.lay"+index ).Animate(isHoriz?"FadeIn":"SlideFromBottom");
		for( var i=0; i<images.split(",").length; i++ ) eval( "type.txt"+i ).SetText(i==index?"[fa-circle]":"[fa-circle-o]");
		type.current_index = index;
		}
		
	if(type.current_index!=undefined) {eval( "type.lay"+type.current_index ).Animate(isHoriz?"FadeOut":"SlideToTop",function(){setTimeout(func,0);});}
	else setTimeout(func,0);
	}
tor.NextImage = function(){
	var lgn = images.split(",").length-1;
	var next = this.current_index+1;
		if( next>lgn ) next = 0;
		if( lgn==0 ) return;
	this.ShowImage(next);
	}
tor.PrevImage = function(){
	var lgn = images.split(",").length-1;
	var next = this.current_index-1;
		if( next==-1 ) next = lgn;
		if( lgn==0 ) return;
	this.ShowImage(next);
	}

tor.ShowImage(0);
setInterval(function(){tor.NextImage(0);},3000);

return tor;
}