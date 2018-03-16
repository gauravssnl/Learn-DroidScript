
pn = "plugin";
pf = app.GetPrivateFolder("Plugins");
function OnStart(){
  app.CopyFolder(pn, pf+"/"+pn.toLowerCase(), true);

  app.ShowPopup("Done");
  app.Exit();
}