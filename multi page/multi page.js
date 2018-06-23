//  BY CSNAKES \\









/*
//Called when application is started.
function OnStart()
{    
    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "VCenter,FillXY" );
	layMain.SetBackground( "/Res/drawable/android" );

	//Create a text label and add it to main layout.
	txt = app.CreateText( "<-- swipe from left" );
	txt.SetTextSize( 24, "dip" );
	layMain.AddChild( txt );
	
	//Create a drawer containing a menu list.
	CreateDrawer();
	
	
		CreateDrawer2();
	//Add main layout and drawer to app.	
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Right", drawerWidth );
		app.AddDrawer( drawerScroll2, "Right", drawerWidth );
}

//Create the drawer contents.
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.95;
    drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" );
    drawerScroll.SetBackColor( "White" );
	layDrawer = app.CreateLayout( "Linear", "Right" );

}
function CreateDrawer2()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.95;
    drawerScroll2 = app.CreateScroller( drawerWidth, -1, "FillY" );
    drawerScroll2.SetBackColor( "White" );
	layDrawer = app.CreateLayout( "Linear", "Right" );

}
*/ // Test 1 fail...





//Called when application is started.
function OnStart()
{
    //Create the main layout.
    lay = app.CreateLayout( "linear", "FillXY" );    
    
    //Create a full screen scroller
    scroll = app.CreateScroller( 1.0, 1.0 );
    lay.AddChild( scroll );
 
    //Create a layout inside scroller.
    layScroll = app.CreateLayout( "Linear", "Left, Horizontal" );
    scroll.AddChild( layScroll );
    
    //Create an image twice the screen size.
    img1 = app.CreateImage( null, 1.0, 1.0 );
    layScroll.AddChild( img1 );
    img1.SetColor( "red" );
        img2 = app.CreateImage( null, 1.0, 1.0 );
    layScroll.AddChild( img2 );
    img2.SetColor( "green" );
       
    //Add layout to app.    
    app.AddLayout( lay );
    
    //Initially scroll to center of image.
    //scroll.ScrollTo( 0.5, 0.5 );
    
    //Show the current scroll position every second.
    setInterval( ShowScrollPos, 900 );
}

//Called every second.
function ShowScrollPos()
{

    //Current scroll position and diplay it.
    var x = scroll.GetScrollX();
    //var y = scroll.GetScrollY();
    //app.ShowPopup( x.toFixed(2) + ", " + y.toFixed(2) );
if( x < 0.5) scroll.ScrollTo( 0, 0 );
else scroll.ScrollTo( 1, 0 );

}
// This test 2 can be upgraded.