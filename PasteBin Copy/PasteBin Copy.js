// always reuired dev_key
data = {
api_option: "paste",
api_dev_key: "YOUR_API_KEY"
api_paste_code:  `
import socket
import sys

class Proxy:
    def __init__(self):
        self.display = lambda text: sys.stdout.write(text)
        self.displayln = lambda text: sys.stdout.write(str(text) + "\n")
        self.lhost = "127.0.0.1"
        self.lport = 8080
    def local_server(self):
        self.local_sock = socket.socket()

` ,
api_paste_private:  0,
api_paste_name: "hello.py",
api_paste_expire_date: "10M",
api_paste_format:  "python"
};
urlEncodedData = "";
urlEncodedDataPairs = [];

for(name in data) {
  urlEncodedDataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  
}

alert(urlEncodedDataPairs);
urlEncodedData = urlEncodedDataPairs.join("&");
alert(urlEncodedData);
urlEncodedData = urlEncodedData.replace(/%20/g, "+");
alert(urlEncodedData);


url=   "https://pastebin.com/api/api_post.php"
req = new XMLHttpRequest()
req.open("POST", url)
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//params = `api_option=paste&api_user_key=""&api_paste_private=${api_paste_private}&api_paste_name=${api_paste_name}&api_paste_expire_date=${api_paste_expire_date}&api_paste_format=${api_paste_format}&api_paste_code=${api_paste_code}`;
//alert(params);
req.onload = function ()
{
  alert(req.status);
	resp = req.response;
	alert(resp);
	app.OpenUrl( resp );
}
req.send(urlEncodedData);