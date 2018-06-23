
url = "http://dpaste.com/api/v2/";
req = new XMLHttpRequest()
req.open("POST", url);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.onload = function ()
{
	alert(req.response);
	app.SetClipboardText( req.response );
}
 params = "poster=gauravssnl&content=alert(ok)&syntax=js";
req.send(params);