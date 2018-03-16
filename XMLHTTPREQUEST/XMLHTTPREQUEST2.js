var oReq = new XMLHttpRequest();
oReq.addEventListener('progress', updateProgress);
oReq.addEventListener('load', transferComplete);
oReq.addEventListener('error', transferFailed);
oReq.addEventListener('error', transferAborted);
oReq.open('GET', 'http://githb.com/');
oReq.send();
function updateProgress(oEvent)
{
	if(oEvent.lengthComputable) 
	 var percentComplete = oEvent.loaded/oEvent.total;
	 alert(percentComplete);
}

function transferComplete(evt)
{
	alert("Transfer complete");
}


function transferFailed()
{
	alert("Transfer failed");
}

function transferAborted()
{
	alert("Transaction Aborted");
}