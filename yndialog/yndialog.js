
//пример на основе выхода из программы
//при нажатии бэккея всплывает диалог.

function OnStart()
{
  app.EnableBackKey( false );
}

//вызывается при нажатии бэккея.
function OnBack() 
{
  YesNoDialog(Exit, "Вы точно хотите выйти?");
}

// вызывается в случае подверждения выхода.
function Exit(result)
{
  alert("result = \"" + result + "\"");
  if (result=="Yes") app.Exit();
}

//####################################

// градиент окна. Вынес наружу, вдруг в настройках разные варианты.
var GradientYNDialog = ["#222200", "#333311"];

// dialog.
function YesNoDialog(callback, body, head, yes, no)
{
  // если нажата одна из кнопок или отмена:
  if (!callback)
  {
    // если не отмена касанием экрана или бэккеем;
    if (this.result != 'Cancel')
      this.SetBackColor('#0088aa'); // подсвечивается нажатая кнопка;
    // вызов callback с параметром,
    // если нажата кнопка- то this это btn,
    //если отмена- то this это Dialog,
    // в коде ниже им присваиваются атрибуты func и result.
    this.func(this.result);
    Dialog.Dismiss(); // убиваем окно;
    app.RemoveLayout(layDlg); 
  }

  else // активация диалога;
  { 
    var line, btn;
    var yes = yes ? yes : 'Да'; // текст кнопки подтверждения;
    var no = no ? no : 'Нет'; //текст кнопки отмены;
    var head = head ? head : 'Вопрос:'; // заголовок;

    Dialog = app.CreateDialog(head);
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient.apply(layDlg, GradientYNDialog);
    Dialog.AddLayout(layDlg);
    var scroll = app.CreateScroller(0.95, -1);
    layDlg.AddChild(scroll);
    var layScroll = app.CreateLayout('Linear')
    scroll.AddChild(layScroll);

    // сабж, тело сообщения.
    var qt = app.CreateText(
      '<big><b>'+body
        .replace(/\n/g, '<br/>')+'</b></big>', 
      0.9, -1, 'multiline,html');
    qt.SetTextColor('#eeeeee');
    qt.SetMargins(0, 0.02, 0, 0.03);
    layScroll.AddChild(qt);

    // горизонтальная линия:
    line = app.CreateText('', 0.95, 2/app.GetDisplayHeight());
    line.SetBackColor('#999999');
    layScroll.AddChild(line);

    // кнопка подтверждения:
    var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
    btn = app.CreateButton(yes, 0.45, -1);
    btn.SetBackColor('#00000000');
    btn.SetTextColor('#eeeeee');
    btn.SetOnTouch( YesNoDialog );
    btn.result = 'Yes';
    btn.func = callback;
    layButtons.AddChild(btn);

    //вертикальная линия между кнопками:
    line = app.CreateText('', 2.3/app.GetDisplayHeight(), -1, 'filly');
    line.SetBackColor('#999999');
    layButtons.AddChild(line);

    // кнопка отмены:
    btn = app.CreateButton(no, 0.45, -1);
    btn.SetBackColor('#00000000');
    btn.SetTextColor('#eeeeee');
    btn.SetOnTouch( YesNoDialog );
    btn.result = 'No';
    btn.func = callback ;

    layButtons.AddChild(btn);
    layScroll.AddChild(layButtons);
    Dialog.Show();
    Dialog.func = callback ;
    Dialog.result = 'Cancel';
    Dialog.SetOnCancel( YesNoDialog );
  }
}
