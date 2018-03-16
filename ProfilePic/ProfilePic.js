
var backcolor = "#fff1f2f4";
var img = "Img/ProfilePic.jpg"

function OnStart()
{
lay = app.CreateLayout("linear","fillxy,vcenter");
lay.SetBackColor(backcolor);

img0 = app.CreateImage(img,0.5);
lay.AddChild(img0);

layfr = app.CreateLayout("frame");
layfr.SetMargins(0,0.03);
lay.AddChild(layfr);

img1 = app.CreateImage(img,0.5);
layfr.AddChild(img1);

img2 = app.CreateImage(img,0.5);
img2.SetColor("#00000000");
img2.DrawCircle(0.5,0.5,0.49);
img2.SetColorFilter(backcolor,"xor");
layfr.AddChild(img2);

app.AddLayout(lay);
}