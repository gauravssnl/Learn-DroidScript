
//Custom objects

Api.prototype.CreateImage = function(file, width, height, options, use){
  var ret =prompt("#", "App.CreateImage("+file+"\f"+this.unit(width)+"\f"+this.unit(height)+"\f"+options+",px\f\f");
  return AddDefOptions.call(this, "img", (ret? new Img(ret): null), width, height, use)}

Api.prototype.Obj = function(id, self, type){
  this.id = id; this.left = 0; this.top = 0;
  this.padding = {left: 0, top: 0, right: 0, bottom: 0}
  this.margins = {left: 0, top: 0, right: 0, bottom: 0}

  this.Destroy = function(){prompt(this.id, "Obj.Release(")}
  this.Release = function(){prompt(this.id, "Obj.Release(")}
  this.SetVisibility = function(mode){prompt(this.id, "Obj.SetVisibility("+mode)}
  this.GetVisibility = function(){return prompt(this.id, "Obj.GetVisibility(")}
  this.GetType = function(){return type}
  this.Hide = function(){prompt(this.id, "Obj.SetVisibility(Hide")}
  this.Gone = function(){prompt(this.id, "Obj.SetVisibility(Gone")}
  this.Show = function(){prompt(this.id, "Obj.SetVisibility(Show")}
  this.IsVisible = function(){return prompt(this.id, "Obj.GetVisibility(" )=="Show"}
  this.IsEnabled = function(){return prompt(this.id, "Obj.IsEnabled(" )=="true"}
  this.SetEnabled = function(enable){prompt(this.id, "Obj.SetEnabled(\f"+enable)}
  this.SetBackground = function(file,options){prompt(this.id, "Obj.SetBackground("+file+"\f"+options)}
  this.SetBackAlpha = function(alpha){prompt(this.id, "Obj.SetBackAlpha(\f"+alpha)}
  this.SetBackColor = function(clr){prompt(this.id, "Obj.SetBackColor(\f"+clr)}
  this.SetBackGradient = function(colour1,colour2,colour3,options){prompt(this.id, "Obj.SetBackGradient(Linear\f"+colour1+"\f"+colour2+"\f"+colour3+"\f"+options+"\f"+null+"\f"+null+"\f"+null)}
  this.SetBackGradientRadial = function(x,y,radius,colour1,colour2,colour3,options){prompt(this.id, "Obj.SetBackGradient(Radial\f"+x+"\f"+y+"\f"+radius+"\f"+colour1+"\f"+colour2+"\f"+colour3+"\f"+options)}
  this.SetColorFilter = function(clr,mode){prompt(this.id, "Obj.SetColorFilter(\f"+clr+"\f"+mode)}
  this.AdjustColor = function(hue,sat,bright,cont){prompt(this.id, "Obj.AdjustColor(\f"+hue+"\f"+sat+"\f"+bright+"\f"+cont)}
  this.SetPosition = function(left,top,width,height,options){prompt(this.id, "Obj.SetPosition(\f"+left+"\f"+top+"\f"+width+"\f"+height+"\f"+options); this._left = left; this._top = top}
  this.SetSize = function(width,height,options){prompt(this.id, "Obj.SetSize(\f"+width+"\f"+height+"\f"+options)}
  this.GetWidth = function(options){return prompt(this.id, "Obj.GetWidth(\f"+options)}
  this.GetHeight = function(options){return prompt(this.id, "Obj.GetHeight(\f"+options)}
  this.GetAbsWidth = function(){return prompt(this.id, "Obj.GetAbsWidth(")}
  this.GetAbsHeight = function(){return prompt(this.id, "Obj.GetAbsHeight(")}
  this.GetLeft = function(options){return prompt(this.id, "Obj.GetLeft(\f"+options)}
  this.GetTop = function(options){return prompt(this.id, "Obj.GetTop(\f"+options)}
  this.GetPosition = function(options){return eval(prompt(this.id, "Obj.GetPosition(\f"+options))}
  this.SetScale = function(x,y){prompt(this.id,"Obj.SetScale(\f"+x+"\f"+y)}
  this.Focus = function(){prompt(this.id,"Obj.Focus(\f")}
  this.ClearFocus = function(){prompt(this.id,"Obj.ClearFocus(\f")}
  this.Tween = function(target,duration,type,repeat,yoyo,callback){_Tween.apply( this, [target,duration,type,repeat,yoyo,callback])}


  this.SetSize = function(width, height, use){
    this.width = width||this.width;
    this.height = height||this.height;
    if(use){
	  prompt(this.id, "Obj.SetSize(\f"+
	  (this.width=="wh"? self.unit(this.height): self.unit(this.width))+"\f"+
	  (this.height=="wh"? self.unit(this.width): self.unit(this.height))+"\fpx");
    }
  }
  this.SetPosition = function(left, top, width, height, use){
    this.left = left||this.left;
    this.top = top||this.top;
	  this.width = width||this.width;
	  this.height = height||this.height;
	  if(use)
	   prompt(this.id, "Obj.SetPosition(\f"+self.unit(this.left)+"\f"+self.unit(this.top)+"\f"+
	    (this.width=="wh"? self.unit(this.height): self.unit(this.width))+"\f"+
	    (this.height=="wh"? self.unit(this.width): self.unit(this.height))+"\fpx");
  }
  this.SetPadding = function(left, top, right, bottom, use){
    var tmp = this.padding;
	  this.padding = tmp = {
	    left: left||tmp.left,
	    top: top||tmp.top,
	    right: right||tmp.right,
	    bottom: bottom||tmp.bottom
	  }
	  if(use)
     prompt(this.id, "Obj.SetPadding(\f"+self.unit(tmp.left)+"\f"+self.unit(tmp.top)+
      "\f"+self.unit(tmp.right)+"\f"+self.unit(tmp.bottom)+"\fpx");
  }
  this.SetMargins = function(left, top, right, bottom, use){
    var tmp = this.margins;
	  tmp = {
	    left: left||tmp.left,
	    top: top||tmp.top,
	    right: right||tmp.right,
	    bottom: bottom||tmp.bottom
	  }
    this.margins = tmp;
    if(use)
   prompt(this.id, "Obj.SetMargins(\f"+self.unit(tmp.left)+"\f"+self.unit(tmp.top)+
    "\f"+self.unit(tmp.right)+"\f"+self.unit(tmp.bottom)+"\fpx");
  }
  this.SetArray = function(arrName){
    if(typeof arrName=="undefined")self.objs["main"].push(this);
    else{
      if(typeof self.objs[arrName]=="undefined")self.objs[arrName]=[];
      self.objs[arrName].push(this);
    }
  }
  this.Use = function(){
    this.SetSize(this.width, this.height, true);
    this.SetPosition(this.left, this.top, this.width, this.height, true);
    var tmp = this.padding;
    this.SetPadding(tmp.left, tmp.top, tmp.right, tmp.bottom, true);
    var tmp = this.margins;
    this.SetMargins(tmp.left, tmp.top, tmp.right, tmp.bottom, true);
  }
}

Api.prototype.CreateLayout = function(type, options, width, height, use){
  var id = prompt("#", "App.CreateLayout("+type+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "Layout");
    obj.SetSize(width, height, use);
    obj.SetOrientation = function(orient){prompt(obj.id, "Lay.SetOrientation(\f"+orient)}
    obj.SetGravity = function(gravity){prompt(obj.id, "Lay.SetGravity(\f"+gravity)}
    obj.AddChild = function(child,order){prompt(obj.id, "Lay.AddChild(\f"+(child?child.id:null)+"\f"+order); if(child) child._parent = this}
    obj.RemoveChild = function(child){prompt(obj.id, "Lay.RemoveChild("+(child?child.id:null)); if(child) child._parent = null}
    obj.DestroyChild = function(child){prompt(obj.id, "Lay.DestroyChild("+(child?child.id:null)); if(child) child._parent = null}
    obj.ChildToFront = function(child){prompt(obj.id, "Lay.ChildToFront("+(child?child.id:null))}
    obj.GetChildOrder = function(child){return parseInt(prompt(obj.id, "Lay.GetChildOrder(\f"+(child?child.id:null)))}
    obj.Animate = function(type,callback,time){prompt(obj.id, "Lay.Animate(\f"+type+"\f"+_Cbm(callback)+"\f"+time)}
    obj.SetTouchable = function(touchable){prompt(obj.id, "Lay.SetTouchable(\f"+touchable)}
    obj.SetOnTouch = function(callback){prompt(obj.id, "Lay.SetOnTouch(\f"+_Cbm(callback))}
    obj.SetOnTouchUp = function(callback){prompt(obj.id, "Lay.SetOnTouchUp(\f"+_Cbm(callback))}
    obj.SetOnTouchMove = function(callback){prompt(obj.id, "Lay.SetOnTouchMove(\f"+_Cbm(callback))}
    obj.SetOnTouchDown = function(callback){prompt(obj.id, "Lay.SetOnTouchDown(\f"+_Cbm(callback))}
    obj.SetOnLongTouch = function(callback){prompt(obj.id, "Lay.SetOnLongTouch(\f"+_Cbm(callback))}
    obj.SetOnChildChange = function(callback){prompt(obj.id, "Lay.SetOnChildChange(\f"+_Cbm(callback))}
  } return obj;
}

Api.prototype.CreateText = function(text, width, height, options, use){
  var id = prompt("#", "App.CreateText("+text+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "Text");
    obj.SetSize(width, height, use);
    obj.SetText = function(text){prompt(obj.id, "Txt.SetText("+text)}
    obj.SetHtml = function(html){prompt(obj.id, "Txt.SetHtml("+html)}
    obj.GetHtml = function(){return prompt(obj.id, "Txt.GetHtml(")}
    obj.Log = function(msg,options){prompt(obj.id, "Txt.Log(\f"+msg+"\f"+options)}
    obj.SetLog = function(maxLines){prompt(obj.id, "Txt.SetLog(\f"+maxLines)}
    obj.SetTextSize = function(size,mode){prompt(obj.id, "Txt.SetTextSize(\f"+size+"\f"+mode)}
    obj.GetTextSize = function(mode){return parseFloat(prompt(obj.id, "Txt.GetTextSize(\f"+mode))}
    obj.GetText = function(){return prompt(obj.id, "Txt.GetText(")}
    obj.SetTextColor = function(color){prompt(obj.id, "Txt.SetTextColor("+color)}
    obj.SetFontFile = function(file){prompt(obj.id, "Txt.SetFontFile(\f"+file)}
    obj.GetLineCount = function(){return parseInt(prompt(obj.id, "Txt.GetLineCount("))}
    obj.GetMaxLines = function(){return parseInt(prompt(obj.id, "Txt.GetMaxLines("))}
    obj.GetLineTop = function(line){return parseFloat(prompt(obj.id, "Txt.GetLineTop("+line))}
    obj.GetLineStart = function(line){return parseInt(prompt(obj.id, "Txt.GetLineStart("+line))}
    obj.SetEllipsize = function(mode){prompt(obj.id, "Txt.SetEllipsize(\f"+mode)}
    obj.SetTextShadow = function(radius,dx,dy,color){prompt(obj.id, "Txt.SetTextShadow(\f"+radius+"\f"+dx+"\f"+dy+"\f"+color)}
    obj.SetOnTouch = function(callback){prompt(obj.id, "Txt.SetOnTouch("+_Cbm(callback))}
    obj.SetOnTouchUp = function(callback){prompt(obj.id, "Txt.SetOnTouchUp("+_Cbm(callback))}
    obj.SetOnTouchMove = function(callback){prompt(obj.id, "Txt.SetOnTouchMove("+_Cbm(callback))}
    obj.SetOnTouchDown = function(callback){prompt(obj.id, "Txt.SetOnTouchDown("+_Cbm(callback))}
    obj.SetOnLongTouch = function(callback){prompt(obj.id, "Txt.SetOnLongTouch("+_Cbm(callback))}
    obj.SetTouchable = function(touchable){prompt(obj.id, "Txt.SetTouchable("+touchable)}
  } return obj;
}

Api.prototype.CreateTextEdit = function(text, width, height, options, use){
  var id = prompt("#", "App.CreateTextEdit("+text+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "Txe");
    obj.SetSize(width, height, use);
    obj.SetText = function(txt){prompt(obj.id, "Txe.SetText("+txt)}
    obj.SetHtml = function(html){prompt(obj.id, "Txe.SetHtml("+html)}
    obj.GetHtml = function(){return prompt(obj.id, "Txe.GetHtml(")}
    obj.SetHint = function(text){prompt(obj.id, "Txe.SetHint("+text)}
    obj.InsertText = function(text,start,end){prompt(obj.id, "Txe.InsertText(\f"+text+"\f"+start)}
    obj.ReplaceText = function(text,start,end){prompt(obj.id, "Txe.ReplaceText(\f"+text+"\f"+start+"\f"+end)}
    obj.GetText = function(){return prompt(obj.id, "Txe.GetText(")}
    obj.SetOnChange = function(callback){prompt(obj.id, "Txe.SetOnChange(\f"+_Cbm(callback))}
    obj.SetOnTouch = function(callback){prompt(obj.id, "Txe.SetOnTouch(\f"+_Cbm(callback))}
    obj.SetOnEnter = function(callback){prompt(obj.id, "Txe.SetOnEnter(\f"+_Cbm(callback))}
    obj.SetTextColor = function(color){prompt(obj.id, "Txe.SetTextColor("+color)}
    obj.SetTextSize = function(size,mode){prompt(obj.id, "Txe.SetTextSize(\f"+size+"\f"+mode)}
    obj.GetTextSize = function(mode){return parseFloat(prompt(obj.id, "Txe.GetTextSize(\f"+mode))}
    obj.GetLineCount = function(){return parseInt(prompt(obj.id, "Txe.GetLineCount("))}
    obj.GetMaxLines = function(){return parseInt(prompt(obj.id, "Txe.GetMaxLines("))}
    obj.GetLineTop = function(line){return parseFloat(prompt(obj.id, "Txe.GetLineTop("+line))}
    obj.GetLineStart = function(line){return parseInt(prompt(obj.id, "Txe.GetLineStart("+line))}
    obj.SetCursorColor = function(color){prompt(obj.id, "Txe.SetCursorColor(\f"+color)}
    obj.SetCursorPos = function(pos){prompt(obj.id, "Txe.SetCursorPos("+pos)}
    obj.GetCursorPos = function(){return parseInt(prompt(obj.id, "Txe.GetCursorPos("))}
    obj.GetCursorLine = function(){return parseInt(prompt(obj.id, "Txe.GetCursorLine("))}
    obj.SetSelection = function(start,stop){prompt(obj.id, "Txe.SetSelection(\f"+start+"\f"+stop)}
    obj.GetSelectedText = function(){return prompt(obj.id, "Txe.GetSelectedText(")}
    obj.GetSelectionStart = function(){return parseInt(prompt(obj.id, "Txe.GetSelectionStart("))}
    obj.GetSelectionEnd = function(){return parseInt(prompt(obj.id, "Txe.GetSelectionEnd("))}
    obj.Undo = function(){prompt(obj.id, "Txe.Undo(")}
    obj.Redo = function(){prompt(obj.id, "Txe.Redo(")}
    obj.ClearHistory = function(){prompt(obj.id, "Txe.ClearHistory(")}
  } return obj;
}

Api.prototype.CreateButton = function(text, width, height, options, use){
  var id = prompt("#", "App.CreateButton("+text+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "Btn");
    obj.SetSize(width, height, use);
    obj.SetEnabled = function(enable){prompt(obj.id, "Btn.SetEnabled(\f"+enable)}
    obj.SetOnTouch = function(callback){prompt(obj.id, "Btn.SetOnClick("+_Cbm(callback))}
    obj.SetOnTouchEx = function(callback){prompt(obj.id, "Btn.SetOnClick("+_Cbm(callback))}
    obj.SetText = function(text){prompt(obj.id, "Btn.SetText("+text)}
    obj.SetHtml = function(html){prompt(obj.id, "Btn.SetHtml("+html)}
    obj.GetText = function(){return prompt(obj.id, "Btn.GetText(")}
    obj.SetTextColor = function(clr){prompt(obj.id, "Btn.SetTextColor("+clr)}
    obj.SetFontFile = function(file){prompt(obj.id, "Btn.SetFontFile(\f"+file)}
    obj.SetTextShadow = function(radius,dx,dy,color){prompt(obj.id, "Btn.SetTextShadow(\f"+radius+"\f"+dx+"\f"+dy+"\f"+color)}
    obj.SetTextSize = function(size,mode){prompt(obj.id, "Btn.SetTextSize(\f"+size+"\f"+mode)}
    obj.GetTextSize = function(mode){return parseFloat(prompt(obj.id, "Btn.GetTextSize(\f"+mode))}
    obj.SetEllipsize = function(mode){prompt(obj.id, "Btn.SetEllipsize(\f"+mode)}
    obj.SetBackColor = function(clr){prompt(obj.id, "Btn.SetBackColor(\f"+clr)}
    obj.SetStyle = function(clr1,clr2,radius,strokeClr,strokeWidth,shadow){prompt(obj.id, "Btn.SetStyle(\f"+clr1+"\f"+clr2+"\f"+radius+"\f"+strokeClr+"\f"+strokeWidth+"\f"+shadow)}
  } return obj;
}

Api.prototype.CreateScroller = function(width, height, options, use){
  var id = prompt("#", "App.CreateScroller("+text+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "Scr");
    obj.SetSize(width, height, use);
    obj.AddChild = function(child){prompt(obj.id, "Scr.AddChild(\f"+(child?child.id:null))}
    obj.RemoveChild = function(child){prompt(obj.id, "Scr.RemoveChild(\f"+(child?child.id:null))}
    obj.DestroyChild = function(child){prompt(obj.id, "Scr.DestroyChild(\f"+(child?child.id:null))}
    obj.ScrollTo = function(x,y){prompt(obj.id, "Scr.ScrollTo\f"+x+"\f"+y)}
    obj.ScrollBy = function(x,y){prompt(obj.id, "Scr.ScrollBy\f"+x+"\f"+y)}
    obj.GetScrollX = function(){return parseFloat(prompt(obj.id, "Scr.GetScrollX("))}
    obj.GetScrollY = function(){return parseFloat(prompt(obj.id, "Scr.GetScrollY("))}
  } return obj;
}

Api.prototype.CreateImage = function(file, width, height, options, use){
  var id = prompt("#", "App.CreateImage("+file+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "Image");
   obj._auto= true; obj._gfb = "";
    obj.Clear = function(){if(obj._auto)prompt(obj.id, "Img.Clear("); else { this.Draw("c")} }
    obj.Update = function(){if(obj._auto)prompt(obj.id, "Img.Update("); else {prompt(obj.id, "Img.Batch("+obj._gfb); obj._gfb = ""} }
    obj.SetAutoUpdate = function(onoff){obj._auto=onoff;prompt(obj.id, "Img.SetAutoUpdate(\f"+onoff)}
    obj.SetPixelMode = function(onoff){prompt(obj.id, "Img.SetPixelMode(\f"+onoff)}
    obj.SetName = function(name){prompt(obj.id, "Img.SetName("+name)}
    obj.GetName = function(){return prompt(obj.id, "Img.GetName(")}
    obj.SetImage = function(image,width,height,options){
      if(typeof image=="string")prompt(obj.id, "Img.LoadImage(\f"+image+"\f"+width+"\f"+height+"\f"+options);
      elseprompt(obj.id, "Img.CopyImage(\f"+(image?image.id:null)+"\f"+width+"\f"+height+"\f"+options);
	}
	obj.GetPixelData = function(format,left,top,width,height){return prompt(obj.id, "Img.GetPixelData(\f"+format+"\f"+left+"\f"+top+"\f"+width+"\f"+height)}
	obj.SetPixelData = function(data,width,height,options){return prompt(obj.id, "Img.SetPixelData(\f"+data+"\f"+width+"\f"+height+"\f"+options)}
    obj.GetPixelColor = function(x,y){return eval(prompt(obj.id, "Img.GetPixelColor(\f"+x+"\f"+y))}
    obj.SetSize = function(width,height,options){prompt(obj.id, "Img.SetSize(\f"+width+"\f"+height+"\f"+options)}
    obj.GetHeight = function(){return parseFloat(prompt(obj.id, "Img.GetHeight("))}
    obj.GetWidth = function(){return parseFloat(prompt(obj.id, "Img.GetWidth("))}
    obj.GetAbsHeight = function(){return parseFloat(prompt(obj.id, "Img.GetAbsHeight("))}
    obj.GetAbsWidth = function(){return parseFloat(prompt(obj.id, "Img.GetAbsWidth("))}
    obj.SetOnTouch = function(callback){prompt(obj.id, "Img.SetOnTouch("+_Cbm(callback))}
    obj.SetOnTouchUp = function(callback){prompt(obj.id, "Img.SetOnTouchUp("+_Cbm(callback))}
    obj.SetOnTouchMove = function(callback){prompt(obj.id, "Img.SetOnTouchMove("+_Cbm(callback))}
    obj.SetOnTouchDown = function(callback){prompt(obj.id, "Img.SetOnTouchDown("+_Cbm(callback))}
    obj.SetOnLongTouch = function(callback){prompt(obj.id, "Img.SetOnLongTouch("+_Cbm(callback))}
    obj.SetOnLoad = function(callback){prompt(obj.id, "Img.SetOnLoad\f"+_Cbm(callback))}
    obj.SetTouchable = function(touchable){prompt(obj.id, "Img.SetTouchable("+touchable)}
    obj.SetMaxRate = function(ms){prompt(obj.id, "Img.SetMaxRate("+ms)}
    obj.SetColorFilter = function(clr,mode){prompt(obj.id, "Img.SetColorFilter(\f"+clr+"\f"+mode)}
    obj.AdjustColor = function(hue,sat,bright,cont){prompt(obj.id, "Img.AdjustColor(\f"+hue+"\f"+sat+"\f"+bright+"\f"+cont)}
    obj.MeasureText = function(txt){return eval(prompt(obj.id, "Img.MeasureText(\f"+txt))}
    obj.DrawImage = function(image,x,y,w,h,angle,mode){
      if(obj._auto)prompt(obj.id, "Img.DrawImage\f"+(image?image.id:null)+"\f"+x+"\f"+y+"\f"+w+"\f"+h+"\f"+angle+"\f"+mode);
      else this.Draw( "i", (image?image.id:null), x,y,(w?w:-1),(h?h:-1),angle,mode)}
	obj.DrawImageMtx = function(image,matrix){
      if(obj._auto)prompt(obj.id, "Img.DrawImageMtx\f"+(image?image.id:null)+"\f"+matrix);
      else this.Draw( "m", (image?image.id:null), matrix)}
    obj.DrawPoint = function(x,y){
      if(obj._auto)prompt(obj.id, "Img.DrawPoint("+x+"\f"+y); else this.Draw( "p", null, x,y)}
    obj.DrawCircle = function(x,y,radius){
      if(obj._auto)prompt(obj.id, "Img.DrawCircle("+x+"\f"+y+"\f"+radius);
      else this.Draw( "e", null, x,y,radius)}
    obj.DrawArc = function(x1,y1,x2,y2,start,sweep){
      if(obj._auto)prompt(obj.id, "Img.DrawArc("+x1+"\f"+y1+"\f"+x2+"\f"+y2+"\f"+start+"\f"+sweep);
      else this.Draw( "a", null, x1,y1,x2,y2,start,sweep)}
    obj.DrawLine = function(x1,y1,x2,y2){
      if(obj._auto)prompt(obj.id, "Img.DrawLine("+x1+"\f"+y1+"\f"+x2+"\f"+y2);
      else this.Draw( "l", null, x1,y1,x2,y2)}
    obj.DrawRectangle = function(x1,y1,x2,y2){
      if(obj._auto)prompt(obj.id, "Img.DrawRect("+x1+"\f"+y1+"\f"+x2+"\f"+y2);
      else this.Draw( "r", null, x1,y1,x2,y2)}
    obj.DrawText = function(txt,x,y){
      if(obj._auto)prompt(obj.id, "Img.DrawText("+txt+"\f"+x+"\f"+y);
      else this.Draw( "t", txt, x, y, 0,0,0)}
	obj.DrawSamples = function(data,range){
      if(obj._auto)prompt(obj.id, "Img.DrawSamples(\f"+data+"\f"+range);
      else this.Draw( "g", data, range, 0,0,0,0)}
	obj.SetAlpha = function(alpha){if(obj._auto)prompt(obj.id, "Img.SetAlpha("+alpha); else this.Draw( "k",null,alpha)}
    obj.SetColor = function(clr){if(obj._auto)prompt(obj.id, "Img.SetColor("+clr); else this.Draw( "o", clr)}
    obj.SetTextSize = function(size){if(obj._auto)prompt(obj.id, "Img.SetTextSize("+size); else this.Draw( "x",null,size)}
    obj.SetFontFile = function(file){if(obj._auto)prompt(obj.id, "Img.SetFontFile(\f"+file); else this.Draw( "f",file)}
    obj.SetLineWidth = function(width){if(obj._auto)prompt(obj.id, "Img.SetLineWidth("+width); else this.Draw( "w",null,width)}
    obj.SetPaintColor = function(clr){if(obj._auto)prompt(obj.id, "Img.SetPaintColor("+clr); else this.Draw( "n",clr)}
    obj.SetPaintStyle = function(style){if(obj._auto)prompt(obj.id, "Img.SetPaintStyle("+style); else this.Draw( "s",style)}
    obj.Rotate = function(angle,pivX,pivY){prompt(obj.id, "Img.Rotate("+angle+"\f"+pivX+"\f"+pivY)}
    obj.Move = function(x,y){prompt(obj.id, "Img.Move("+x+"\f"+y)}
    obj.Scale = function(x,y){prompt(obj.id, "Img.Scale("+x+"\f"+y)}
    obj.Skew = function(x,y){prompt(obj.id, "Img.Skew("+x+"\f"+y)}
    obj.Transform = function(matrix){prompt(obj.id, "Img.Transform(\f"+matrix)}
    obj.Reset = function(){prompt(obj.id, "Img.Reset(")}
    obj.Flatten = function(){prompt(obj.id, "Img.Flatten(")}
    obj.Save = function(fileName,quality){prompt(obj.id, "Img.Save\f"+fileName+"\f"+quality)}
    obj.DrawFrame = function(ms){prompt(obj.id, "Img.DrawFrame\f"+ms)}
    obj.Draw = function(func, p1, p2, p3, p4, p5, p6, p7 ) {
    if(obj._gfb.length>2)obj._gfb += "\f";
      obj._gfb += func + "�" + p1 + "�" + p2 + "�" + p3 + "�" + p4 + "�" + p5 + "�" + p6 + "�" + p7;
	}
  } return obj;
}

Api.prototype.CreateList = function(list, width, height, options, use){
  var id = prompt("#", "App.CreateList("+list+"\f-1\f-1\f"+options);
  if(id){
    var obj = new this.Obj(id, this, "List");
    obj.SetSize(width, height, use);
    obj.SetList = function(list,delim){prompt(this.id, "Lst.SetList(\f"+list+"\f"+delim)}
    obj.GetList = function(delim){return eval(prompt(obj.id, "Lst.GetList("+delim))}
    obj.AddItem = function(title,body,image){prompt(obj.id, "Lst.AddItem(\f"+title+"\f"+body+"\f"+image)}
    obj.InsertItem = function(index,title,body,image){prompt(obj.id, "Lst.InsertItem(\f"+index+"\f"+title+"\f"+body+"\f"+image)}
    obj.SetItem = function(title,newTitle,newBody,newImage){prompt(obj.id, "Lst.SetItem(\f"+title+"\f"+newTitle+"\f"+newBody+"\f"+newImage)}
    obj.SetItemByIndex = function(index,newTitle,newBody,newImage){prompt(obj.id, "Lst.SetItemByIndex(\f"+index+"\f"+newTitle+"\f"+newBody+"\f"+newImage)}
    obj.RemoveItem = function(title){prompt(obj.id, "Lst.RemoveItem(\f"+title)}
    obj.RemoveItemByIndex = function(index){prompt(obj.id, "Lst.RemoveItemByIndex(\f"+index)}
    obj.RemoveAll = function(){prompt(obj.id, "Lst.RemoveAll(")}
    obj.SelectItem = function(title,body,scroll){var p="Lst.SelectItem(\f"+title+"\f"+body+"\f"+scroll; prompt(obj.id,p)}
    obj.SelectItemByIndex = function(index,scroll){var p="Lst.SelectItemByIndex(\f"+index+"\f"+scroll; prompt(obj.id,p)}
    obj.GetItem = function(title){var p="Lst.GetItem(\f"+title; return eval(prompt(obj.id,p))}
    obj.GetItemByIndex = function(index){var p="Lst.GetItemByIndex(\f"+index; return eval(prompt(obj.id,p))}
    obj.GetLength = function(){return parseInt(prompt(obj.id,"Lst.GetLength("))}
    obj.ScrollToItem = function(title,body){var p="Lst.ScrollToItem(\f"+title+"\f"+body; prompt(obj.id,p)}
    obj.ScrollToItemByIndex = function(index){var p="Lst.ScrollToItemByIndex(\f"+index; prompt(obj.id,p)}
    obj.SetOnTouch = function(callback){prompt(obj.id, "Lst.SetOnClick("+_Cbm(callback))}
    obj.SetOnLongTouch = function(callback){prompt(obj.id, "Lst.SetOnLongClick("+_Cbm(callback))}
    obj.SetTextColor = function(clr){prompt(obj.id, "Lst.SetTextColor1("+clr)}
    obj.SetTextColor1 = function(clr){prompt(obj.id, "Lst.SetTextColor1("+clr)}
    obj.SetTextColor2 = function(clr){prompt(obj.id, "Lst.SetTextColor2("+clr)}
    obj.SetHiTextColor1 = function(clr){prompt(obj.id, "Lst.SetHiTextColor1("+clr)}
    obj.SetHiTextColor2 = function(clr){prompt(obj.id, "Lst.SetHiTextColor2("+clr)}
    obj.SetTextSize = function(size,mode){prompt(obj.id, "Lst.SetTextSize1(\f"+size+"\f"+mode)}
    obj.SetTextSize1 = function(size,mode){prompt(obj.id, "Lst.SetTextSize1(\f"+size+"\f"+mode)}
    obj.SetTextSize2 = function(size,mode){prompt(obj.id, "Lst.SetTextSize2(\f"+size+"\f"+mode)}
    obj.GetTextSize = function(mode){return parseFloat(prompt(obj.id, "Lst.GetTextSize(\f"+mode))}
    obj.SetColumnWidths = function(icon,title,body,mode){prompt(obj.id, "Lst.SetColumnWidths(\f"+icon+"\f"+title+"\f"+body+"\f"+mode)}
    obj.SetTextMargins = function(left,top,right,bottom,mode,options){prompt(this.id, "Lst.SetTextMargins(\f"+left+"\f"+top+"\f"+right+"\f"+bottom+"\f"+mode+"\f"+options)}
    obj.SetIconMargins = function(left,top,right,bottom,mode){prompt(this.id, "Lst.SetIconMargins(\f"+left+"\f"+top+"\f"+right+"\f"+bottom+"\f"+mode)}
    obj.SetIconSize = function(size,mode){prompt(obj.id, "Lst.SetIconSize(\f"+size+"\f"+mode)}
    obj.SetEllipsize = function(mode){prompt(obj.id, "Lst.SetEllipsize1(\f"+mode)}
    obj.SetEllipsize1 = function(mode){prompt(obj.id, "Lst.SetEllipsize1(\f"+mode)}
    obj.SetEllipsize2 = function(mode){prompt(obj.id, "Lst.SetEllipsize2(\f"+mode)}
    obj.SetTextShadow = function(radius,dx,dy,color){prompt(obj.id, "Lst.SetTextShadow1(\f"+radius+"\f"+dx+"\f"+dy+"\f"+color)}
    obj.SetTextShadow1 = function(radius,dx,dy,color){prompt(obj.id, "Lst.SetTextShadow1(\f"+radius+"\f"+dx+"\f"+dy+"\f"+color)}
    obj.SetTextShadow2 = function(radius,dx,dy,color){prompt(obj.id, "Lst.SetTextShadow2(\f"+radius+"\f"+dx+"\f"+dy+"\f"+color)}
    obj.SetDivider = function(height,color){prompt(obj.id, "Lst.SetDivider(\f"+height+"\f"+color)}
    obj.SetFontFile = function(file){prompt(obj.id, "Lst.SetFontFile(\f"+file)}
	obj.AdjustColor = function(hue,sat,bright,cont){prompt(obj.id, "Lst.AdjustColor(\f"+hue+"\f"+sat+"\f"+bright+"\f"+cont)}
  } return obj;
}