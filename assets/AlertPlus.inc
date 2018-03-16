
/*
	# Alert Plus
	# V1.0
	# 16:58 - 2018
	# Cemal G.
*/

//Add CreateAlertPlus method to global app object. 
app.CreateAlertPlus = function() { try{ return new AlertPlus(); }catch(e){ throw new Error( e ); } }

//Plugin wrapper class.
function AlertPlus( options )
{
	var dw = app.GetDisplayWidth();
	var dh = app.GetDisplayHeight();
	
    	this.plg = _CreatePlugin( "com.candlelight.alertplus.plugins.user.AlertPlus", options ); 
    	
    	// Dialog.
    	this.THEME_BASIC = 1;
    	this.THEME_DARK = 2;
    	this.THEME_LIGHT = 3;
    	// Poup.
    	this.LENGTH_SHORT = 0;
    	this.LENGTH_LONG = 1;
    	
    	if( app.IsAPK() ) rootSrc = app.GetPath()+"/";
    	else rootSrc = app.GetAppPath()+"/";
    	
	this.GetVersion = function( num, txt ) { return parseFloat( this.plg.Send( "GetVersion" ) ); };
	
	this.SelectView = function( obj ){ return this.plg.SendObj( "SelectView", obj, obj.GetType()+"" ); };
    	
    	this.CreateAlert = function( txt, tit, tm ) {
    	var ret = this.plg.CreateObj( "CreateAlert", txt+"", tit+"", tm );
    	if( ret ) return new ALERT(ret,this); else return null;
    	}
    	
    	this.ShowAlert = function( txt, tit, btnTxt, tm ) {
    	var ret = this.plg.CreateObj( "ShowAlert", txt+"", tit+"", btnTxt+"", tm );
    	if( ret ) return new Obj(ret); else return null;
    	}
    	
    	this.CreateProgress = function( txt, tit, tm ) {
    	var ret = this.plg.CreateObj( "CreateProgress", txt+"", tit+"", tm );
    	if( ret ) return new PALERT(ret,this); else return null;
    	}
    	
    	this.ShowPopup = function( txt, x, y, length ) {
    	var ret = this.plg.CreateObj( "ShowPopup", txt+"", dw*x, dh*y, length );
    	if( ret ) return new Obj( ret ); else return null;
    	}
    	
    	this.ShowProgress = function( txt, tit, can, tm ) {
    	var ret = this.plg.CreateObj( "ShowProgress", txt+"", tit+"", can, tm );
    	if( ret ) return new Obj(ret); else return null;
    	}
    	
    	this.HideProgress = function( obj ) {
    	return this.plg.SendObj( "HideProgress", obj );
    	}
    	
    	this.LongClickPopup = function( obj, cb ) {
    	return this.plg.SendObj( "lcp", obj, obj.GetType(), cb.name );
    	}
    	
}

function ALERT( id, p )
{
	var obj = new Obj(id);
	obj.Show = function(){ return p.plg.SendObj( "Show", obj, 0 ); };
	obj.SetButton = function( tag, txt, cb ){ return p.plg.SendObj( "SetButton", obj, tag, txt+"", cb.name, 0 ); };
	obj.Dismiss = function(){ return p.plg.SendObj( "Dismiss", obj, 0 ); };
	obj.SetOnDismiss = function( cb ) { return p.plg.SendObj( "OnDismiss", obj, cb.name ); }
	obj.AddView = function(){ return p.plg.SendObj( "AddView", obj ); };
	obj.SetIcon = function( src ){ return p.plg.SendObj( "SetIcon", obj, (src[0]=="/"?src:rootSrc+src), 0 ); };
	obj.SetTitle = function( txt ){ return p.plg.SendObj( "SetTitle", obj, txt+"", 0 ); };
	obj.SetMessage = function( txt ){ return p.plg.SendObj( "SetMessage", obj, txt+"", 0 ); };
	obj.SetCancelable = function( bool ){ return p.plg.SendObj( "SetCancelable", obj, bool, 0 ); };
	return obj;
}

function PALERT( id, p )
{
	var obj = new Obj(id);
	obj.Show = function(){ return p.plg.SendObj( "Show", obj, 1 ); };
	obj.SetButton = function( tag, txt, cb ){ return p.plg.SendObj( "SetButton", obj, tag, txt+"", cb.name, 1 ); };
	obj.UpdateProgress = function( per ){ return p.plg.SendObj( "UpdateProgress", obj, per ); };
	obj.Dismiss = function(){ return p.plg.SendObj( "Dismiss", obj, 1 ); }
	obj.Hide = function(){ return p.plg.SendObj( "Hide", obj ); };
	obj.SetIcon = function( src ){ return p.plg.SendObj( "SetIcon", obj, (src[0]=="/"?src:rootSrc+src), 1 ); };
	obj.SetTitle = function( txt ){ return p.plg.SendObj( "SetTitle", obj, txt+"", 1 ); }
	obj.SetMessage = function( txt ){ return p.plg.SendObj( "SetMessage", obj, txt+"", 1 ); }
	obj.SetCancelable = function( bool ){ return p.plg.SendObj( "SetCancelable", obj, bool, 1 ); };
	return obj;
}

