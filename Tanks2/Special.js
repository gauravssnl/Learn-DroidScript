greeted=false;
laySplash=app.CreateLayout( "Linear","FillXY,HCenter,VCenter" );
laySplash.AddChild( app.CreateImage( "Img/S.jpg" ) );
dev=app.CreateText("",-1,-1,"multiline");
dev.SetHtml( "<b><big><I>SYMBROSON</I></big></b><br><small>by Alex</small>" );
dev.SetVisibility( "Hide" );dev.SetMargins( 0,-0.1 );
laySplash.AddChild( dev );laySplash.SetVisibility( "Hide" );
app.AddLayout( laySplash );laySplash.Animate( "FadeIn",ready,3000 );
function ready(){dev.SetVisibility("Show");setTimeout(hideSplash,2000)}
function hideSplash(){laySplash.Animate("FadeOut",showGame,1000)}
function Tell(){alert(text);kEnter.SetOnTouchDown(hidesb);sb.len=text.length;sb.n=0;showsb()}
function showsb(){if(!text[sb.n].indexOf("<Dlg>"))OnDlg();else{sb.txt.SetText(text[sb.n]);sb.Animate("SlideFromBottom")}sb.n++}
function hidesb() {sb.Animate("SlideToBottom",(sb.n<sb.len)?showsb:null);if(sb.n==sb.len) kEnter.SetOnTouchDown(canTalk)}
function hex(n) {return(0+(Math.round(n).toString(16))).slice(-2)}
function ranInt(v) {return Math.round(Math.random()*v)}
function deg(v) {return v*(180/Math.PI)}
function dist(a,b) {return Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2))}
function control(fa) {
	var btn= app.CreateLayout( "Absolute" );
	var a=app.CreateButton( fa.indexOf('[')?"[fa-arrow-"+fa.toLowerCase()+"]":fa,0.1,0.2,"fontawesome" );
	a.SetTextSize( 30 );
	a.SetBackColor( "#33000000" );
	btn.AddChild( a );
	var b= app.CreateImage( null,0.1,0.2 );
	b.Action=fa.indexOf('[')?fa:"Enter"
	if( b.Action=="Enter" ) b.SetOnTouchDown( makeBullet );
	else b.SetOnTouch( onKeys );
	btn.AddChild( b );
	return btn;
}
//alert(angle([0,0],[0,-1])+"\n"+angle([0,0],[1,0])+"\n"+angle([0,0],[0,1])+"\n"+angle([0,0],[-1,0]))
function angle(p1,p2) {
var a;
var x=p1[0]-p2[0], y=p1[1]-p2[1]
	if (x>0)
		if (y>0) a=360-deg(Math.atan2(x,y))
		else if (y<=0) a=180+deg(Math.atan2(x,-y))
  if (x<=0)
  	if (y>=0) a=deg(Math.atan2(-x,y))
		else if (y<0) a=180-deg(Math.atan2(-x,-y))
return a;
}