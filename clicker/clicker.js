
function dpy(y) {
    return y*app.GetScreenDensity()/160/app.GetDisplayHeight();}
  
function dpx(x) {
    return x*app.GetScreenDensity()/160/app.GetDisplayWidth();}

var m = app.LoadNumber("number", 0);
var x = app.LoadNumber("x", 1);
function OnStart(){
  theme = app.CreateTheme( "Theme" );
        theme.AdjustColor( -30, 0, 0 );
        theme.SetBackground( "/Res/drawable/pattern_carbon", "repeat" );
        theme.SetButtonOptions( "custom" );
        theme.SetButtonStyle( "#353535","#161616", 4,"#222222",1,1,"#00E1B6" );
        theme.SetBtnTextColor( "#bbffffff" );
        theme.SetBackColor( "#99000000" );
        theme.SetTextColor( "#bbffffff" );
        theme.SetDialogBtnColor( "#ff222222" );
        theme.SetDialogBtnTxtColor( "#ffffff" );
        theme.SetTitleHeight( 42 );
        app.SetTheme( theme );
  snd = app.CreateMediaPlayer();
  snd.SetFile( "Snd/money.mp3" );
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
  
  layb = app.CreateLayout( "Linear", "Horizontal" );
  lay.AddChild( layb );
  
  but1 = app.CreateButton( "Сбросить", 0.3,0.1);
  but1.SetOnTouch( but1On );
  layb.AddChild( but1 );
  
  but2 = app.CreateButton( "Магазин", 0.3, 0.1 );
  but2.SetOnTouch( but2On );
  layb.AddChild( but2 );
  
  txt = app.CreateText( m + "$" );
  txt.SetTextSize( 36 );
  txt.SetMargins( 0, dpy(50), 0, dpy(50) );
  lay.AddChild( txt );
  
  coin = app.CreateButton(x, dpx(250), dpy(250));
  coin.SetTextSize(100);
  
  coin.SetStyle("#F89C27","#F8BB2B",1000,"#F8BB2B",7,0);
  coin.SetOnTouch(coinOn);
  lay.AddChild(coin);
  
  app.AddLayout( lay );
}

function newX(){
    x++
    coin.SetText(x);
    app.SaveNumber("x", x);
}

function but1On(){
	if( confirm("Сбросить?")==true){m=0; set();}
}

function but2On(){
	mag = app.CreateLayout( "Linear", "Vertical,FillXY" );
	mag.SetBackColor( "#7B000000" );
	mag.Hide();
	
	magnav = app.CreateLayout( "Absolute", "" );
	magnav.SetBackGradient( "#353535","#161616" );
	magnav.SetSize( 1, dpy(50) );
	mag.AddChild( magnav );
	
	butn = app.CreateButton( "Назад", -1, dpy(55));
	butn.SetOnTouch( butnOn );
	magnav.AddChild( butn );

	magt = app.CreateText( "Магазин", 1, dpy(50) );
	magt.SetPosition( 0, dpy(12.5));
	magt.SetTouchable( false );
	magt.SetTextSize( 16 );
	magnav.AddChild( magt );
	
  magscroll = app.CreateScroller(1, 1-dpy(50));
  mag.AddChild( magscroll );
  
  magl = app.CreateLayout( "Linear", "Vertical" );
  magscroll.AddChild( magl );
  
  app.AddLayout( mag );
  mag.Animate("FadeIn");
  
  mb = [];
  Add("коэффициент", 50, newX);
  Add("свой цвет монеты", 1000);
}

function Add(text, cost, fun){
  var bml = app.CreateLayout("Linear", "Horizontal");
  var bm = app.CreateButton(text+"\nЦена "+cost, 1, dpy(100));
  bm.SetTextSize(24);
  bml.AddChild(bm);
  bm.cost = cost
  bm.SetOnTouch(function(){
	if(this.cost<=m){
	  m-=this.cost
	  set();
	  fun();
	}
  });
  bml.Hide();
  magl.AddChild(bml);
  bml.Animate("FadeIn");
  mb.push(bm);
}

function butnOn(){
  mag.Animate("FadeOut");
  app.DestroyLayout(mag);
}

function coinOn(){
  snd.Play(0);
  m+=x
  set();
}

function set(){
  txt.SetText( m + "$" );
  app.SaveNumber( "number", m );
}