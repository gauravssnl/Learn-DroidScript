_AddOptions("nodom");
app.LoadScript("SwitchLib.js");
app.SetBackColor("#333333");
var pi = Math.PI;

function OnStart(){
  lay = app.CreateLayout("Linear", "FillXY,VCenter");
  
  sw = app.CreateSwitchView();
  sw.SetOnChange(function(){
	  alert("Active: "+this.IsActive());
	})
  lay.AddChild(sw);
  
  sw = app.CreateSwitchView();
  sw.SetCalcFunction(func);
  sw.SetStyle("#cccccc,#53d769", "#eaeaea");
  sw.SetDrawFunction(draw);
  lay.AddChild(sw);
  
  sw = app.CreateSwitchView();
  sw.SetCalcFunction(func);
  sw.SetStyle("#cccccc,#53d769", "#eaeaea");
  sw.SetDrawFunction(draw);
  lay.AddChild(sw);
  
  sw = app.CreateSwitchView();
  sw.Switch(false);
  sw.SetOnTouchUp(function(){
	  alert("Disabled ;)")
	});
	sw.SetEnabled(false);
  lay.AddChild(sw);
  
  //MLG style)
  sw = app.CreateSwitchView(80, 80, "sp");
	sw.SetDuration(1000);
	sw.SetStyle("#FF0000,#FF7F00,#FFFF00,#00FF00,#0000FF,#4B0082,#8F00FF","#8F00FF,#4B0082,#0000FF,#00FF00,#FFFF00,#FF7F00,#FF0000");
	sw.SetCalcFunction(function(pos){
    return Math.sin(pos*pi/2);
  });
	sw.SetDrawFunction(function(pos, w, h, style){
    var
      cos = Math.abs(Math.cos(pos*pi)),
      span = {
        w: 0.5*cos,
        h: 0.25
      },
      circle = {
        dia: 0.25+Math.sin(pos*pi)/2
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
    this.Rotate(cos*180);
  });
  sw.Switch(true);
  lay.AddChild(sw);
  
  app.AddLayout(lay);
}

function func(pos){
  return 1 - Math.sin(Math.acos(pos));
}

function draw(pos, w, h, style){
  var
    span = {
      w: 0.4,
      h: 0.8
    },
    circle = {
      dia: 0.7
    },
    wc = w/2,
    hc = h/2,
    spnH = Math.round(hc*span.h),
    spnWc = span.w*wc
    
  this.SetPaintColor(style.spanColors[Math.round(pos*(style.spanColors.length-1))]);
  this.DrawRectangle(wc-spnWc, hc-spnH, wc+spnWc, hc+spnH);
  this.DrawCircle(wc-spnWc, hc, spnH);
  this.DrawCircle(wc+spnWc, hc, spnH);
  
  //IO
  this.SetPaintColor("#eeeeee");
  this.SetPaintStyle("line");
  this.DrawLine(wc-spnWc, hc-spnH/3, wc-spnWc, hc+spnH/3);
  this.DrawCircle(wc+spnWc, hc, spnH/3);
  this.SetPaintStyle("fill");
  
  this.SetPaintColor(style.circleColors[Math.round(pos*(style.circleColors.length-1))]);
  this.DrawCircle(wc-spnWc+span.w*pos*w, hc, hc*circle.dia);
}