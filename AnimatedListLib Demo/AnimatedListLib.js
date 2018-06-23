
/*
 * AnimatedListLib v1.0
 * by Midnightcoder
 */
app.CreateListItem = function(width){
  var lay = app.CreateLayout("Linear");
  lay.maxHeight = 0
  lay.active = false
  lay.width = width
  lay.SetSize(width);
  lay.CalcFun = function(hgt){return hgt}
  
  lay.SetCalcFun = function(fun){this.CalcFun = fun}
  lay.IsActive = function(){return this.active}
  lay.Animate = function(duration, callback){
    var self = this;
    if(!self.anim&&self.maxHeight!=0){
	    self.anim = true;
	    var start = Date.now();
      self.tid = setInterval(function(){
        if(!self.anim) return;
        var
          time = Date.now() - start,
	        hgt = time/duration;
	      if(hgt>1) hgt=1;
        if(self.active) hgt = 1-hgt;
	      hgt = self.CalcFun(hgt);
        if(hgt<0) hgt = 0;
	      self.SetSize(self.width, self.maxHeight*hgt);
	      if(time>duration){
	        self.anim = false;
	        clearInterval(self.tid);
	        self.active = !self.active;
	        if(callback) callback.call(self)
	      }
      }, 10) //100 fps (1000/100 = 10)
    }
  }
  lay.Done = function(){
    var self = this;
    setTimeout(function(){
      self.maxHeight = self.GetHeight();
      self.SetSize(self.width, 0);
    })
  }
  
  return lay
}