"use strict";

var Tools = new class{
  constructor(){
    this.dens = app.GetScreenDensity();
    this.ts = this.dens/144
    this.img = app.CreateImage(null, 1, 1, "px");
  }
  Measure(text){
    return this.img.MeasureText(text);
  }
  isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  MergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.MergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return this.MergeDeep(target, ...sources);
  }
}

app.CreateSwitch = function(width, height, options){
  let reg = {
    options: (options||"").toLowerCase().split(","),
    touch: false,
    fps: 100,
    dur: 100,
    on: false,
    pos: 0,
    clbk: null,
    buf: [],
    buffered: false
  }
  
  reg.fps = Math.round(reg.fps/10)*10
  reg.dur = Math.round(reg.dur/10)*10
  
  reg.style = {
    circle: {
      size: 0.8,
      color: "#00796B"
    },
    span: {
      width: 0.5,
      height: 0.5,
      color: "#009688"
    }
  }
  
  let ds = reg.options.indexOf("pt")!=-1? Tools.ts:1
  let w = ds*width||40*Tools.ts
  let h = ds*height||20*Tools.ts
  let wc = w/2
  let hc = h/2
  let padd = w*reg.style.span.width/2
  let spnH = Math.floor(h*reg.style.span.height/2)
  
  let res = app.CreateImage(null, w, h, "px,resize");
  
  res.SetPixelMode(true);
  res.SetAutoUpdate(false);
  app.SetDebugEnabled(false);
  
  res.SetStyle = function(newStyle){
    reg.buffered = false
	  reg.style = Tools.MergeDeep(reg.style, newStyle);
	  
    padd = w*reg.style.span.width/2
    spnH = Math.floor(h*reg.style.span.height/2)
    
    res.SetAutoUpdate(true);
	  reg.Draw();
    res.SetAutoUpdate(false);
	}

  reg.Draw = function(){
    res.Clear();
    res.SetPaintColor(reg.style.span.color);
    res.DrawRectangle(wc-padd, hc-spnH, wc+padd, hc+spnH);
    res.DrawCircle(wc-padd, hc, spnH);
    res.DrawCircle(wc+padd, hc, spnH);
    res.SetPaintColor(reg.style.circle.color);
    if(reg.on)
      res.DrawCircle(wc+padd-reg.pos, hc, h*reg.style.circle.size/2);
    else
      res.DrawCircle(wc-padd+reg.pos, hc, h*reg.style.circle.size/2);
    res.Update();
  }
  
  res.IsOn = function(){
	  return reg.on;
	}

  res.SetOnChange = function(callback){reg.clbk = callback}
  res.SetOnTouchUp(function(tp){
	  if(!reg.touch&&tp.x[0]>0&&tp.x[0]<1&&tp.y[0]>0&&tp.y[0]<1){
	    reg.touch = true
	    let fr = 0;
	    let count = reg.dur*reg.fps/1000;
	    let tid = setInterval(function(){
	      
        if(fr>count){
          clearInterval(tid);
          reg.touch = false;
          reg.on = !reg.on;
          reg.pos = 0;
          reg.buffered = true;
          if(reg.clbk)reg.clbk.call(res, tp);
        }
        else{
          if(!reg.buffered){
            reg.pos = padd*2*reg.func.call(res, fr, reg.dur, reg.fps);
            reg.buf[fr] = reg.pos;
          }
          else reg.pos = reg.buf[fr];
	        reg.Draw();
        }
	      fr++
	    }, 1000/reg.fps)
    }
  });
  
  res.SetFunction = function(func){
    reg.buffered = false
	  reg.func = func;
	}
  
  reg.func = function(fr, dur, fps){
    return Math.pow(fr/dur*1000/fps, 0.5);
  }
  
  reg.Draw();
  return res
}