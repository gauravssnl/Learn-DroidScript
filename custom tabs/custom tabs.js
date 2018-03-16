
function OnStart(){
  lay = app.CreateLayout("linear", "VCenter,FillXY");	
  
  tabs = app.CreateTabs(1, 1, "Img/tab.png", "Img/tabOn.png", 0.08, 0.005);
  tabs.SetBackColor("black");
  tabs.SetAnimation("scaleY");
  lay.AddChild(tabs);
    
  l = app.CreateLayout("Linear", "Horizontal");
  l.SetBackColor( "#cc22cc" );
  btn = app.CreateButton("page 1");
  l.AddChild(btn);
  tabs.AddTab(" page 1 ", l);
  
  l = app.CreateLayout("Linear", "Horizontal");
  btn = app.CreateButton("page 2");
  l.AddChild(btn);
  tabs.AddTab(" page 2 ", l);
  
  l = app.CreateLayout("Linear", "Horizontal");
  l.SetBackColor( "green" );
  btn = app.CreateButton("page 3");
  l.AddChild(btn);
  tabs.AddTab(" page 3 ", l);
  
  l = app.CreateLayout("Linear", "Horizontal");
  l.SetBackColor( "blue" );
  btn = app.CreateButton("page 4");
  l.AddChild(btn);
  tabs.AddTab(" page 4 ", l);
  
  app.AddLayout( lay );
}

app.CreateTabs = function(width, height, image, imageOn, tabsize, tabmargin){
  var _to = {
    tabs:[],
    pages:[],
    now: 0,
    anim: "",
    img: image,
    imgOn: imageOn,
    tm: tabmargin||0,
    ts: tabsize||0
  }
	var main = _to.main = app.CreateLayout("Linear");
	main.SetSize(width, height);
	
	var sc = app.CreateScroller(width,_to.ts);
	main.AddChild(sc);
	
	main.tz = app.CreateLayout("Linear", "Horizontal");
	main.tz.SetPadding(_to.tm, 0, _to.tm, 0);
	main.tz.SetSize(-1,_to.ts);
	sc.AddChild(main.tz);
	
	_to.cont = app.CreateLayout("Frame");
	_to.cont.SetSize(width, height-_to.ts);
	main.AddChild(_to.cont);
	
	main.SetAnimation = function(animation){
	  _to.anim = animation.toLowerCase()
	}

	main.AddTab = function(name, lay){
	  lay.SetSize(width, height);
	  var _lay = lay
	  var _tp = [0,0]
	  var l = app.CreateLayout( "Linear", "VCenter,TouchSpy" );
	  l.SetSize(-1, _to.ts);
	  l.SetMargins(_to.tm, 0,_to.tm, 0);
	  l.SetBackground(_to.img);
	  l.page = _to.pages.push(_lay)-1
	  var tabs = _to.tabs
	  tabs.push(l);
	  if(tabs.length>1)_lay.Hide();
	  if(l.page==0)l.SetBackground(_to.imgOn);
	  l.SetOnTouchDown(function(ev){
	    _tp = ev
	  })
	  l.SetOnTouchUp(function(){
	    var _lay = _to.pages[this.page]
	    var _now = _to.pages[_to.now]
	    var anim = _to.anim
	    var del = this.page-_to.now
	    if(del!=0){
	    switch(anim){
	      case "slidex":
	        if(del>0){
	          _now.Animate("SlideToLeft")
	          _lay.Animate("SlideFromRight")
	        }else{
	          _now.Animate("SlideToRight")
	          _lay.Animate("SlideFromLeft")}
	        break;
	      case "slidey":
	        if(del>0){
	          _now.Animate("SlideToBottom")
	          _lay.Animate("SlideFromTop")
	        }else{
	          _now.Animate("SlideToTop")
	          _lay.Animate("SlideFromBottom")}
	        break;
	      case "scalex":
	        if(del>0){
	          _now.Animate("ScaleToLeft")
	          _lay.Animate("ScaleFromRight")
	        }else{
	          _now.Animate("ScaleToRight")
	          _lay.Animate("ScaleFromLeft")}
	        break;
	      case "scaley":
	        if(del>0){
	          _now.Animate("ScaleToBottom")
	          _lay.Animate("ScaleFromTop")
	        }else{
	          _now.Animate("ScaleToTop")
	          _lay.Animate("ScaleFromBottom")}
	        break;
	      case "fade":
	        _now.Animate("FadeOut")
	        _lay.Animate("FadeIn")
	        break;
	      default:
	        _now.Hide()
	        _lay.Show()
	    }
	    _to.tabs[_to.now].SetBackground(_to.img);
	    this.SetBackground(_to.imgOn);
	    _to.now = this.page
	    }
	  });
	  _to.main.tz.AddChild(l);
	  var txt = app.CreateText(name, -1, -1, "FontAwesome,Html");
	  l.AddChild(txt);
	  _to.cont.AddChild(_lay);
	}
	
	return main
}