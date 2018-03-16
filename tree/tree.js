_AddOptions("NODOM");

proj = [["test", [
    ["Html", []],
    ["Img", [
      ["test.png", "img"]
    ]],
    ["Snd", []],
    ["Misc", []],
    ["test.js", "file"],
  ]
]]

count = function(o){
  var c = 0
  o.forEach(function(i){
    c++
    if(typeof i[1]=="object") c += count(i[1])
  })
  return c
}

	dens = app.GetScreenDensity();
	w = app.GetScreenWidth();
	h = app.GetScreenHeight();
	
	imgW = 1920
	imgH = 1080
	count = count(proj);
	textS = imgH/count
	textS3 = textS/3
	textS5 = textS/5
	lineW = textS/10
	target = false
	
	if(typeof target == "number") target = [target]
	
  lay = app.CreateLayout("Linear", "VCenter,FillXY");
  
	img = app.CreateImage(null, imgW, imgH, "px,FontAwesome");
	
	img.SetSize(w, imgH/imgW*w, "px");
	img.SetLineWidth(144/dens*lineW);
	img.SetTextSize(144/dens*textS);
	img.SetAutoUpdate(false);
	img.SetPixelMode(true);
	img.DrawRoundRectangle = function(x1, y1, x2, y2, r){
	  img.DrawArc(x1, y1, x1+r, y1+r, 180, 90);
	  img.DrawLine(x1+r/2, y1, x2-r/2, y1);
	  
	  img.DrawArc(x2-r, y1, x2, y1+r, 270, 90);
	  img.DrawLine(x2, y1+r/2, x2, y2-r/2);
	  
	  img.DrawArc(x2-r, y2-r, x2, y2, 0, 90);
	  img.DrawLine(x1+r/2, y2, x2-r/2, y2);
	  
	  img.DrawArc(x1, y2-r, x1+r, y2, 90, 90);
	  img.DrawLine(x1, y1+r/2, x1, y2-r/2);
	}

	lay.AddChild(img);
	
	app.AddLayout(lay);
	
	line = 0
	draw = function(o, padd){
    padd += textS/2
    var color = "#ffffff"
    var icon = ""
    var start = line
    var fin = 0
    o.forEach(function(i, n){
      if(typeof i[1]=="object"){
        color = "#FFC107";
        icon = "[fa-folder]";
        if(i[1].length>0) icon = "[fa-folder_open]";
      }
      else 
      switch(i[1]){
        case "file":
          color = "#03A9F4"
          icon = "[fa-file]"
          break;
        case "img":
          color = "#8BC34A"
          icon = "[fa-image]"
          break;
        default:
          
      }
      img.DrawLine(padd-textS3+lineW/2, textS/1.5+textS*line-textS5, padd, textS/1.5+textS*line-textS5);
      img.SetPaintColor(color);
      img.DrawText(icon, padd, textS+textS*line-textS5);
      
      if(target)
      if(~target.indexOf(line)){
        img.SetPaintColor("#E91E63");
        img.SetPaintStyle("line");
        img.DrawRoundRectangle(padd+textS+lineW/2, textS*line+lineW/2, padd+textS+img.MeasureText(i[1]).width+lineW*2, textS+textS*line-lineW/2, lineW);
        img.SetPaintStyle("fill");
        img.SetPaintColor("#ffffff");
      }
      img.SetPaintColor("#ffffff");
      img.DrawText(i[0], padd+lineW+textS, textS+textS*line-textS5);
      
      line++
      fin = line
      if(typeof i[1]=="object"&&i[1].length>0) fin = draw(i[1], padd)
    })
    
    if(padd!=textS/2){
      img.DrawLine(padd-textS3, textS*start-textS5, padd-textS3, textS*fin-textS3-lineW/2-textS5);
      img.SetPaintStyle("line");
      img.DrawArc(padd-textS3, textS*fin-textS3-lineW-textS5, padd-textS3+lineW, textS*fin-textS3-textS5, 90, 90);
      img.SetPaintStyle("fill");
    }
    return start
  }
  draw(proj, 0)
  
  img.Update()
  
  img.Save("/sdcard/KineMaster/Assets/Images/tree.png");