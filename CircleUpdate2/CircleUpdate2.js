var progress1=0, progress2=0;
var g_s1="progSet(", g_s2=")";

//Called when application is started.
function OnStart()
{
    //Create a layout with objects vertically centered.
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );

    //Create a web control to show progressbar.
    var siz = square(0.25);
    upd1 = app.CreateWebView( siz.w, siz.h );
    lay.AddChild( upd1 );
    upd2 = app.CreateWebView( siz.w, siz.h );
    lay.AddChild( upd2 );
    
    btn1 = app.CreateButton("Update1", 0.4);
    btn1.SetOnTouch(btn1_OnTouch);
    lay.AddChild(btn1);
    
    btn2 = app.CreateButton("Update2", 0.4);
    btn2.SetOnTouch(btn2_OnTouch);
    lay.AddChild(btn2);
    
    //Add layout to app.    
    app.AddLayout( lay );
    
    //Load the progressbar web page.
    upd1.LoadUrl( "Progress.html" );
    upd2.LoadUrl( "Progress.html" );
}

function btn1_OnTouch()
{
    //this button pretends to be the update process
    progress1 += 10
    if (progress1 > 100) progress1=0;
    upd1.Execute( g_s1 +progress1+ g_s2 );
}

function btn2_OnTouch()
{
    progress2 += 5;
    if (progress2 > 100) progress2=0;
    upd2.Execute( g_s1 +progress2+ g_s2 );
}

//Called from Progress.html when progressbar reaches 100%
function ProgressDone()
{
    app.ShowPopup('Done!');
}


function square(size)
{
    var ratio = app.GetDisplayWidth() /
        app.GetDisplayHeight();
    var ret={};
    if (ratio >= 1) // landscape
    {
        ret.w = size / ratio;
        ret.h = size;
    }
    else
    {
        ret.w = size;
        ret.h = size * ratio;
    }
    return ret;
}













