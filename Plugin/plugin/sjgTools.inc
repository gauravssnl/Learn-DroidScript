
function sjgTools()
{
	this.callback = null;
	
	this.GetVersion = function(  ) 
	{ 
	var fil=app.GetPrivateFolder("Plugins")+"/sjgtools/Version.txt";
	  var res="unknown";
	  if( app.FileExists(fil))
      res=app.ReadFile(fil);
    return res; 
	}
	
 	this.MyFunc = function( txt, num, bool ) 
 { 
		this.callback( txt + " World!!", num+20, !bool ); 
	}
	
 this.SetOnMyReply = function( cb ) 
 { 
		  this.callback = cb; 
	}

this.createTempIcon = function (overwrite)
{
    var filename = app.GetAppPath()+
        "/Img/"+app.GetAppName()+".png";
    if (! overwrite && app.FileExists(filename))
       return;
    app.MakeFolder("Img");
    var pixels=512;
    var w = pixels/app.GetDisplayWidth();
    var h =  pixels/app.GetDisplayHeight();
    var img = app.CreateImage(null,w,h);
    img.SetColor("#00000000");
  img.SetPaintColor( "#ff00dd00" );
  img.SetPaintStyle("Line")
  img.SetLineWidth(10)
  img.DrawRectangle( 0.03,0.03,0.97,0.97);
    img.SetLineWidth(3);
    img.SetTextSize(32);
    img.DrawText(app.GetAppName(),0.1,0.3);
  var dat = (new Date).toISOString()
     img.DrawText(dat.slice(0,10),0.1,0.5);
    img.DrawText("Temp icon",0.1,0.7)
    img.Save(filename); 
    app.ShowPopup(filename+ " created");
  }
  
//Create a menu dialog
this.createMenu=function(list)
{
    //Create dialog window.
    var dlg = app.CreateDialog( "Menu","notitle" );
    
    //Create a layout for dialog.
    var layDlg = app.CreateLayout( "linear", "vertical,fillxy,left" );
    layDlg.SetPadding( 0.02, 0, 0.02, 0.02 );
    dlg.AddLayout( layDlg );

    var txtTitle=app.CreateText("Menu",1,-1);
    txtTitle.SetBackColor("#00ffbf");
    txtTitle.SetTextColor("#000000");
    layDlg.AddChild(txtTitle);
    //Create a list control and add to dialog
    var lstDlg = app.CreateList( list, 0.8, 0.6 );
    lstDlg.SetTextSize( 22 );
    lstDlg.SetTextColor( "#dddddd" );
    lstDlg.SetOnTouch( OnMenu );
    layDlg.AddChild( lstDlg );

    //need a SetList function for changes to menu
    dlg.SetList=function(lst)
    {
        lstDlg.SetList(lst)        
    }
    //GetList function useful for adding to menu
    dlg.GetList=function()
    {
        return lstDlg.GetList(",")        
    }
    //need a SelectItem function for display choice
    dlg.SelectItem=function(item)
    {
lstDlg.SelectItem(item);       lstDlg.ScrollToItem(item);
    }
//SetTitle function
    dlg.SetTitle=function(title)
    {
       txtTitle.SetText(title);
    }

    return dlg
  }
 this.createFilePicker=function(Callback,basePath,orient)
  {
	    return new sjgToolsFilePicker(Callback,basePath,orient);
  }
  this.createProgress=function(size,makeDialog)
  {
	    return sjgToolsCreateProgress(size,makeDialog)
  }
}

function sjgToolsFilePicker(Callback,basePath,orient){
  var self = this;
  this.basePath = basePath || "/sdcard";
  this.callback = Callback || function(){};
  orient = orient || app.GetOrientation();
  orient = orient.toLowerCase();
  if(orient.indexOf("landscape")> -1)
    this.orient = "Landscape"
  else this.orient = "Portrait";
  this.FolderPath = this.basePath;
  this.hideHiddenFiles = false;
  this.visible=false;
  this.dlg = app.CreateDialog(" ","NoTitle");
  var layMain =app.CreateLayout("linear","vertical,fillxy,center");
  this.txtTitle = app.CreateText(this.FolderPath,1);
  this.txtTitle.SetEllipsize("start");
  this.txtTitle.SetBackColor("#00bfff");
  this.txtTitle.SetTextColor("#000000");
  layMain.AddChild(this.txtTitle);
  this.dlg.AddLayout(layMain);
  var lay_opts = "vertical,fillxy,center"
  var list_width = 0.7;
  var list_height = 0.45;
  if(this.orient=="Landscape") 
  {
     lay_opts = "horizontal,fillxy,left";
     list_width = 0.35;
     list_height = 0.7;
  }
  this.lay = app.CreateLayout( "linear", lay_opts );
  this.lstFolds = app.CreateList("blank" , list_width, list_height );
  this.lstFolds.parent = self;
  this.lstFolds.SetOnTouch(_Cb(this,"NewFolder"));  
  this.lay.AddChild(this.lstFolds);
  this.lstFiles = app.CreateList("blank", list_width, list_height );
  this.lstFiles.SetBackColor("#333333");
  this.lstFiles.parent = self;
  this.lstFiles.SetOnTouch(_Cb(this,"NewFile")); 
  this.lay.AddChild(this.lstFiles);
   layMain.AddChild(this.lay);

  this.Show = function(){
    self.visible = true;
    self.dlg.Show();
  }
  this.SetHideFiles=function(val){
    if(val == undefined) val = true;
    self.hideHiddenFiles = val;
  }
  this.Hide = function(){
    self.visible=false;
    self.dlg.Hide();
  }
  this.SetFilter = function(filter){
      self.fileFilter = filter;
  }
  this.GetFolder = function(){
    return self.FolderPath;
  }
  this.SetFolder = function(folderPath){
    self.FolderPath = folderPath;
    self.txtTitle.SetText(folderPath);
    app.ShowProgress( "Loading..." );
    var lst = app.ListFolder(folderPath);
    lst.sort(function(x,y){return (x.toLowerCase() > y.toLowerCase())?1:-1});
    var ths = lst.shift();
    self.lstFolds.SetList("");
    if( self.FolderPath != self.basePath )
      self.lstFolds.AddItem("..",null,"folder");
    self.lstFiles.SetList("");
    while (undefined != ths) {
      if ((! self.hideHiddenFiles) || (ths.indexOf(".") != 0)){
        var pth = folderPath + "/" + ths;
        if (app.IsFolder(pth))
           self.lstFolds.AddItem(ths,null,"folder")
        else
           self.lstFiles.AddItem(ths)
      }
      ths = lst.shift();
    }
    this.NewFolder= function(fil)
    {
       var par = self;
       var pth = par.GetFolder();
       if (fil != "..") {
           pth += "/" + fil
       }
       else{
          if( pth == par.basePath || pth == "/" ){
            par.Hide()
            return;
          }
          var tst = pth.split("/");
          var tmp = tst.pop();
          pth = (tst.join("/"));
          if(pth=="") pth = "/"
       }
       par.SetFolder(pth);
    }//function FilePicker_NewFolder()   
    this.NewFile=function(fil)
    {
       var par = self;
       var pth = par.GetFolder();
       par.Hide();
       par.callback(pth += "/" + fil);
    }//function FilePicker_NewFile()
    app.HideProgress();
  }  
}//function FilePicker()

function FilePicker_Renew(fp)
{
//var visible =  (fp.dlg.GetVisibility()=="Visible");
//app.Alert(fp.dlg.GetVisibility());
  var visible = fp.visible;
  var path = fp.FolderPath;
  var hide = fp.hideHiddenFiles;
  if(visible) fp.Hide();
  fp = new FilePicker(fp.callback, fp.basePath);
  fp.SetHideFiles(hide);
  fp.SetFolder(path);  
  if(visible) fp.Show();
  return fp;
}

 //makeDialog defaults to false
function sjgToolsCreateProgress(size,makeDialog)
{
    var width, height;
    var ratio = app.GetDisplayWidth() /
        app.GetDisplayHeight();
    if (ratio >= 1) // landscape
    {
        width = size / ratio;
        height = size;
    }
    else
    {
        width = size;
        height = size * ratio;
    }
    var img = app.CreateImage( null, width, height );
    img.width=width;
    img.height=height;
    img.cl=0.5-width/2;
    img.ct=0.5-height/2;
    //these properties can be set externally.
    img.mainColor= "#00000000"; //transparent
    img.paintColor = "#ffffffff" ;
    img.lineWidth = size * 60;
    img.textSize = size * 60;;
    img.noNumbers=false
    //////////////////
    img.interval=null
    img.intervalcount=0
    img.dialog=null
    img.SetAutoUpdate(false);
    if(makeDialog)
    {
      img.mainColor="#ff000088"; //not transparent
      var progress=app.CreateDialog("","NoTitle,NoxCancel");
      var layprog=app.CreateLayout("Linear","");
      layprog.AddChild(img);
      progress.AddLayout(layprog);
      img.dialog=progress;
    }
    //public function to draw arc and show dialog if needed
    img.setPercent=function(percent)
    { 
      img.Clear();
      img.SetColor(img.mainColor);
      img.SetPaintColor( img.paintColor );
      img.SetPaintStyle( "Line" );
      img.SetLineWidth( img.lineWidth );
      img.DrawArc(.1,.1,.9,.9, 269, percent*3.6);
      img.SetTextSize(img.textSize);
      img.SetLineWidth(1);
      if(percent && ! img.noNumbers)
        img.DrawText(percent.toFixed(0),.35,.55);
      img.Update();
      if(img.dialog && img.dialog.Visibilty != "Show")
          img.dialog.Show();
   }
   //public function to hide the dialog if there is one
   img.hide=function()
   {
       if(img.interval)
          clearInterval(img.interval);
       if(img.dialog) img.dialog.Hide();
       img.Clear();
   }
   //public function to increment
   img.countUp=function()
   {
       var val = (++ img.intervalcount) ;
       val = val % 100;
       img.setPercent(val);
       img.intrervalcount=val;   
   }

   return img;
}