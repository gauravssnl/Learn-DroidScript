
/*
 by Midnightcoder (Vlad Cheater)
*/

//Core
function Api(){
  this.version = 0.12;
  this.page = "";
  this.objs = {main: []};
  var t = app.CreateText();
  t.SetTextSize(1);
  this.scr = {
    d: app.GetScreenDensity(),
    w: app.GetDisplayWidth(),
    h: app.GetDisplayHeight(),
    sp: t.GetTextSize("px")
  }
  this.scr.wh = this.scr.w>this.scr.h
}

//Unit system
Api.prototype.unit = function(d){
  var
    self = this,
    dpi = function(){return self.dpi.apply(self, arguments)},
    pt = function(){return self.pt.apply(self, arguments)},
    sp = function(){return self.sp.apply(self, arguments)},
    wh = function(){return self.wh.apply(self, arguments)};
  return eval((d+"").replace(/(\d+\.?\d*)(vw|vh)/g, function(str, p1, p2, offset, s){
    return (p2=="vw"?self.scr.w:self.scr.h)*p1/100
  }))
}

Api.prototype.dpi = function(k){
  return this.scr.d/160*k}
Api.prototype.pt = function(k){
  return this.scr.d/72*k}
Api.prototype.sp = function(k){
  return this.scr.sp*k}
Api.prototype.wh = function(){
  return this.scr.wh? app.GetScreenHeight(): app.GetScreenWidth()}

//Page switcher
Api.prototype.ShowPage = function(page, action, time, effect1, effect2){
  var
    tmp = this.page,
    pos = tmp.lastIndexOf("/"),
    pre = tmp.substring(pos + 1);
  if(pre!=page){
    if(page){
      if(typeof eval(page)=="undefined")return app.ShowPopup("Coming soon...");
      tmp += "/" + page
    }else{
      tmp = tmp.substring(0, pos);
      page = tmp.substring(tmp.lastIndexOf("/") + 1);
    }
    this.page = tmp
    eval(pre).Animate(effect1||"FadeOut", null, time||250);
    eval(page).Animate(effect2||"FadeIn", function(){
      if(action)action()
    }, time||250);
  }
}

Api.prototype.UpdatePage = function(page){
  if(this.objs[page])
    this.objs[page].forEach(function(o){
      o.Use();
    })
}

Api.prototype.UpdateList = function(){
  var self = this;
  [].slice.call(arguments).forEach(function(i){
    if(typeof i == "string")
    self.UpdatePage(i);
    else i();
  });
}

//DeepMerge
Api.prototype.DeepMerge = function(obj1, obj2){
  for(var p in obj2){
    try{
      if(typeof obj2[p]==="object")
        obj1[p] = this.DeepMerge(obj1[p], obj2[p]);
      else obj1[p] = obj2[p];
    } catch(e){obj1[p] = obj2[p]}
  } return obj1;
}

//Settings
Api.prototype.LoadSettings = function(category, dflt){
  return JSON.parse(app.LoadText(category||"settings", dflt))}
Api.prototype.SaveSettings = function(category){
  app.SaveText(category||"settings", JSON.stringify(settings))}
Api.prototype.DeleteSettings = function(category){
  app.SaveText(category||"settings", null)}

//Language
Api.prototype.CreateLanguage = function(code){
  var
    self = this,
    codeFldr = "/en";

  app.ListFolder("Lang/").forEach(function(i){
    if(~i.split("-").indexOf(code)) codeFldr = "/"+i;
  })

  var lang = {};
  lang.Merge = function(path, defLang){
    var file = this.GetFolder(defLang)+"/Strings"+path+".json";
    if(app.FileExists(file))
      try{return JSON.parse("{"+app.ReadFile(file)+"}")}catch(e){
        app.Error("Error in language file\n"+e, 0, file, true)}
    else app.Error("Language file not found", 0, file, true);
  }
  lang.LoadStrings = function(path){
    return self.DeepMerge(this.Merge(path, "/en"), this.Merge(path));
  }
  lang.ReadFile = function(path){
    return app.ReadFile(this.GetFolder()+"/"+path)
	}
	lang.GetFolder = function(defLang){
	  return "Lang"+(defLang? defLang: codeFldr)+"/";
	}

  return lang;
}

//Debug
Api.prototype.Debug = function(obj){
  alert(JSON.stringify(obj, null, "   "))}