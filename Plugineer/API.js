
function Api(){
  this.page = "";
  this.objs = {main: []};
  this.options = {};
  this.scr = {
    d: app.GetScreenDensity(),
    w: app.GetDisplayWidth(),
    h: app.GetDisplayHeight()
  }
  this.scr.wh = this.scr.w>this.scr.h
}

Api.prototype.del = function (d, height){
  var self = this;
  var dpi = function(){return self.dpi.apply(self, arguments)}
  var pt = function(){return self.sp.apply(self, arguments)}
  var wh = self.scr.wh;
  return eval((d+"").replace(/(\d+\.?\d*)%/g, function(str, p1, p2, offset, s){
	  return (height?self.scr.h:self.scr.w)*p1/100
	})
	)
}

Api.prototype.dpi = function (k){
  return k*this.scr.d/160
}

Api.prototype.sp = function (k){
  return this.scr.d/144*k
}

Api.prototype.ShowPage = function(page, action, time, effect1, effect2){
  var tmp = this.page;
  var pos = tmp.lastIndexOf("/");
  var pre = tmp.substring(pos + 1);
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


Api.prototype.LoadOptions = function(dflt){
  this.options = JSON.parse(app.LoadText("options", dflt));
}

Api.prototype.SaveOptions = function(){
  app.SaveText("options", JSON.stringify(this.options));
}

Api.prototype.GetOption = function(option){
  return this.options[option];
}

Api.prototype.SetOption = function(option, value){
  this.options[option] = value;
}

Api.prototype.CreateLanguage = function(code){
  var codeFldr = "en"
  app.ListFolder("Lang/").forEach(function(i){
    if(~i.split("-").indexOf(code)) codeFldr = i;
	})

  var lang = {};
  lang.LoadLanguage = function(path){
    var file = "Lang/"+codeFldr+path+".js";
    if(app.FileExists(file))
      try{
        return JSON.parse("{"+app.ReadFile(file)+"}");
      }catch(e){
	      app.Error("Error in language file\n"+e, 0, "", true);
      }
  };
  return lang;
}

Api.prototype.CreateLayout = function(type, options, width, height, use){
    var obj = app.CreateLayout(type, options);
    return AddDefOptions.call(this, "lay", obj, width, height, use);
  }

Api.prototype.CreateText = function(text, width, height, options, use){
    var obj = app.CreateText(text, -1, -1, options);
    return AddDefOptions.call(this, "txt", obj, width, height, use);
  }

Api.prototype.CreateTextEdit = function(text, width, height, options, use){
    var obj = app.CreateTextEdit(text, -1, -1, options);
    return AddDefOptions.call(this, "txe", obj, width, height, use);
  }

Api.prototype.CreateButton = function(text, width, height, options, use){
    var obj = app.CreateButton(text, -1, -1, options);
    obj.SetStyle( "#4285F4", "#4285F4", 4 );
    return AddDefOptions.call(this, "btn", obj, width, height, use);
  }

Api.prototype.CreateScroller = function(width, height, options, use){
    var obj = app.CreateScroller(-1, -1, options);
    return AddDefOptions.call(this, "scr", obj, width, height, use);
  }

Api.prototype.CreateImage = function(file, width, height, options, use){
    var obj = app.CreateImage(file, file? null:1, file? null:1, options);
    return AddDefOptions.call(this, "img", obj, width, height, use);
  }

function AddDefOptions(type, obj, width, height, use){
  var self = this;
  var del = function(){return self.del.apply(self, arguments)}
  obj.type = type;
	obj.left = 0; obj.top = 0;
	obj.padding = {left: 0, top: 0, right: 0, bottom: 0}
	obj.margins = {left: 0, top: 0, right: 0, bottom: 0}
	
	obj.SetSize = function(width, height, use){
	  this.width = width||this.width;
	  this.height = height||this.height;
	  if(use){
	    prompt(this.id, "Obj.SetSize(\f"+
	    ((this.width=="wh")? del(this.height, true): del(this.width))+"\f"+
	    ((this.height=="wh")? del(this.width): del(this.height, true))+"\fpx");
	  }
	}
  obj.SetPosition = function(left, top, width, height, use){
    this.left = left||this.left;
    this.top = top||this.top;
	  this.width = width||this.width;
	  this.height = height||this.height;
	  if(use)
	    prompt(this.id, "Obj.SetPosition(\f"+del(this.left)+"\f"+del(this.top, true)+"\f"+del(this.width)+"\f"+del(this.height, true)+"\fpx");
  }
  obj.SetPadding = function(left, top, right, bottom, use){
    var tmp = this.padding;
	  this.padding = tmp = {
	    left: left||tmp.left,
	    top: top||tmp.top,
	    right: right||tmp.right,
	    bottom: bottom||tmp.bottom
	  }
	  if(use)
      prompt(this.id, "Obj.SetPadding(\f"+del(tmp.left)+"\f"+del(tmp.top, true)+
      "\f"+del(tmp.right)+"\f"+del(tmp.bottom, true)+"\fpx");
  }
  obj.SetMargins = function(left, top, right, bottom, use){
    var tmp = this.margins;
	  tmp = {
	    left: left||tmp.left,
	    top: top||tmp.top,
	    right: right||tmp.right,
	    bottom: bottom||tmp.bottom
	  }
	  this.margins = tmp;
	  if(use)
      prompt(this.id, "Obj.SetMargins(\f"+del(tmp.left)+"\f"+del(tmp.top, true)+
      "\f"+del(tmp.right)+"\f"+del(tmp.bottom, true)+"\fpx");
  }
  obj.SetArray = function(arrName){
	  if(typeof arrName=="undefined")self.objs["main"].push(obj);
    else{
      if(typeof self.objs[arrName]=="undefined")self.objs[arrName]=[];
      self.objs[arrName].push(obj);
    }
	}
	obj.Use = function(){
	  this.SetSize(this.width, this.height, true);
	  this.SetPosition(this.left, this.top, this.width, this.height, true);
	  var tmp = this.padding;
	  this.SetPadding(tmp.left, tmp.top, tmp.right, tmp.bottom, true);
	  var tmp = this.margins;
	  this.SetMargins(tmp.left, tmp.top, tmp.right, tmp.bottom, true);
	}

  obj.SetSize(width, height, use);
  return obj;
}