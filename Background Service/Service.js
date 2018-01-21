var count = 0;
var diff = 1;

function OnStart()
{
app.ShowPopup( "Hello from Service" );
setInterval(DoWork,1000);

}

function OnMessage(msg)
{
	console.log(msg);
	if(msg=="change") diff = (diff>0 ? -1: 1);
	
}

function DoWork()
{
count += diff;
app.SendMessage( count );
}