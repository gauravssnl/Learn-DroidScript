var aide = "/sdcard/AppProjects";

function OnStart()
{
    app.EnableBackKey(false);

	// Build Project
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );        lay.SetVisibility('Hide');
    var projects = app.ListFolder("/sdcard/AppProjects").join(",");
    projects = "Choose AIDE project...," + projects;
    
    // remove the .nomedia file from the list
    projects = projects.replace(",.nomedia", "");
    
    spin = app.CreateSpinner( projects, 0.75 );
    spin.SetOnTouch( spin_OnChange );
    lay.AddChild( spin );
        
    btn = app.CreateButton( "Build/Install Plugin" );
    btn.SetOnTouch( btn_OnTouch );
    btn.SetTextSize( 20 );
    btn.SetTextColor ("#0099CC");
    btn.SetMargins( 0, 0.1, 0, 0 );
    lay.AddChild( btn );
    
    app.AddLayout( lay );

    // Create Project
    lay2 = app.CreateLayout( "Linear", "VCenter,FillXY" );
    lay2.SetVisibility('Hide');
    PlgTxt = app.CreateText("Plugin Name:", -1, -1, "Bold");
    lay2.AddChild(PlgTxt);
    PlgTxt.SetTextSize( 20 );
    PlgTxt.SetTextColor ("#0099CC");

    PlgEdt = app.CreateTextEdit("", 0.75, -1, "NoSpell,MonoSpace,SingleLine");
    PlgEdt.SetHint("MyPlugin");
    lay2.AddChild(PlgEdt);

    PkgTxt = app.CreateText("Individual/Company Name:", -1, -1, "Bold");
    PkgTxt.SetTextSize( 20 );
    PkgTxt.SetTextColor ("#0099CC");
    PkgTxt.SetMargins( 0, 0.03, 0, 0 );
    lay2.AddChild(PkgTxt)

    PkgEdt = app.CreateTextEdit("", 0.75, -1, "NoSpell,MonoSpace,SingleLine");
    PkgEdt.SetHint("mycompany");

    if( app.FileExists('company.txt') )
    {
    var com = app.ReadFile('company.txt');
    PkgEdt.SetText(com);
    }

    lay2.AddChild(PkgEdt);
    
    chkMin = app.CreateCheckBox( "Use Minimalistic Template" );
    chkMin.SetMargins( 0, 0.05, 0, 0 );
//	chkMin.SetChecked(true);
	lay2.AddChild( chkMin );
    
    btn2 = app.CreateButton("Create Plugin Template");
    btn2.SetOnTouch(_createProject);
    btn2.SetTextSize( 20 );
    btn2.SetTextColor ("#0099CC");
    btn2.SetMargins( 0, 0.1, 0, 0 );
    lay2.AddChild(btn2);

    app.AddLayout( lay2 );

	sHtml = app.ReadFile('Help.html');
    lay3 = app.CreateLayout( "Linear", "FillXY" );
    lay3.SetVisibility('Hide');
	Scroller = app.CreateScroller( 1.0, 1.0 ); 
    HelpTxt = app.CreateText(sHtml, 1.0, -1,"MultiLine,Left,Html");
    HelpTxt.SetTextSize( 20 );
    HelpTxt.SetPadding( 0.02, 0.02, 0.02, 0.02 );
    Scroller.AddChild(HelpTxt);
    lay3.AddChild(Scroller);
    
    app.AddLayout( lay3 );

    menu = app.CreateDialog("AIDE DroidScript Plugin Gen", "NoCancel" );
    
    var layDlg = app.CreateLayout( "linear", "vertical,fillxy,left" );
    layDlg.SetPadding( 0.02, 0.02, 0.02, 0.02 );
    menu.AddLayout( layDlg );

    var lstDlg = app.CreateList( "Create New DS Plugin:Create AIDE Project Directory and Files:null,Build DS Plugin Zip:After AIDE Build/Compile^c^ Zip and Install Plugin:null, Help:Quick Guide to Create a Plugin in AIDE:null,Exit:Exit AIDE DS Plugin Gen:null", -1, -1);
    lstDlg.SetTextSize( 22 );
    lstDlg.SetOnTouch( OnMenu );
    layDlg.AddChild( lstDlg );
    menu.Show();
}

function _h() {
lay.SetVisibility('Hide');
lay2.SetVisibility('Hide');
lay3.SetVisibility('Hide');
}

function OnMenu( item )
{    
    menu.Hide(); 
    if(item === undefined) { _h(); return menu.Show(); }

    switch(item) 
    { 
      case "Exit": app.Exit(); break;
      case "Create New DS Plugin": CreateProject(); break;
      case "Build DS Plugin Zip": BuildPlugin(); break;
      case "Help": ShowHelp(); break;
    } 
}

function OnBack() { _h(); menu.Show(); }

function NoAIDE() {
alert('You must have the AIDE app installed.');
menu.Show();	
}

function BuildPlugin()
{
_h();
if( !app.FolderExists(aide) ) { return NoAIDE(); }
lay.Animate( "SlideFromRight" );
}

function CreateProject()
{
_h();
if( !app.FolderExists(aide) ) { return NoAIDE(); }
lay2.Animate( "SlideFromLeft" );
PlgEdt.Focus(); 
app.ShowKeyboard(PlgEdt);
}

function ShowHelp()
{
_h();lay3.Animate( "SlideFromBottom" );
}

function AddFolder( zip, name, fldr )
{
    var list = app.ListFolder( fldr,"",0,"alphasort" );
    for( var i=0; i<list.length; i++ )
    {
        var title = list[i];
        if( !app.IsFolder( fldr+"/"+title ) )
            zip.AddFile( name+title, fldr+"/"+title );
        else
            AddFolder( zip, title+"/", fldr+"/"+title );
    }
}

function spin_OnChange( item )
{}

function createJar()
{
    var plugin = spin.GetText();
    
    var folder = "/sdcard/AppProjects/" + plugin;
    
    var classesdex = folder + "/bin/classes.dex";
    
    if( app.FileExists(classesdex) )
    {    
        var zipper = app.CreateZipUtil();

        zipper.Create( folder + "/plugin/" + plugin + ".jar" );
        
        zipper.AddFile( "classes.dex", classesdex);
        
        zipper.Close();
        
        return true;
    }
    else
    {
        app.ShowPopup( "Cannot find classes.dex" );
    }
    
    return false;
}

function installPlugin()
{
    var plugin = spin.GetText();
    
    var folder = "/sdcard/AppProjects/" + plugin;
    
    if( !app.FolderExists("/sdcard/DroidScript/Plugins") )
    {
        app.MakeFolder("/sdcard/DroidScript/Plugins");
    }
    
    app.CopyFile( folder + "/" + plugin + ".zip", "/sdcard/DroidScript/Plugins/" + plugin + ".zip" );
    
    app.ShowPopup("Please restart DroidScript to install the plugin");
}

function btn_OnTouch()
{
    var plugin = spin.GetText();
    
    var folder = "/sdcard/AppProjects/" + plugin;
    
    if( app.FolderExists(folder + "/plugin") )
    {    
        if( createJar() )
        {
            var zipper = app.CreateZipUtil();
            var filesToZip = folder + "/plugin";
            zipper.Create( folder + "/" + plugin + ".zip" );
            app.ShowProgress( "Zipping " + plugin + " Package..." );
             AddFolder( zipper, "", filesToZip );
             app.HideProgress();            
            zipper.Close();
            
            installPlugin();
        }
    }
    else
    {
        app.ShowPopup( "Cannot find plugin files" );
    }
}

function _createProject()
{
var sPname =  PlgEdt.GetText();
if (sPname === '') { return app.ShowPopup('Missing Plugin Name','Bottom,Short'); }
var sPkg =  PkgEdt.GetText();
if (sPkg === '') { return app.ShowPopup('Missing Individual/Company Name','Bottom,Short'); }
var sPackage = 'com.'+sPkg.toLowerCase()+'.plugins.user';
var fldr = aide+'/'+sPname;
if( app.FolderExists(fldr) ) { return alert(sPname+" project directory exists.  You must pick a different plugin name or delete this folder: \n\n"+fldr); }
var srcFiles = 'plugin_files/';
var sAdd = (chkMin.GetChecked()) ? '_' : '';

app.WriteFile('company.txt', sPkg);

app.ShowProgress( "Creating Plugin Project..." );
app.MakeFolder(fldr);
app.MakeFolder(fldr+'/libs');
app.MakeFolder(fldr+'/plugin');
app.MakeFolder(fldr+'/res');
app.MakeFolder(fldr+'/res/drawable');

var src = fldr+'/src';
app.MakeFolder(src);
var aP = sPackage.split('.');
aP.forEach(function (item) {
src += '/'+item;
app.MakeFolder(src);
});

var java = app.ReadFile(srcFiles+sAdd+'MyPlugin.java');
java = replaceAll(java,'%PACKAGENAME%', sPackage);
java = replaceAll(java,'%PLUGINNAME%', sPname);
app.WriteFile(src+'/'+sPname+'.java', java);

var inc = app.ReadFile(srcFiles+sAdd+'MyPlugin.inc');
inc = replaceAll(inc,'%PACKAGENAME%', sPackage);
inc = replaceAll(inc,'%PLUGINNAME%', sPname);
app.WriteFile(fldr+'/plugin/'+sPname+'.inc', inc);

var html = app.ReadFile(srcFiles+sAdd+'MyPlugin.html');
html = replaceAll(html,'%PACKAGENAME%', sPackage);
html = replaceAll(html,'%PLUGINNAME%', sPname);
app.WriteFile(fldr+'/plugin/'+sPname+'.html', html);

var droid = app.ReadFile(srcFiles+'AndroidManifest.xml');
droid = replaceAll(droid,'%PACKAGENAME%', sPackage);
droid = replaceAll(droid,'%PLUGINNAME%', sPname);
app.WriteFile(fldr+'/AndroidManifest.xml', droid);

app.CopyFile(srcFiles+'icon.png', fldr+'/res/drawable/icon.png' );

app.HideProgress();
app.ShowPopup('DS Plugin Project Created','Bottom');
menu.Show();
}

function replaceAll(sString, sSearch, sReplace) {
 return sString.split(sSearch).join(sReplace);
}