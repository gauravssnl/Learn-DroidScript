//Add Create%PLUGINNAME% method to global app object. 
app.Create%PLUGINNAME% = function() { return new %PLUGINNAME%();}

//Plugin wrapper class.
function %PLUGINNAME%( options )
{
    this.plg = _CreatePlugin( "%PACKAGENAME%.%PLUGINNAME%", options );  
	this.GetVersion = function( num, txt ) { return parseFloat( this.plg.Send( "GetVersion" ) ); }
}