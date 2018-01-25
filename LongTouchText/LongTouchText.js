
function OnStart()
{
    var txtButton;
    lay = app.CreateLayout('Linear', 'VCenter,FillXY');
    txtButton = app.CreateText('txtButton');
    txtButton.SetTextSize(20);
    txtButton.SetOnTouch(TextOnTouch);
    txtButton.LongTouch = OnLongTouchText; // function long touch;
    txtButton.ShortTouch = OnTouchText; // function short touch;
    lay.AddChild(txtButton);
    app.AddLayout(lay);
}


function TextOnTouch(p)
{
    if (p.action=='Down')
    {
        TextOnTouch.time = 0;
        TextOnTouch.obj = this;
        this.SetScale(0.85, 0.85); // press;
        TextOnTouch.interval = setInterval(
            function(){
                if(TextOnTouch.time)TextOnTouch.time+=100;else{TextOnTouch.time=undefined;TextOnTouch.obj.SetScale(1,1);}
            }, 100);
    }
    else if (p.action=='Move')
    {
        if (TextOnTouch.time==0) TextOnTouch.time = 1;
        if (TextOnTouch.time>600) //time = 600 ms;
        {
            this.SetScale(1, 1);
            TextOnTouch.time = undefined;
            for (var i=Math.max(1, TextOnTouch.interval-10); i<TextOnTouch.interval+1; i++) clearInterval(i);
            this.LongTouch();
        }
    }
    else if (p.action=='Up')
    {
        if (TextOnTouch.time)
        {
            this.SetScale(1, 1);
            TextOnTouch.time = undefined;
            for (var i=Math.max(1, TextOnTouch.interval-10); i<TextOnTouch.interval+1; i++) clearInterval(i);
            this.ShortTouch();
        }
    }
}


// функции короткого и длинного нажатий для демонстрации
var long = 0, short = 0;
function OnLongTouchText()
{
    this.SetText('Long touch #' + (++long))
}

function OnTouchText()
{
    this.SetText('Short touch #' + (++short))
}
