// always reuired dev_key
api_dev_key = "17de9ad72738cfe1cba0c9121fa04080";
api_paste_code = `
import socket8

`
api_paste_private = 0;
api_paste_name = "hello.py";
api_paste_expire_date = "10M";
api_paste_format = "python";

url = "https://pastebin.com/api/api_post.php"
req = new XMLHttpRequest()
req.open("POST", url)
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
params = `api_option=paste&api_user_key=""&api_paste_private=${api_paste_private}&api_paste_name=${api_paste_name}&api_paste_expire_date=${api_paste_expire_date}&api_paste_format=${api_paste_format}&api_paste_code=${api_paste_code}`;
alert(params);
req.onload = function ()
{
  alert(req.status);
	resp = req.response;
	alert(resp);
	app.OpenUrl( resp );
}
req.send(encodeURI(params));