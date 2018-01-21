
var STYLE_PROGRESS;

(function() {
    var index = String(STYLE_PROGRESS).toLowerCase()=='white' ? 0 : 1;
    var lay = app.CreateLayout("Linear");
    lay.SetVisibility('Hide');
    app.AddLayout(lay);
    var b = app.CreateButton('<big>❯</big>', -1, -1, "html");
    lay.AddChild(b);
    app.Wait(0.05);
    var H = b.GetHeight() * 0.9;
    var W = H*app.GetScreenHeight()/app.GetScreenWidth();
    app.RemoveLayout(lay);
    DialogProgress = app.CreateDialog("", 'NoTitle, NoCancel');
    DialogProgress.Layout = app.CreateLayout("linear", "fillxy" );
    DialogProgress.Layout.SetBackColor(["#ffffff", "#222222"][index]);
    DialogProgress.AddLayout(DialogProgress.Layout);
    DialogProgress.Head = app.CreateText('', 0.9 - W/1.5, -1, 'multiline,html,left');
    DialogProgress.Head.SetTextColor('#3088bb');
    DialogProgress.Head.SetMargins(0, H/3, 0, H/3);
    DialogProgress.Head.SetVisibility('Gone');
    DialogProgress.Layout.AddChild(DialogProgress.Head);
    DialogProgress.lineUp = app.CreateText('', 0.9, 2.5/app.GetScreenHeight());
    DialogProgress.lineUp.SetBackColor('#3088bb');
    DialogProgress.lineUp.SetVisibility('Gone');
    DialogProgress.Layout.AddChild(DialogProgress.lineUp);
    var layDlg = app.CreateLayout("linear", "horizontal, fillx" );
    DialogProgress.Layout.AddChild(layDlg);
    var layImg = app.CreateLayout('Linear', 'filly, vcenter');
    layDlg.AddChild(layImg);
    var l = app.CreateLayout('frame');
    l.SetMargins(W/4, H/3, W/4, H/3);
    layImg.AddChild(l);
//    DialogProgress.Img = app.CreateImage('Img/loading.png', W, H);
 //   if (! index)
//        DialogProgress.Img.Scale(-1, 1);
    DialogProgress.Img2 = app.CreateImage('Img/loading.png', W, H);
//    if (index)
//        DialogProgress.Img2.Scale(-1, 1);
//    l.AddChild(DialogProgress.Img);
    l.AddChild(DialogProgress.Img2);
    var layText = app.CreateLayout('Linear', 'vcenter, filly');
    layText.SetSize(0.89-W*1.5);
    DialogProgress.Text = app.CreateText('', -1, -1, 'fillx,left, multiline, html');
    DialogProgress.Text.SetTextColor(["#666655", "#dddddd"][index]);
    DialogProgress.Text.SetMargins(0, 0.01, 0, 0.01);
    layText.AddChild(DialogProgress.Text);
    layDlg.AddChild(layText);
    DialogProgress.line = app.CreateText('', 0.9, 1.9/app.GetScreenHeight());
    DialogProgress.line.SetBackColor('#99999999');
    DialogProgress.Layout.AddChild(DialogProgress.line);
    DialogProgress.line.SetVisibility('Gone');
    DialogProgress.BtnCancel = app.CreateButton('<big>Отмена</big>', 0.9, -1,'filly,html');
    DialogProgress.BtnCancel.SetBackColor('#00000000');
    DialogProgress.BtnCancel.SetTextColor(["#666655", "#dddddd"][index]);
    DialogProgress.BtnCancel.SetOnTouch(OnTouchProgress);
    DialogProgress.Layout.AddChild(DialogProgress.BtnCancel);
    DialogProgress.BtnCancel.SetVisibility('Gone');

    DialogProgress.Angle = 0;
    DialogProgress.ShowFlag = false;
})();


function SetStyleProgress(str)
{
    STYLE_PROGRESS = str;
    var index = String(STYLE_PROGRESS).toLowerCase()=='white' ? 0 : 1;
    DialogProgress.Layout.SetBackColor(["#ffffff", "#222222"][index]);
    DialogProgress.Text.SetTextColor(["#666655", "#dddddd"][index]);
    DialogProgress.BtnCancel.SetTextColor(["#666655", "#dddddd"][index]);
}


function GetStyleProgress()
{
    return  (
        String(STYLE_PROGRESS).toLowerCase()=='white' ? 'White' : 'Black');
}


function OnTouchProgress()
{
    this.SetBackColor('#aa3080aa');
    HideProgress();
    this.SetBackColor('#00000000');
    DialogProgress.callback();
}


function ShowProgress(body, head, cancel_callback)
{
    if (typeof head == 'function' && !cancel_callback)
    {
        cancel_callback = head;
        head = false;
    }
    DialogProgress.callback = cancel_callback;
    if (typeof cancel_callback == 'function')
    {
        DialogProgress.line.SetVisibility('Show');
        DialogProgress.BtnCancel.SetVisibility('Show');
    }
    else
    {
        DialogProgress.line.SetVisibility('Gone');
        DialogProgress.BtnCancel.SetVisibility('Gone');
    }
    if (head)
    {
        DialogProgress.lineUp.SetVisibility('Show');
        DialogProgress.Head.SetVisibility('Show');
        DialogProgress.Head.SetHtml('<big><big>' + head + '</big></big>');
    }
    else
    {
        DialogProgress.lineUp.SetVisibility('Gone');
        DialogProgress.Head.SetVisibility('Gone');
    }
    if (DialogProgress.ShowFlag)
        clearInterval(DialogProgress.Interval);
    foo = function() {
            DialogProgress.Angle += 0.01;
 //           DialogProgress.Img.Rotate(DialogProgress.Angle * -1000);
            DialogProgress.Img2.Rotate(DialogProgress.Angle * 500);
        }
    DialogProgress.Interval = setInterval(foo, 20);
    DialogProgress.Text.SetHtml('<big>' + body + '</big>');
    DialogProgress.Show();
    DialogProgress.ShowFlag = true;
}

function UpdateTextProgress(text)
{
    DialogProgress.Text.SetHtml('<big>'+text+'</big>');
}

function HideProgress()
{
    clearInterval(DialogProgress.Interval);
    DialogProgress.ShowFlag = false;
    DialogProgress.Hide();
    DialogProgress.Angle = 0;
}

