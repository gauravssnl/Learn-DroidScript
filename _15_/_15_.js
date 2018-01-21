var Gradient = ['#6b3a00', '#9d6520'];
var WIDTH = app.GetDisplayWidth();
var HEIGHT = app.GetDisplayHeight();


// главный layout.
var lay = app.CreateLayout('linear', 'FillXY, bottom');
lay.SetBackGradient.apply(lay, Gradient);
app.AddLayout(lay);


// для отладки.
function print() 
{
    var args = [], i;
    for (i=0; i<arguments.length; i++)
        args.push(JSON.stringify(arguments[i]));
    alert(args.join('\n'));
}

// рандомно перемешивает список.
Array.prototype.shuffle = function()
{
    var i = this.length, a, b;
    while (i) 
    {
        a = Math.floor((i--) * Math.random());
        b = this[i]; this[i] = this[a]; this[a] = b;
    }
}


//  возвращает копию списка.
Array.prototype.copy = function() 
{
    return JSON.parse(JSON.stringify(this));
}


//yes-no-dialog, вызов ф-ции.
function ynd(obj) 
{
    if (!obj)
    {
        this.SetBackColor('#0088aa');
        this.func(this.ID);
    }
    else 
        obj.func(obj.ID);
    Dialog.Dismiss();
    app.RemoveLayout(layDlg);
}

// в случае отмены диалога касанием экрана
function dlgCancel() {
    ynd(YesNoDialog.obj)
}


//yes-no-dialog.
function YesNoDialog(func, query, title, yes, no) {
    var yes = yes ? yes : 'Да';
    var no = no ? no : 'Нет';
    var title = title ? title : 'Вопрос:';
    Dialog = app.CreateDialog(title);
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient.apply(layDlg, Gradient);
    Dialog.AddLayout(layDlg);
    var qt = app.CreateText('<big>'+query+'</big>', 0.9, -1, 'multiline,html');
    qt.SetFontFile('fonts/DroidSerif-Bold.ttf');
    qt.SetTextColor('#eeeeee');
    qt.SetMargins(0, 0.02, 0, 0.03);
    layDlg.AddChild(qt);
    var line = app.CreateText('', 1, 2/HEIGHT);
    line.SetBackColor('#999999');
    layDlg.AddChild(line);
    var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
    var btn = app.CreateButton('<big><b>'+yes+'</b></big>', 0.45, -1, 'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor('#eeeeee');
    btn.SetOnTouch(ynd);
    btn.ID = 'Yes';
    btn.func = func;
    layButtons.AddChild(btn);
    line = app.CreateText('', 2.3/HEIGHT, -1, 'filly');
    line.SetBackColor('#999999');
    layButtons.AddChild(line);
    btn = app.CreateButton('<big><b>'+no+'</b></big>', 0.45, -1,'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor('#eeeeee');
    btn.SetOnTouch(ynd);
    btn.ID = 'No';
    YesNoDialog.obj = btn;
    btn.func = func;
    layButtons.AddChild(btn);
    layDlg.AddChild(layButtons);
    Dialog.Show();
    Dialog.SetOnCancel(dlgCancel);
}


// возвращает рандомный список камней (решаемый вариант).
function createPlayList()
{
    var i;
    while(true)
    {
        var lst = [];
        for (i=1; i<16; i++) lst.push(i);
        lst.shuffle();
        var k = 0, temp = lst.copy();
        while (true)
        {
            var flag = false;
            for (i=0; i<temp.length-1; i++)
            {
                var q = temp[i], qq = temp[i+1]; 
                if (q > qq)
                {
                    temp[i+1] = q; temp[i] = qq;
                    k += 1; flag = true; 
                    break;
                }
            }
            if (!flag) break;
        }
        if (k % 2) continue;
        var list = [];
        for (var i=0; i<13; i+=4)  list.push(lst.slice(i, i+4));
        list[3].push(0);
        return list;
    }
}


var listPlayButtons;
function Start(start)
{
    if (start == 'No') 
        app.Exit();
    else if (start == 'Yes')
        lay.RemoveChild(layVrtc);
    var x, y, num, btn, layHrz, lstHrz;
    layVrtc = app.CreateLayout('linear');
    layVrtc.SetMargins(0, 0.02, 0, 0.015);
    listPlayButtons = [];
    playList = createPlayList();
    for (y=0; y<4; y++)
    {
        layHrz = app.CreateLayout('linear', 'horizontal');
        lstHrz = [];
        for (x=0; x<4; x++)
        {
            num = playList[y][x];
            btn = app.CreateButton(num, 0.24, WIDTH/HEIGHT*0.24, 'lego');
            btn.SetTextSize(0.12*WIDTH, 'px');
            btn.SetOnTouch(btnsMove);
            layHrz.AddChild(btn);
            lstHrz.push(btn);
            btn.SetVisibility(num ? 'Show' : 'Hide');
        }
        layVrtc.AddChild(layHrz);
        listPlayButtons.push(lstHrz);
    }
    
    lay.AddChild(layVrtc);
    
}


//ходим
function btnsMove()
{
    var isMove = false, num = +this.GetText(), x, y, x1, y1, i;

    outher:
        for (y=0; y<4; y++)
        {
            for (x=0; x<4; x++)
            {
                if (playList[y][x] == num) break outher;
            }
        }

    for (i=0; i<2; i++) 
    {
        y1 = [y-1, y+1][i]; x1 = x;
        if (y1>=0 && y1<=3)
        {
            if (playList[y1][x1] == 0)
            {
                isMove = true; break;
            }
        }
        x1 = [x-1, x+1][i]; y1 = y;
        if (x1>=0 && x1<=3)
        {
            if (playList[y1][x1] == 0)
            {
                isMove = true; break;
            }
        }
    }

    if (!isMove) return;
    playList[y1][x1] = num;
    playList[y][x] = 0;
    listPlayButtons[y1][x1].SetText(num);
    this.SetVisibility('Hide');
    listPlayButtons[y1][x1].SetVisibility('Show');
    if (JSON.stringify(playList) == JSON.stringify(
        [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]))
    {
        YesNoDialog(Start, 'Еще игра?', 'Вы победили!');
    }
}


function Exit(yn)
{
    if (yn == 'Yes')
        app.Exit();
}

function OnBack()
{
    YesNoDialog(Exit, 'Прекратить игру и выйти?', 'Выход:');
}


function OnStart()
{
    Start();
    app.EnableBackKey(false);
}

