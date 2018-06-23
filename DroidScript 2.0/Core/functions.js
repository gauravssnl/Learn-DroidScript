function UpdateProjectsList(){
  var
    projectsList = app.ListFolder(PROJECTS_PATH,"",0,"alphasort"),
    count = Math.round(api.scr.w/api.dpi(75)),
    marg = api.dpi(5), halfMarg = marg/2, row,
    size = api.scr.w/count-marg*2-marg/count;

  try{scr.home.DestroyChild(lay.home.list)}catch(e){}
  lay.home.list = app.CreateLayout("Linear", "Left");
  lay.home.list.SetPadding(halfMarg, halfMarg, halfMarg, halfMarg, "px");
  scr.home.AddChild(lay.home.list);

  var n = 0
  projectsList.push("_NewProject_");
  projectsList.forEach(function(projectName){
    var data = {
      path: PROJECTS_PATH+projectName+"/",
      projectName: projectName, ex: ""
    }
    if(app.FileExists(data.path+projectName+".js")) data.ex = ".js";
    if(app.FileExists(data.path+projectName+".html")) data.ex = ".html";
    if(data.ex!=""||projectName=="_NewProject_"){
      data.file = data.path+projectName+data.ex;
      if(n%count==0){
        row = app.CreateLayout("Linear", "Horizontal");
        lay.home.list.AddChild(row)}

      var col = app.CreateLayout("Linear", "VCenter");
      row.AddChild(col);

      var icon = data.path+"Img/"+projectName+".png"
      if(projectName=="_NewProject_") icon = "Img/newProject.png"
      var obj = app.CreateImage(app.FileExists(icon)? icon: "Img/defaultProjectIcon.png", size, -1,  "px,resize,async");
      obj.SetMargins(marg, marg, marg, marg, "px");
      obj.SetOnTouchDown(function(){
        this.SetAlpha(0.5);
	    });
	    obj.SetOnTouchUp(function(ev){
	      var tp = {x: ev.x[0], y: ev.y[0]}
	      this.SetAlpha(1);
	      if(tp.x>0&&tp.x<1&&tp.y>0&&tp.y<1){
	        if(data.projectName=="_NewProject_"){
            dlg.yesno.txe.Reset("Hello World");
	          dlg.yesno.Show(lang.main.menu.new, dlg.yesno.txe);
	          dlg.yesno.SetOnYes(function(){
	            var
	              newProjectName = dlg.yesno.txe.GetText(),
	              path = PROJECTS_PATH+newProjectName+"/";
              if(app.FolderExists(path)) return alert(lang.main.taken);
              app.ExtractAssets(lang.GetFolder()+"Hello World/", path);
              app.RenameFile(path+"Hello World.js", path+newProjectName+".js");
              app.RenameFile(path+"Img/Hello World.png", path+"Img/"+newProjectName+".png");
              UpdateProjectsList();
	          })
	        }
	        else app.StartApp(data.file, HasOption("nodom", data.file));
        }
	    });
      if(projectName!="_NewProject_")
        obj.SetOnLongTouch(function(){
	        dlg.choose.data = api.DeepMerge(dlg.choose.data, data);
          dlg.choose.Show();
	        this.SetAlpha(1);
	      });
      else projectName = lang.main.menu.new
      col.AddChild(obj);

      var obj = app.CreateText(projectName, "", "", "multiline");
      obj.SetSize(size, -1, "px");
      col.AddChild(obj);
      n++
    }
  });
}

function OnChoose(item){
  var
    data = dlg.choose.data,
    action = data.actionName[data.actionString.indexOf(item)];
  switch(action){
    case "edit":

      break;
    case "rename":
      dlg.yesno.txe.Reset(data.projectName);
      dlg.yesno.Show(item, dlg.yesno.txe);
      dlg.yesno.SetOnYes(function(){
        var newProjectName = dlg.yesno.txe.GetText();
        if(app.FolderExists(PROJECTS_PATH+newProjectName)) return alert(lang.main.taken);
        app.RenameFile(data.file, data.path+newProjectName+data.ex);
        app.RenameFile(data.path+"Img/"+data.projectName+".png", data.path+"Img/"+newProjectName+".png");
        app.RenameFolder(data.path, PROJECTS_PATH+newProjectName);
        UpdateProjectsList();
      })
      break;
    case "copy":

      break;
    case "delete":
      dlg.yesno.Show(item+" «"+data.projectName+"»?");
      dlg.yesno.SetOnYes(function(){
        app.DeleteFolder(data.path);
        UpdateProjectsList();
      })
      break;
    case "shortcut":
      alert("Делаю")
      dlg.yesno.Show(item+" «"+data.projectName+"»?");
      dlg.yesno.SetOnYes(function(){
        app.CreateShortcut(data.projectName, data.path+"Img/"+data.projectName+".png", data.file);
      })
      break;
    case "spk":

      break;
    case "apk":

      break;
    case "icon":

      break;
  }
}

function HasOption(options, file){
  var code = app.ReadFile(file);
  match = code.match(/_AddOptions\(\s*["|'](.*?)["|']\s*\)/);
  if(!match) return "";
  var ops = match[1].toLowerCase().split(",");
  var res = ""
  ops.forEach(function(i){
    if(~options.indexOf(i)!=0) res+=i;
	})
  return res;
}