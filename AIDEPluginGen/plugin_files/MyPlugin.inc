//Add Create%PLUGINNAME% method to global app object. 
app.Create%PLUGINNAME% = function() { return new %PLUGINNAME%();}

//Plugin wrapper class.
function %PLUGINNAME%( options )
{
    this.plg = _CreatePlugin( "%PACKAGENAME%.%PLUGINNAME%", options );  
	this.GetVersion = function( num, txt ) { return parseFloat( this.plg.Send( "GetVersion" ) ); }
    this.MyFunc = function( txt, num, bool ) { this.plg.Send( "MyFunc", txt, num, bool ); }
    this.SetOnMyReply = function( cb ) { this.plg.Send( "SetOnMyReply", cb.name ); }
    this.SaveMyImage = function( img ) { this.plg.SendImg( "SaveMyImage", img ); }
}
