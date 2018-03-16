_AddOptions("NODOM");
var source= "../"
var destination="/storage/emulated/0/ds"

function OnStart(){
  app.ExtractAssets(source,destination,true);
  app.ShowPopup("Готово");
  app.Exit();
}