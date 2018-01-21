
app.LoadScript('dialogs.js');

function OnStart(){
    ColorFlag = 0;
    var list = [
        'Alert', 'YesNoDialog', 'Listbox', 'SelectionList', 'MultiSelectionList', 'StyleDialogs'
    ];
    lay = app.CreateLayout('linear', 'FillXY, VCenter');
    lay.SetBackColor(['#111111', '#eeeeee'][ColorFlag]);
    for (var i=0; i<list.length; i++) {
        var b = app.CreateButton(list[i], 0.8, -1, 'gray');
        b.SetOnTouch(eval('Show'+list[i]));
        lay.AddChild(b);
    }
    app.AddLayout(lay);
}


function ShowAlert() {
    Alert(Alert.toString(), '<img src="Img/alert.png"> Demonstration Alert', null, true);
}

function ShowYesNoDialog() {
    YesNoDialog(resultYesNoDialog, YesNoDialog.toString(), 'Demonstration YesNoDialog', null, null, true)
}

function ShowListbox() {
    Listbox(resultListbox, (function(){for(var i=0, l=[]; i<100; l.push('item #'+i), i++); return l}()), 'Header Listbox');
}

function ShowSelectionList() {
    SelectionList(resultSelectionList, (function(){for(var i=0, l=[]; i<100; l.push('item #'+i), i++); return l}()), '<img src="Img/alert.png"> Header SelectionList', 3, 'ОК');
}

function ShowMultiSelectionList() {
    MultiSelectionList(resultMultiSelectionList, (function(){for(var i=0, l=[]; i<100; l.push('item #'+i), i++); return l}()), 'Header MultiSelectionList', [6, 3, 1], 'Done');
}

function ShowStyleDialogs() {
    ColorFlag ^= 1;
    lay.SetBackColor(['#111111', '#eeeeee'][ColorFlag]);
    SetStyleDialogs(ColorFlag ? 'White' : '');
}


function resultYesNoDialog(yesno) {
    app.Alert(yesno, 'YesNoDialog');
}

function resultSelectionList(index) {
    app.Alert(index, 'SelectionList');
}

function resultListbox(index) {
    app.Alert(index, 'Listbox');
}

function resultMultiSelectionList(indexes) {
    app.Alert(JSON.stringify(indexes), 'MultiSelectionList');
}
