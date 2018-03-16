/*******************************************************************************
*                                                                              *
*                   ActionBar - mimics an Android ActionBar                    *
*                                                                              *
*******************************************************************************/

  var AppLogo  = 'Img/AndroidScript-Logo_64x64.png';
  var AppTitle = '(unknown)';                        // will be set in "OnStart"

  function OnStart() {
    AppTitle = app.GetAppName();
    
    Stage = app.CreateLayout('linear','vertical,fillxy'); // purposefully global
    app.AddLayout(Stage);       // may already be added right after construction

  /**** prepare an ActionBar ****/

    var ActionBar = app.CreateLayout('linear','vertical,fillx');
      ActionBar.SetBackColor('#FF222222');
      
      var ActionBar_LeftArea = app.CreateLayout('linear','horizontal,top,left,fillxy');
        var ActionBar_Icon = app.CreateImage('Img/PrevItem.png',-1,dpy(24));
          ActionBar_Icon.SetMargins(0,dpy(12),0,dpy(12));
        ActionBar_LeftArea.AddChild(ActionBar_Icon);
        
        var ActionBar_Logo = app.CreateImage(AppLogo,dpx(40),dpy(40));
          ActionBar_Logo.SetMargins(0,dpy(4),0,dpy(4));
        ActionBar_LeftArea.AddChild(ActionBar_Logo);
        
        var ActionBar_Title = app.CreateText(AppTitle,-1,dpy(40));
          ActionBar_Title.SetTextSize(18);
          ActionBar_Title.SetPadding(dpx(4),dpy(4),0,0);
          ActionBar_Title.SetMargins(dpx(4),dpy(4),0,dpy(4));
        ActionBar_LeftArea.AddChild(ActionBar_Title);
      ActionBar.AddChild(ActionBar_LeftArea);

      var ActionBar_Underline = app.CreateText('',-1,dpy(2),'fillx');
        ActionBar_Underline.SetBackColor('#FF181818');
      ActionBar.AddChild(ActionBar_Underline);
    Stage.AddChild(ActionBar);
    
  /**** the actual application should follow below ****/
  
    
  };

/**** resolution-independent sizes ****/

  DisplayDensity = app.GetScreenDensity();                // purposefully global
  DisplayWidth   = app.GetDisplayWidth();                                 // dto.
  DisplayHeight  = app.GetDisplayHeight();                                // dto.

  function dp (x) {
    return x*DisplayDensity/160;                         // from "dp"s to pixels
  };
  
  function dpx (x) {       // from "dp"s to AndroidScript's size-relative values
    return x*DisplayDensity/160/DisplayWidth;
  };
  
  function dpy (y) {       // from "dp"s to AndroidScript's size-relative values
    return y*DisplayDensity/160/DisplayHeight;
  };

//------------------------------------------------------------------------------
// GetAppPath    yields the specifier of the folder containing this application
//------------------------------------------------------------------------------

  app.GetAppPath = function GetAppPath () {
    return document.URL.slice(7);                     // i.e., without "file://"
  };

//------------------------------------------------------------------------------
// GetAppName                               yields the name of this application
//------------------------------------------------------------------------------

  app.GetAppName = function GetAppName () {
    var Result = document.URL.slice(7);               // i.e., without "file://"
      Result = Result.slice(app.GetPath().length+1);    // i.e., w/o leading "/"
    return Result.slice(0,Result.length-1);        // i.e., without trailing "/"
  };

//------------------------------------------------------------------------------
// LoadLocalScript      synchronously(!) loads (and runs) the given script file
//------------------------------------------------------------------------------

  app.LoadLocalScript = function LoadLocalScript (ScriptFileSpec) {
    if (ScriptFileSpec.charAt[0] !== '/') {
      ScriptFileSpec = app.GetAppPath() + ScriptFileSpec;
    };

    var ScriptSource  = app.ReadFile(ScriptFileSpec);
    var ScriptElement = document.createElement('script');
      ScriptElement.type  = 'application/javascript';
      ScriptElement.text  = ScriptSource;
      ScriptElement.defer = true;
    document.getElementsByTagName('head')[0].appendChild(ScriptElement);
  };
