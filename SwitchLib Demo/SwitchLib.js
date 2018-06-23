
/*
  * SwitchLib v0.95
  * by Midnightcoder
  */

var tools = new function(){
	this.txt = app.CreateText();
  this.img = app.CreateImage(null, 1, 1, "px");
  
  this.ToPx = function(val){
    this.txt.SetTextSize(1, val);
    return this.txt.GetTextSize("px");
  }
  this.Measure = function(text){
    return this.img.MeasureText(text);
  }
  this.Debug = function(obj){
    alert(JSON.stringify(obj, null, "   "));
  }
  this.SmoothColors = function(colors){
    var res = []
    if(typeof(colors)=="string") colors = colors.split(",");
    
    if(colors.length==1)colors.push(colors[0])
    colors.forEach(function(i, n){
	    colors[n] = tools.rgb(i);
	  })
	  
	  for(var a = 0; a<colors.length-1; a++){
  	  var
	      ti = false,
	      fc = colors[a+1],
	      tc = colors[a];
  	  for(var b = 0; !ti; b++){
  	    res.push(this.hex(tc[0],tc[1],tc[2]));
        tc.forEach(function(i, n){
          if(i<fc[n])tc[n]++;
          if(i>fc[n])tc[n]--;
        })
        if(tc.join("")==fc.join("")){
          ti=true;
          res.push(this.hex(tc[0],tc[1],tc[2]));
        }
	    }
  	}
	  return res;
  }

  this.rgb = function(c){
    c=c.slice(1).match(/.{2}/g);
    c[0]=parseInt(c[0], 16);
    c[1]=parseInt(c[1], 16);
    c[2]=parseInt(c[2], 16);
    return c;
  }
  
  this.hex = function(r,g,b){
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if(r.length==1)r="0"+r;
    if(g.length==1)g="0"+g;
    if(b.length==1)b="0"+b;
    return "#"+r+g+b;
  }
}

app.CreateSwitchView = function(width, height, options){
  options = (options||"").toLowerCase().split(",");
  if(!width)
    width = 60, options.push("sp");
  if(!height)
    height = 30;
  
  var ispx = true;
  options.forEach(function(i){
    if(i=="px"||i=="pt"||i=="sp"||i=="dpi"){
      var p = tools.ToPx(i);
      width *= p;
      height *= p;
      ispx = false;
    }
  })
  if(ispx)
    width *= app.GetDisplayWidth(),
    height *= app.GetDisplayHeight();
  
  var tmp = {
    size: {
      width: width,
      height: height
    },
    style: {
      spanColors: [],
      circleColors: []
    },
    active: false,
    opt: options,
    pos: 0,
    en: true,
    dur: 300,
    anim: false,
    Fix: function(){
      //Fix image view bug
	    sw.SetAutoUpdate(true);
	    this.Draw(tmp.active? 1: 0);
	    sw.SetAutoUpdate(false);
    },
    Draw: function(pos){
      if(pos>1)pos = 1;
      if(pos<0)pos = 0;
      sw.Clear();
      this.DrawFunc.call(sw, pos, this.size.width, this.size.height, this.style);
      sw.Update();
    },
    DrawFunc: function(pos, w, h, style){
      var
        span = {
          w: 0.35,
          h: 0.5
        },
        circle = {
          dia: 0.75
        },
        wc = w/2,
        hc = h/2,
        spnH = Math.round(hc*span.h),
        spnWc = span.w*wc
      
      this.SetPaintColor(style.spanColors[Math.round(pos*(style.spanColors.length-1))]);
      this.DrawRectangle(wc-spnWc, hc-spnH, wc+spnWc, hc+spnH);
      this.DrawCircle(wc-spnWc, hc, spnH);
      this.DrawCircle(wc+spnWc, hc, spnH);
      
      this.SetPaintColor(style.circleColors[Math.round(pos*(style.circleColors.length-1))]);
      this.DrawCircle(wc-spnWc+span.w*pos*w, hc, hc*circle.dia);
    },
    CalcFunc: function(pos){
      return Math.pow(pos, 5);
    }
  };
  
  var sw = app.CreateImage(null, width, height, "px");
	sw.SetPixelMode(true);
	sw.SetLineWidth(1.5);
	sw.SetMaxRate(0);
	sw.SetAutoUpdate(false);
	
	sw.SetStyle = function(spanColors, circleColors){
	  if(spanColors) tmp.style.spanColors = tools.SmoothColors(spanColors);
	  if(circleColors) tmp.style.circleColors = tools.SmoothColors(circleColors);
	  tmp.Fix();
	}

	sw.SetCalcFunction = function(func){
	  tmp.CalcFunc = func}
	sw.SetDrawFunction = function(func){
	  tmp.DrawFunc = func;
	  tmp.Fix();
	}
	sw.SetOnTouchUp(function(tp){
	  if(tmp.otu) tmp.otu.call(sw, tp);
	  if(tmp.en&&tp.x[0]>0&&tp.x[0]<1&&tp.y[0]>0&&tp.y[0]<1)
	    this.Switch();
	});
	sw.SetOnTouchUp = function(func){tmp.otu = func}
	sw.SetOnChange = function(callback){tmp.Callback = callback}
	/*sw.SetOnTouchMove(function(tp){
	  tmp.Draw(tp.x[0]);
	});*/
	sw.Switch = function(animation, position){
	  var start = Date.now();
	  if(animation==false){
	    if(typeof position!="undefined") tmp.active = position;
	    else tmp.active = !tmp.active;
	    tmp.Fix();
	  }
	  else if(!tmp.anim){
	    tmp.anim = true;
      tmp.tid = setInterval(function(){
        if(!tmp.anim) return;
        var time = Date.now() - start;
	      if(time>tmp.dur){
	        tmp.anim = false;
	        clearInterval(tmp.tid);
	        tmp.active = !tmp.active;
	        tmp.Fix();
	        if(tmp.Callback)tmp.Callback.call(sw);
	      } else{
	        pos = tmp.CalcFunc(time/tmp.dur);
          if(tmp.active) pos = 1-pos;
	        tmp.Draw(pos);
	      }
	    }, 1000/100);
	  }
  }
  sw.IsEnabled = function(){return tmp.en}
  sw.IsActive = function(){return tmp.active}
  sw.SetEnabled = function(enable){
    tmp.en = enable;
	  this.SetAutoUpdate(true);
    this.SetAlpha(tmp.en? 1: 0.5);
    this.SetAutoUpdate(false);
  }
  sw.SetDuration = function(duration){
    tmp.dur = duration;
  }
  
  sw.SetStyle("#A6A6A6,#4DB6AC", "#ECECEC,#009385");
  return sw;
}