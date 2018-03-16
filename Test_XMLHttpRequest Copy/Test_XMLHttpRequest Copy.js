
//Called when application is started.
function OnStart()
{
	req = new XMLHttpRequest();
	url = "http://www.google.com/"
	req.open("GET", url);
	req.setRequestHeader("User-Agent" , "Opera/1.0");
	req.onload = function ()
{
	alert(req.responseText);
}

	
	}