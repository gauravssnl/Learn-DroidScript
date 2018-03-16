var funcs = "";

//Called when application is started.
function OnStart()
{
  var wait = setTheme();
  //load all plugins
  var privFldr = app.GetPrivateFolder( "Plugins" );
  var plgins = app.ListFolder(privFldr,null,null,"alphaSort");
  plgins.forEach(function(p)
  {
      var incName = app.ListFolder( privFldr+"/"+p, ".inc", 1 )[0];
			if( incName ) 
			{
    			var plugTitle = incName.split(".")[0];
         app.LoadPlugin(plugTitle)
      }
  })

  var lay = app.CreateLayout("linear", "VCenter,FillXY");

  // user enters valid code to create object
  var edt = app.CreateTextEdit('app.CreateCodeEdit()');
  edt.SetHint("Object");
  lay.AddChild(edt);

  var btnOk = app.CreateButton("Ok");
  btnOk.SetOnTouch(btnOk_OnTouch);
  btnOk.edt = edt;
  lay.AddChild(btnOk);

  app.AddLayout(lay);
}

function btnOk_OnTouch()
{
  var ctrl = eval(this.edt.GetText());

  var name = ctrl.GetType ? ctrl.GetType() : this.edt.GetText();
  var functionList = [];
  var functions = [];
  for(var Key in ctrl)
  {
    if(ctrl.hasOwnProperty(Key) && (typeof ctrl[Key] === 'function'))
    {
      var func = String(ctrl[Key]);
      var pos = func.indexOf(")") + 1;
      func = func.slice(8, pos);
      functions.push(name + "." + Key + func);
      functionList.push(Key);
    }
  }
  functions.sort();

  funcs = functions.join("\n");
  
  var yesno = app.CreateYesNoDialog("COPY TO CLIPBOARD?\n\n"+funcs, "showNow");
  yesno.SetOnTouch(yesno_OnTouch);
}

function yesno_OnTouch(val)
{
  if(val == "Yes")
  {
    app.SetClipboardText(funcs);
    app.ShowPopup("Copied to clipboard");
  }
  app.Exit();
}

function setTheme(themeName)
{
  themeName = themeName || "sjgLightBlue";
  var theme;
  if(themeName == "sjgLightBlue")
  {
    theme = app.CreateTheme("Light");
    theme.AdjustColor(35, 0, -10);
    theme.SetBackColor("#ffddffff");
    //theme.SetBackground ( file,options )
    theme.SetBtnTextColor("#ffddffff");
    theme.SetButtonOptions("custom");
    theme.SetButtonStyle("#4285F4", "#2265d4", 2, "#999999", 0, 1, "#ff9000");
    theme.SetCheckBoxOptions("dark");
    theme.SetTextEditOptions("underline");
    theme.SetDialogColor("#ffddffff");
    theme.SetDialogBtnColor("#ffcceeee");
    theme.SetDialogBtnTxtColor("#ff446666");
    theme.SetDimBehind(false);
    theme.SetProgressBackColor("#cc4285f4");
    theme.SetProgressTextColor("#ddffff");
    //theme.SetTextEditOptions ( options );
    theme.SetTitleHeight(42);
    theme.SetTitleColor("#ff668888");
    theme.SetTitleDividerColor("#ff0099CC");
    theme.SetTextColor("#ff446666");
    app.SetTheme(theme);
  }
  return 0;
}