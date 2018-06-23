//START ACTIONS DIALOG

tmp.list = lang.dialog.choose;
tmp.actionName = [];
tmp.actionString = [];

for(name in tmp.list) if(name!="title")
  tmp.actionName.push(name), tmp.actionString.push(tmp.list[name]);

dlg.choose = app.CreateListDialog(tmp.list.title, tmp.actionString);
dlg.choose.data = {actionName: tmp.actionName, actionString: tmp.actionString}
dlg.choose.SetOnTouch(OnChoose);

//END ACTIONS DIALOG
//START YESNO DIALOG

dlg.yesno = app.CreateDialog("Lorem");
dlg.yesno.Show = function(title, custom){
  this.SetTitle(title, "left");
  if(this.last) this.last.Gone();
  if(custom){
    custom.Show();
    this.last = custom
  }
  prompt(this.id, "Dlg.Show(");
}

tmp.lay = app.CreateLayout("Linear");
tmp.lay.SetPadding(api.dpi(2.5), api.dpi(6.5), api.dpi(2.5), 0, "px");
dlg.yesno.AddLayout(tmp.lay);
dlg.yesno.OnYes = function(){}
dlg.yesno.SetOnYes = function(fun){this.OnYes = fun}
dlg.yesno.OnNo = function(){}
dlg.yesno.SetOnNo = function(fun){this.OnNo = fun}

dlg.yesno.content = app.CreateLayout("Linear");
tmp.lay.AddChild(dlg.yesno.content);

tmp.hlay = app.CreateLayout("Linear", "Horizontal");
tmp.lay.AddChild(tmp.hlay);

dlg.yesno.btnNo = api.CreateButton(lang.main.no, "0.4*wh()", "", "Custom", true);
dlg.yesno.btnNo.SetStyle("#444444", "#444444", 2);
tmp.hlay.AddChild(dlg.yesno.btnNo);
dlg.yesno.btnNo.SetOnTouch(function(){
  dlg.yesno.Dismiss();
  dlg.yesno.OnNo();
});

dlg.yesno.btnYes = api.CreateButton(lang.main.yes, "0.4*wh()", "", "Custom", true);
dlg.yesno.btnYes.SetStyle("#444444", "#444444", 2);
tmp.hlay.AddChild(dlg.yesno.btnYes);
dlg.yesno.btnYes.SetOnTouch(function(){
  dlg.yesno.Dismiss();
  dlg.yesno.OnYes();
});

dlg.yesno.AddElement = function(e){
  e.Gone();
  this.content.AddChild(e);
}
//END YESNO DIALOG
//START CUSTOM YESNO DIALOG

dlg.yesno.txe = api.CreateTextEdit("", "0.8*wh()", "", "", true);
dlg.yesno.AddElement(dlg.yesno.txe);
dlg.yesno.txe.Reset = function(text, hint){
  this.SetText(text||"");
  this.SetHint(hint||"");
}

//END CUSTOM YESNO DIALOG