


function print() 
{
    var args = [];
    for (var i=0; i<arguments.length; i++) {
        args.push(JSON.stringify(arguments[i]) || ('' + arguments[i]));
    }
    app.ShowPopup(args.join('\n'));
}



function Password(callback, head) {
    if (typeof Password.callback == 'function') 
    {
        dlgCancel();
        return Password.callback(JSON.parse(app.LoadText('pass')));
    }
    if (typeof callback != 'function') return;

    Password.callback = callback;
    Password.Dialog = app.CreateDialog('', 'notitle');
    Password.layDlg = app.CreateLayout("linear");
    Password.layDlg.SetBackColor('#ffffff');
    Password.Dialog.AddLayout(Password.layDlg);

    // The title can be
    // Start
    var title = app.CreateText(
        '<img src="Img/key.png"> <big><b>'+
        (head || 'check in:')+
        '</b></big>', 0.9, -1, 'multiline,html,left');
    title.SetTextColor('#3098ba');
    title.SetMargins(0, 0.015, 0, 0.015);
    Password.layDlg.AddChild(title);
    var line = app.CreateText('', 0.95, 1.9/app.GetScreenHeight());
    line.SetBackColor('#3088aa');
    Password.layDlg.AddChild(line);
    //end of title

    var web = app.CreateWebView();
    web.SetBackColor('#ffffff');

    var textHtml = '<script src="file:///android_asset/app.js"></script>' + 
    '<script type="text/javascript">'+ 
    'function myboo(id,field,deflt) {' +
        'app.SaveText("pass",JSON.stringify([document.getElementById("login").value, ' +
        'document.getElementById("passw").value]));' +
        'app.Execute("Password()") }'+  
    '</script>' +
    '<style> .psw {' +
        'background-color:#ffffff; background:#ffffff;' +
        'width: 100%; text-align: center; color: #555555;}' +
    '.log {' +
        'background-color:#ffffff; background:#ffffff;' +
        'width: 100%; text-align: center; color: #555555;}' +
    ' .btn {width: 100%; color: #555555;} </style>' + 
    "Login:" +
    "<h3><input type='text' id='login' class='log' autofocus></input></h3>" + 
    "Password:" +
    "<h3><input type='password' id='passw' class='psw' ></input></h3>" + 
    "<h3><button class='btn' onclick=myboo()>OK</button></h3>";

    web.LoadHtml(textHtml);
    Password.layDlg.AddChild(web);
    Password.Dialog.Show(); 
    Password.Dialog.SetOnCancel(dlgCancel);
}


function dlgCancel() 
{
    Password.Dialog.Dismiss(); 
    app.RemoveLayout(Password.layDlg);
}



//демонстрация
Password( function(list) {alert(list[0] + '\n' + list[1]); app.Exit()} );
