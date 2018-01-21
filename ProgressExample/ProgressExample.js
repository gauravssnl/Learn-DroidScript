app.LoadScript('Progress.js');


function OnStart() {
    var lay = app.CreateLayout("Linear", "Bottom FillXY");
    lay.SetBackColor("#ffffff");
    var btn = app.CreateButton('Progress without cancellation (5 sec.)', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgress);
    lay.AddChild(btn);
    var btn = app.CreateButton('Progress without cancellation with title (5 sec.)', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgressHead);
    lay.AddChild(btn);
    btn = app.CreateButton('Progress with cancellation', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgressCancel);
    lay.AddChild(btn);
    btn = app.CreateButton('Progress with cancellation and title', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgressHeadCancel);
    lay.AddChild(btn);
    btn = app.CreateButton('Change style', 0.8, 0.1, 'lego');
    btn.SetOnTouch(EditStyleProgress);
    lay.AddChild(btn);
    app.AddLayout(lay);
}


var timeout; //To demonstrate the r-th without a cancel button.

function ExampleProgress()
{
    ShowProgress("ExampleProgress");
    //Let's change the text in 2 seconds:
    setTimeout('UpdateTextProgress("Change the text ggdggsgsgs gssgxsgssgx ggcdgdgcgcstqqyhsgcg hsgdggcggc")', 2000);
    //will work 5 seconds:
    timeout = setTimeout(function(){
            HideProgress();
            clearTimeout(timeout);
            app.ShowPopup('Time is over');
        }, 5000);
}

function ExampleProgressHead()
{
    ShowProgress("ExampleProgress", "Header");
    //Let's change the text in 2 seconds::
    setTimeout('UpdateTextProgress("Change the text ggdggsgsgs gssgxsgssgx ggcdgdgcgcstqqyhsgcg hsgdggcggc")', 2000);
    //will work 5 seconds:
    timeout = setTimeout(function(){
            HideProgress();
            clearTimeout(timeout);
            app.ShowPopup('Time is over.');
        }, 5000);
}


function ExampleProgressCancel()
{
    ShowProgress("ExampleProgressCancel", Cancel);
    //Let's change the text in 2 seconds:
    setTimeout('UpdateTextProgress("Change the text uusuaayxyxyxyyx uxuxycychhxhcg hxhxhhcgc hxhchcchc")', 2000);
}


function ExampleProgressHeadCancel()
{
    ShowProgress("ExampleProgressCancel", 'Header', Cancel);
    //Let's change the text in 2 seconds:
    setTimeout('UpdateTextProgress("Change the text uusuaayxyxyxyyx uxuxycychhxhcg hxhxhhcgc hxhchcchc")', 2000);
}


//assigned cancellation function:
function Cancel()
{
    app.ShowPopup('Progress cancel');
    clearTimeout(timeout);
}


function EditStyleProgress()
{
    var style = GetStyleProgress();
    if (style == 'White')
        SetStyleProgress('Black');
    else
        SetStyleProgress('White');
    app.ShowPopup('Style "' + GetStyleProgress() + '"');
}

