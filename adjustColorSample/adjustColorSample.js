
function print() {
    var args = [];
    for (var i=0; i<arguments.length; i++)
    {
        var argStr = JSON.stringify(arguments[i]);
        args.push(argStr);
    }
    alert(args.join('\n') || 'undefined');
}

var lay = app.CreateLayout('Linear', 'fillxy,vCenter');
lay.SetBackground( "/Sys/Img/BlueBack.png" );
var btn = app.CreateButton('', 0.8, 0.2, 'alum');
lay.AddChild(btn);
var btn2 = app.CreateButton('', 0.8, 0.2, 'lego');
btn2.SetMargins(0, 0.2, 0, 0);
lay.AddChild(btn2);
app.AddLayout(lay);
var X = 0, V = 0;
idInerval = setInterval(function() {
	var c = 5;
	X += [c, -c][V];
	if (Math.abs(X) == 180) V = +!V;
	var y = 0, z = 0;
	btn.AdjustColor(y, z, -X/3);
	btn.SetScale(1+X/500, 1+X/500);
	btn2.AdjustColor(X, y, z);
	btn2.SetScale(1-X/500, 1-X/500);
	btn.SetText('"Alum"\nbtn.AdjustColor('+y+', '+z+', '+Math.round(X/3)+');');
	btn2.SetText('"Lego"\nbtn.AdjustColor('+X+', '+y+', '+z+');');
	lay.AdjustColor(X, y, z);
}, 10);

app.EnableBackKey(false);

function OnBack() {
	lay.Animate('FadeOut', app.Exit);
}
