
function OnStart()
{
	l = app.CreateLayout( "absolute");
    lay = app.CreateLayout("linear");
    img1 = app.CreateImage("Img/c8u.png", 0.2, 0.1);
    img2 = app.CreateImage("Img/c7b.png", 0.2, 0.1); 
    Limg1 = app.CreateLayout("linear");
    Limg2 = app.CreateLayout("linear");
    Limg1.AddChild(img1);
    Limg2.AddChild(img2);
    lay.AddChild(Limg1);
    lay.AddChild(Limg2);
    l.AddChild(lay);
	lay = app.CreateLayout("linear");
    img01 = app.CreateImage("Img/c7u.png", 0.2, 0.1);
    img02 = app.CreateImage("Img/c8b.png", 0.2, 0.1); 
    Limg01 = app.CreateLayout("linear");
    Limg02 = app.CreateLayout("linear");
    Limg01.AddChild(img01);
    Limg02.AddChild(img02);
    lay.AddChild(Limg01);
    lay.AddChild(Limg02);
    b=app.CreateButton('bb');
    b.SetPosition(0.3, 0.8)
    b.SetOnTouch(bt);
    lay.AddChild(b);
    l.AddChild(lay);
 //   Limg1.SetVisibility('Hide');
    Limg02.SetVisibility('Hide');
	app.AddLayout( l );

}



function bt() {
	Limg01.Animate('ScaleToBottom');
	f=function(){
	    if(Limg01.GetVisibility()=='Hide'){
	        Limg02.Animate('ScaleFromTop');
	        clearInterval(ta);
	        //Limg01.SetVisibility('Show')
	    }
	}
		ta=setInterval(f,20)
	
}