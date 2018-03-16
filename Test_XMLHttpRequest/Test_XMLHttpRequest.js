
//Called when application is started.
function OnStart()
{
	req = new XMLHttpRequest();
	url = "http://text-processing.com/api/sentiment/";
	params = "text=I am a bad programmer";
	req.open("POST", url);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
	req.onload = function ()
{
	alert(req.response);
}

	
	}