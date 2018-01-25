
function OnStart() {
   createList();
}

function createList() {
  var itemsListView = [];
  for(var i in app) itemsListView.push(i);
  itemsListView.sort();
  //alert(itemsListView);
  var dialog = app.CreateListView(itemsListView, 'Атрибуты app');
  dialog.SetOnTouch(selectItemView);
  dialog.Show();
}



function selectItemView(text) {
    app.SetClipboardText(text) ;
    app.ShowPopup('Скопировано в буфер');
    createList();
}


