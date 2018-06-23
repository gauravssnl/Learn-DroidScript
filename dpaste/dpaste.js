
curr= -1;

var WIDTH = app.GetScreenWidth();
var HEIGHT = app.GetScreenHeight();
poster = null;
expiry = null;
syntax = null;
formats = null;
saved = 0;
var SETTINGS_PATH, SYNTAX_PATH;
if( app.GetAppPath() == "/Assets" )  {
    SETTINGS_PATH = "/data/data/com.gauravssnl.dpaste/shared_prefs/settings.json";
     SYNTAX_PATH = "/data/data/com.gauravssnl.dpaste/shared_prefs/syntax.json";
    }
else {
    SETTINGS_PATH = "settings.json";
    SYNTAX_PATH = "syntax.json";
    }
function initialise()
{
	path = app.GetAppPath();
	//alert(path);
	syntax_data = '{"coffee-script": "CoffeeScript", "text": "Plain text", "tcl": "Tcl", "genshi": "Genshi", "csharp": "C#", "go": "Go", "trac-wiki": "MoinMoin/Trac wiki markup", "lasso": "Lasso", "xml": "XML", "console": "Bash/ksh/sh/zsh session", "fortran": "Fortran", "matlab": "Matlab", "ada": "Ada", "erlang": "Erlang", "dpatch": "Darcs patch", "dart": "Dart", "nginx": "nginx config", "python3": "Python 3", "bat": "Batchfile", "lighty": "Lighttpd config", "myghty": "Myghty", "d": "D", "perl6": "Perl 6", "js+erb": "JavaScript + Ruby", "fsharp": "FSharp", "cfm": "Coldfusion HTML", "apacheconf": "Apache config", "tex": "TeX", "modula2": "Modula-2", "html+django": "HTML + Django/Jinja template", "scala": "Scala", "applescript": "AppleScript", "lua": "Lua", "rb": "Ruby", "irc": "IRC logs", "xslt": "XSLT", "js": "JavaScript", "swift": "Swift", "bash": "Bash/ksh/sh/zsh", "c": "C", "vb.net": "VB.net", "ocaml": "OCaml", "jsp": "JavaServer pages", "pytb": "Python 2 traceback", "clojure": "Clojure", "Clipper": "FoxPro", "ragel": "Ragel", "smarty": "Smarty template", "haskell": "Haskell", "puppet": "Puppet", "apl": "APL", "diff": "Diff", "js+django": "JavaScript + Django/Jinja template", "rbcon": "Ruby irb session", "pycon": "Python console session", "java": "Java", "yaml": "YAML", "perl": "Perl", "json": "JSON", "common-lisp": "Common Lisp", "groff": "Groff", "rhtml": "RHTML", "html+php": "HTML + PHP", "python": "Python 2", "js+php": "JavaScript + PHP", "factor": "Factor", "rst": "reStructuredText", "groovy": "Groovy", "scheme": "Scheme", "bbcode": "BBCode", "objective-c": "Objective-C", "dtd": "DTD", "erb": "ERB", "powershell": "PowerShell", "rust": "Rust", "prolog": "Prolog", "postscript": "PostScript", "as": "ActionScript", "cobol": "COBOL", "ini": "INI", "io": "Io", "haml": "Haml", "smalltalk": "Smalltalk", "mako": "Mako", "py3tb": "Python 3 traceback", "make": "Makefile", "mathematica": "Mathematica", "sourceslist": "Debian sourcelist", "html": "HTML", "css": "CSS", "llvm": "LLVM", "eiffel": "Eiffel", "awk": "Awk", "sql": "SQL", "php": "PHP", "scss": "SCSS", "dylan": "Dylan", "sparql": "SPARQL", "sass": "Sass", "django": "text + Django/Jinja template", "cpp": "C++", "delphi": "Delphi"}';
	settings_data ='{"poster":"Anonymous","expiry_days":"365","syntax":"js"}';
	//alert( app.FileExists( path+ "/syntax.json" ));
  //alert( app.FileExists(path + "/settings.json" ));
  if(!app.FileExists(SYNTAX_PATH))
    app.WriteFile( SYNTAX_PATH, syntax_data );
  if( !app.FileExists(SETTINGS_PATH))
    app.WriteFile( SETTINGS_PATH, settings_data );
}

initialise();
function OnStart()
{
	for (;;) {
		var lay = app.CreateLayout("Linear");
		lay.SetVisibility('Hide');
		app.AddLayout(lay);
		var b = app.CreateButton();
		lay.AddChild(b);
		var t = app.CreateText();
		lay.AddChild(t);
		app.Wait(0.05);
		var h = +b.GetHeight();
		var ht = +t.GetHeight();
		app.DestroyLayout(lay);
		if (h) break;
	}
	BTN_HEIGHT = h;
	TXT_HEIGHT = ht;
	
	 curr = 1;
	app.SetOrientation( "portrait" );
  app.EnableBackKey( false);
	layMain = app.CreateLayout( "Linear", "Vertical" );
	layMain.SetBackGradient( "#eeeeee", "#ffffff");
	layT = app.CreateLayout( "Linear", "Horizontal,FillX,vcenter" );
	layT.SetBackGradient( "blue", "blue");
	layMain.AddChild( layT );
	var wBtn = BTN_HEIGHT*HEIGHT/WIDTH;
	sideBtn = app.CreateButton( "[fa-list]", -1, -1,"fontawesome,Custom" );
	sideBtn.SetSize(wBtn, BTN_HEIGHT);
	sideBtn.SetTextSize(BTN_HEIGHT*HEIGHT/2, 'px');
	sideBtn.SetOnTouch( sideBtn_OnTouch );
	sideBtn.SetStyle("blue", "blue");
	layT.AddChild( sideBtn );
	title = app.CreateText( app.GetAppName(), 1-wBtn,  -1, "fontawesome,Center" );
	title.SetTextSize( 25 );
	layT.AddChild( title );
	layT.SetSize( 1, 0.08);
	
	var layBody = app.CreateLayout('linear',"FillX");
	layBody.SetSize(1, 1-BTN_HEIGHT*2-TXT_HEIGHT);
	layMain.AddChild(layBody);
	pt = app.CreateText( "Enter Title:", 1,-1,"Left");
	pt.SetTextSize( 20 );
	pt.SetTextColor( "Red" );
	layBody.AddChild( pt);
	ptEdit = app.CreateTextEdit( "",1,-1 );
	ptEdit.SetTextColor( "Black" );
	layBody.AddChild( ptEdit );
	ptEdit.SetSize( 1, 0.06);
	txt1 = app.CreateText( "Enter  code/ text:", 1,-1,"Left");
	txt1.SetTextSize( 20 );
	txt1.SetTextColor( "Red" );
	layBody.AddChild( txt1 );
	txtEdit = app.CreateTextEdit( "",1,-1 );
	txtEdit.SetTextColor( "Black" );
	layBody.AddChild( txtEdit );
	txtEdit.SetSize( 1, 0.55);
	
	
/*	txt3 = app.CreateText( "Result :" ,1, -1,"Left");
	txt3.SetTextSize( 20 );
	txt3.SetTextColor( "Red" );
	layBody.AddChild( txt3 );
	txt3.Hide();
	resultEdit = app.CreateTextEdit( "" ,1,-1,"NoKeyBoard");
	resultEdit.SetTextColor( "Black" );
	layBody.AddChild( resultEdit );
	resultEdit.Hide(); 
	*/
//	initialise();
	laySpin = app.CreateLayout( "Linear", "Horizontal,FillX" );
	layBody.AddChild( laySpin );
	spin_text = app.CreateText( "Syntax Format" , 0.5,-1, "Left");
	spin_text.SetTextColor( "red" );
	spin_text.SetTextSize( 20 );
	laySpin.AddChild( spin_text );
	formats = null;
	try {
	  formats = JSON.parse( app.ReadFile(SYNTAX_PATH));
	  formats_keys = Object.keys(formats);
	  formats_values = Object.values(formats);
	  settings = JSON.parse(app.ReadFile(SETTINGS_PATH));
	  poster = settings["poster"];
	  expiry = settings["expiry_days"];
	  syntax = settings["syntax"];
	  
	}
	catch(e) {
	  alert(e);
	}
	spin = app.CreateSpinner( formats_values, 0.5);
	spin.SetTextColor( "red" );
	spin.SelectItem(formats[syntax]);
	spin.SetOnChange(save_syntax);
	laySpin.AddChild( spin );
	layB = app.CreateLayout( "Linear", "Horizontal,FillXY" );
	createBtn = app.CreateButton( "Create", 1/2,-1, "Custom,FontAwesome");
	createBtn.SetStyle( "blue", "blue" );
	createBtn.SetOnTouch( createBtn_OnTouch );
  layB.AddChild( createBtn );
	clearBtn = app.CreateButton( "Clear",1/2,-1 ,"FontAwesome,Custom");
	clearBtn.SetStyle( "blue", "blue" );
	clearBtn.SetOnTouch(clear);

	layB.AddChild( clearBtn );
	devBtn = app.CreateButton( "About",1/3,-1 );
//	layB.AddChild( devBtn );
	layMain.AddChild( layB );
	devText = app.CreateText( "Developer:  gauravssnl" );
	devText.SetTextColor( "#ff0000" );
//	devText.	SetOnTouch( dev_OnTouch );
	
	layMain.AddChild( devText );
	
	app.AddLayout( layMain );
	createDrawer();
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
}

function dev_OnTouch()
{
	app.ShowPopup( "Developer: gauravssnl.\n" + app.GetAppName() + "App." );
}



function OnBack()
{ 
  if(curr == 1)
   {
    curr = -1;
   app.ShowPopup( "Press Back Key again to exit" );
    app.EnableBackKey( true );
    }
   
	
}


function createDrawer()
{
	drawerWidth = 0.75
	drawerScroll = app.CreateScroller( drawerWidth,1  );
	drawerScroll.SetBackColor( "#ffffff" );
	layDrawer= app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawerTop.SetBackGradient( "#0000ff", "#0000ff" );
	layDrawer.AddChild( layDrawerTop );
	
	img = app.CreateImage( "Img/" + app.GetAppName()+ ".png", 0.15);
	img.SetPosition( drawerWidth * 0.06 ,0.04 );
	layDrawerTop.AddChild( img );
	
	appt =  app.CreateText( app.GetAppName(),-1,-1, "Bold");
	appt.SetPosition( drawerWidth * 0.3,  0.04 );
	appt.SetTextSize(21,  "dip");
	layDrawerTop.AddChild( appt );
	
	dev = app.CreateText( "gauravssnl" );
	dev.SetPosition( drawerWidth*0.07, 0.155 );
	dev.SetTextColor( "#22ff22" );
	dev.SetTextSize( 18, "dip" );
	layDrawerTop.AddChild( dev );
	email = app.CreateText( "gaurav.ssnl@gmail.com" );
	email.SetPosition( drawerWidth * 0.07, 0.185 );
	email.SetTextColor( "Black" );
	layDrawerTop.AddChild( email );
	
	layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	lstdata = "About:: [fa-info-circle] ,Feedback:: [fa-pencil], Settings:: [fa-cog]";
	listMenu1 = app.CreateList(lstdata, drawerWidth, -1 ,"Menu,Expand");
	listMenu1.SetOnTouch( listMenu_OnTouch );
	
	layMenu.AddChild( listMenu1 );
	//Add seperator to menu layout.
    var sep = app.CreateImage( null, drawerWidth,0.001,"fix", 2,2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#cccccc" );
    layMenu.AddChild( sep );
    
    drawer_msg = "Share your codes with others easily on <a href = dpaste.com>dpaste.com";
    drawer_text = app.CreateText( drawer_msg,  drawerWidth, 0.4, "Left,MultiLine, Html,Link");
    drawer_text.SetTextSize( 17 );
     drawer_text.SetTextColor( "black" );
     layMenu.AddChild( drawer_text );
	
}


function listMenu_OnTouch(title, body, type, index)
{
   app.CloseDrawer(  );
   if(this == listMenu1)
   {
      if(title == "About") about();
      else if(title == "Feedback") feedback();
      else if(title == "Settings") Settings();
   }
}

function about()
{
	dlg = app.CreateDialog( "About" );
	layDlg = app.CreateLayout( "Linear", "Vertical,Center" );
	layDlg.SetBackGradient( "#eeeeee", "#ffffff" );
	layDlg.SetSize( 0.9,0.4);
	dlg.AddLayout( layDlg );
	msg= app.GetAppName()+ " App  by <a href= https://gauravssnl.wordpress.com>gauravssnl</a><br/>E-mail: <a href= mailto:gaurav.ssnl@gmail.com?subject=LocateMeApp> gaurav.ssnl@gmail.com</a><br/>" +
	"This app can be used for creating paste on <a href=dpaste.com> dpaste.com</a><br/><br/>DroidScript(JavaScript) has been used to develop this App.<br/>" +
	"Thanks to author of dpaste: <br>Paul Bissex  <a href = https://mobile.twitter.com/pbx?lang=en> @pbx";
	txt = app.CreateText( msg ,0.9, -1,"MultiLine,html,link");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.0,0.0,0.0,0.0 );
	layDlg.AddChild( txt );
	dlg.Show();
}

function feedback()
{
	app.OpenUrl( "mailto:gaurav.ssnl@gmail.com?subject=" + app.GetAppName() +"App");
}


function sideBtn_OnTouch()
{
	 app.OpenDrawer( "Left" );
}

function btn_OnTouch()
{
	
}
function clear()
{
  ptEdit.SetText("" );
	txtEdit.SetText( "");
}

function Settings()
{
   try {
	  formats = JSON.parse( app.ReadFile(SYNTAX_PATH));
	  formats_keys = Object.keys(formats);
	  formats_values = Object.values(formats);
	  settings = JSON.parse(app.ReadFile(SETTINGS_PATH));
	  poster = settings["poster"];
	  expiry = settings["expiry_days"];
	  syntax = settings["syntax"];
	  
	}
	catch(e) {
	  alert(e);
	  }
  dlg = app.CreateDialog( "Settings" );
	layDlg = app.CreateLayout( "Linear", "Vertical,FillXY" );
	layDlg.SetBackGradient( "#eeeeee", "#ffffff" );
	layDlg.SetSize( 0.9,0.5);
	dlg.AddLayout( layDlg );
	txt = app.CreateText( "Poster Name:" ,0.9, 0.1,"Left");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.0,0.0,0.0,0.0 );
	layDlg.AddChild( txt );
	poster_edit = app.CreateTextEdit( poster,0.9,0.1);
	poster_edit.SetTextColor( "#000000" );
	layDlg.AddChild( poster_edit );
	layE = app.CreateLayout( "Linear", "Horizontal,FillX" );
	layDlg.AddChild( layE );
	expiry_txt = app.CreateText( "Expiry Days:", 0.5,0.1, "FillX");
	expiry_txt.SetTextSize( 20 );
  expiry_txt.SetTextColor( "#ff0000" );
expiry_txt.SetPadding( 0.0,0.0,0.0,0.0 );
	layE.AddChild( expiry_txt );
	expiry_edit = app.CreateTextEdit( expiry,0.5,0.1,"Number");
	expiry_edit.SetTextColor( "#000000" );
	layE.AddChild( expiry_edit );
	
  layB = app.CreateLayout( "Linear", "Horizontal,FillX,Bottom" );
  save_btn = app.CreateButton( "Save" ,0.45, -1, "FontAwesome,Custom");
  save_btn.SetOnTouch( save_btn_OnTouch );
  layB.AddChild( save_btn );
  cancel_btn = app.CreateButton( "Cancel" ,0.45, -1,"FontAwesome,Custom");
  cancel_btn.SetOnTouch( cancel_btn_OnTouch );
  layB.AddChild( cancel_btn );
  layDlg.AddChild(layB);
  
	dlg.Show();
	
}

function save_btn_OnTouch()
{
	pname = poster_edit.GetText();
	expval = expiry_edit.GetText();
	if(pname && expval)
	{ 
	  var o = {};
	  o["poster"] = pname;
	  o["expiry_days"] = expval;
	  o["syntax"] = syntax;
	  
	  if(expval > 365) expval = 365;
	  app.WriteFile( SETTINGS_PATH, 
	   JSON.stringify(o)
	   );
	   app.ShowPopup( "Settings Saved" ,"Short");
	    dlg.Hide();
	}
}

function cancel_btn_OnTouch()
{
	dlg.Hide();
}
function save_syntax()
{
  try {
	  formats = JSON.parse( app.ReadFile(SYNTAX_PATH));
	  formats_keys = Object.keys(formats);
	  formats_values = Object.values(formats);
	  settings = JSON.parse(app.ReadFile(SETTINGS_PATH));
	 poster = settings["poster"];
	  expiry = settings["expiry_days"];
	  syntax = settings["syntax"];
	  
	}
	catch(e) {
	  alert(e);
	  }
	  spinval = spin.GetText();
	  //alert(spinval);
	  if( spinval != settings[syntax]) {
	  for(k in formats) 
	  {
	    if(formats[k] == spinval) 
	    {  
	      syntax = k;
	      settings["syntax"] = k;
	      app.WriteFile( SETTINGS_PATH, 
	   JSON.stringify(settings)
	   );
	   if(saved)  app.ShowPopup("Syntax saved", "Short");   
	   saved = 1;
	    }
	  }
	}
}

function createBtn_OnTouch()
{
	post_title = ptEdit.GetText();
	code_text = txtEdit.GetText();
	
	
	if( post_title && code_text) {
	
	try {
	  settings = JSON.parse(app.ReadFile(SETTINGS_PATH));
	  poster = settings["poster"];
	  expiry = settings["expiry_days"];
	  syntax = settings["syntax"];
	  
	}
	catch(e) {
	  alert(e);
	  }
	  //alert(code_text);
	  req = new XMLHttpRequest();
	  // URL should end with '/' , otherwise error is encountered
	  url = "http://dpaste.com/api/v2/";
	  /*
	  params = `poster=${poster}&syntax=${syntax}&expiry_days=${expiry}&content=${code_text}` ;
	  params = encodeURI(params);
	  alert(params);
	  */
	  makeParameters = function (poster, syntax, expiry, code_text)
{
	return {
	 poster,
	 syntax,
	 expiry_days: expiry,
	 content: code_text
	};
} ;

  parameters = makeParameters(poster, syntax, expiry, code_text);
  //alert(Object.keys(parameters));

   urlEncodedData = "";
   urlEncodedDataPairs = [ ];
	 for(name in parameters) {
	   urlEncodedDataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(parameters[name]));
	   
	 }
	// alert(urlEncodedDataPairs);
	 urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
	  req.open("POST", url, true);
	  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  req.send(urlEncodedData, true);
	  req.onload = function ()
{
	if(req.status==201)
	{
	 pasteUrl = req.responseText
	 app.SetClipboardText( pasteUrl );
	 app.ShowPopup( "Paste Created.Paste URL : " + pasteUrl + "Paste URL copied to clipboard",   "Long" );
	 //app.ShowPopup( "Paste URL copied to ClipBoard" );
	 app.OpenUrl( pasteUrl );
	}
	else
	alert(req.response);
}

//app.HttpRequest( "POST", url, "/v2/", params, handle);
 }
 
}

function handle(error,response)
{ if(!error)
	alert(response);
	else
	alert(error);
}