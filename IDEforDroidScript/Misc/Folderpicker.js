/********************************************************************
 * FolderPicker Dialog =====================================================================
 * Creation date: 20-01-2015 by steve garman
 * Last update and changings: 22-01-2015 by octazid =====================================================================
 * Simple dialog to pick a folder ********************************************************************/

function FolderPicker(basePath,Textobj,Variable)
{
  var he = 0.15;
  if (app.IsTablet()) he = 0.2;
  var self = this;
  this.basePath = basePath;
  this.FolderPath = this.basePath;
  this.Text = Textobj;
  this.Vari = Variable;
  this.dlg = app.CreateDialog(this.basePath);
  this.lay = app.CreateLayout( "Linear", "FillXY" );
  this.txt = app.CreateText("",0.9,0.05,"Left,AutoScale");
  this.txt.SetTextSize(18);
  this.txt.parent = self;
  this.lay.AddChild(this.txt);
  this.lstFolds = app.CreateList("blank" , 0.9, he*2.5);
  this.lstFolds.parent = self;
  this.lstFolds.SetOnTouch(FolderPicker_NewFolder);  
  this.lay.AddChild(this.lstFolds);
  this.info = app.CreateText("Files in the selected Folder:",-1,-1,"Left");
  this.info.parent = self;
  this.info.SetMargins(0,0.01,0,0);
  this.lay.AddChild(this.info);
  this.lstFiles = app.CreateList("blank" , 0.9, he*0.75 );
  this.lstFiles.parent = self;
  this.lstFiles.SetMargins(0,0.01,0,0.01);
  this.lstFiles.SetBackColor( "#ff222222" );
  this.lstFiles.SetTextColor( "#ff777777" );
  this.lstFiles.SetDivider( 0.001, "#ff222222" );
  this.lay.AddChild(this.lstFiles);
  this.btnlay = app.CreateLayout( "Linear", "Horizontal,FillXY" );
  this.dlgbtn = app.CreateButton("OK", 0.3);
  this.dlgbtn.parent = self;
  this.dlgbtn.SetOnTouch(dlgbtn_OnTouch);
  this.btnlay.AddChild(this.dlgbtn);
  this.dlgbtnNewFolder = app.CreateButton("New Folder",0.15);
  this.dlgbtnNewFolder.parent = self;
  this.dlgbtnNewFolder.SetOnTouch(dlgbtnNewFolder_OnTouch);
  this.btnlay.AddChild(this.dlgbtnNewFolder);
  this.dlgbtnNewFile = app.CreateButton("New File",0.15);
  this.dlgbtnNewFile.parent = self;
  this.dlgbtnNewFile.SetOnTouch(dlgbtnNewFile_OnTouch);
  this.btnlay.AddChild(this.dlgbtnNewFile);
  this.dlgbtnCancel = app.CreateButton("Chancel",0.3);
  this.dlgbtnCancel.parent = self;
  this.dlgbtnCancel.SetOnTouch(dlgbtn_OnTouch);
  this.btnlay.AddChild(this.dlgbtnCancel);
  this.lay.AddChild(this.btnlay);
  this.dlg.AddLayout(this.lay);
  this.Show = function(){self.dlg.Show();};
  this.Hide = function(){self.dlg.Hide();};
  this.GetFolder = function(){return self.FolderPath;};
  this.SetFolder = function(folderPath)
  {
    self.FolderPath = folderPath;
    self.dlg.SetTitle("Select Folder:");
    self.txt.SetText(folderPath);
    app.ShowProgress( "Loading..." );
    var lst = app.ListFolder(folderPath);
    lst.sort(function(x,y){return (x.toLowerCase() > y.toLowerCase())?1:-1});
    var dirlist=[];
    var fillist = [];
    if( self.FolderPath != self.basePath ) dirlist = ["<..."];
    var ths = lst.shift();
    while (undefined != ths)
    {
    //skip hidden files
    if (ths.indexOf(".")!=0)
      {
      var pth = folderPath + "/" + ths;
      if (app.IsFolder(pth))
        {
          var fold = ths +":folder";
          dirlist.push(fold);
        }
      else
        {
           if (app.IsFolder(pth)!=1)fillist.push(ths);
        }     
      }
      ths = lst.shift();
    }
    self.lstFolds.SetList(dirlist);
    self.lstFiles.SetList(fillist);

    app.HideProgress();
  }  
}//function FolderPicker()



function FolderPicker_NewFolder(fil)
{
  var par = this.parent;
  var pth = par.GetFolder();
  if (fil != "<...")
  {
      pth += "/" + fil
  }
  else
  {
     if( pth == par.basePath || pth == "/" )
     {
       par.Hide()
       return;
     }
     var tst = pth.split("/");
     tmp = tst.pop();
     pth = (tst.join("/"));
  }
  this.parent.SetFolder(pth); 
}//function FolderPicker_NewFolder()



//Create a new Folder in the selected path
function dlgbtnNewFolder_OnTouch()
{
    var par = this.parent;
    var pth = par.GetFolder();    
    DlgNewFolder = new NewFolderDialog(pth + "/", par.lstFolds);
    DlgNewFolder.Show();    
}


//Create a new File in the selected path
function dlgbtnNewFile_OnTouch()
{
    var par = this.parent;
    var pth = par.GetFolder();    
    DlgNewFile = new NewFileDialog(pth + "/", par.lstFiles);
    DlgNewFile.Show();    
}


function dlgbtn_OnTouch()
{
  var par = this.parent;
  var pth = par.GetFolder();
  par.Hide();
  if(this.GetText() == "OK")
    {

//-v-----nur für diese App-----------------------------------
     par.Text = pth;
//-^-----nur für diese App-----------------------------------

     pickerresult = pth ;

//-v-----nur für diese App-----------------------------------
    lst = ""
    if ( app.ListFolder( pth+"/", ext ) != "")
    {
        lst = app.ListFolder( pth+"/", ext );
    }
        if ( app.ListFolder( pth+"/", ext2 ) != "")
    {
        if (lst != "") lst += ",";
        lst += app.ListFolder( pth+"/", ext2 );
    }
        if ( app.ListFolder( pth+"/", ext3 ) != "") 
    {   
        if (lst != "") lst += ",";
        lst += app.ListFolder( pth+"/", ext3 );
    }
        if ( app.ListFolder( pth+"/", ext4 ) != "")
    {
        if (lst != "") lst += ",";
        lst += app.ListFolder( pth+"/", ext4 );
    }
    filespin.SetList( lst );
    if (filespin.GetText() != "")
    {
        txt1 = app.ReadFile( pth+"/" + filespin.GetText()); 
        btnSave.SetVisibility ("Show");
        edt.SetText( txt1 );
    }
    else 
    {
        edt.SetText("");
        btnSave.SetVisibility ("Hide");
    }    
//-^-----nur für diese App-----------------------------------
    }

}//function dlgbtn_OnTouch





/********************************************************************
 * CreateNewFile Dialog =====================================================================
 * Creation date: 20-01-2015 by octazid
 * Last update: 22-01-2015 by octazid =====================================================================
 * Simple dialog to create a new file in a folder ********************************************************************/


//----CreateNewFile Dialog----
function NewFileDialog(savepath, control)
{
  var self = this;
  this.NfControl = control;
  this.Nfdlg = app.CreateDialog("Create a new File:");
  this.Nflay = app.CreateLayout( "Linear", "FillXY" );
  this.txtpath = app.CreateText(savepath,0.9,0.02,"Left,Autoscale");
  this.txtpath.SetMargins(0,0.01,0,0);
  this.txtpath.parent = self;
  this.Nflay.AddChild(this.txtpath);
  this.Nfedt = app.CreateTextEdit("",0.9,0.05,"Left");
  this.Nfedt.SetTextSize(18);
  this.Nfedt.SetHint("Filename.js");
  this.Nfedt.parent = self;
  this.Nflay.AddChild(this.Nfedt);
  this.Nfbtnlay = app.CreateLayout( "Linear", "Horizontal,FillXY" );
  this.Nfdlgbtn = app.CreateButton("OK", 0.45);
  this.Nfdlgbtn.parent = self;
  this.Nfdlgbtn.SetOnTouch(Nfdlgbtn_OnTouch);
  this.Nfbtnlay.AddChild(this.Nfdlgbtn);
  this.NfdlgbtnCancel = app.CreateButton("Chancel",0.45);
  this.NfdlgbtnCancel.parent = self;
  this.NfdlgbtnCancel.SetOnTouch(Nfdlgbtn_OnTouch);
  this.Nfbtnlay.AddChild(this.NfdlgbtnCancel);
  this.Nflay.AddChild(this.Nfbtnlay)
  this.Nfdlg.AddLayout(this.Nflay);
  this.Show = function(){self.Nfdlg.Show();}
  this.Hide = function(){self.Nfdlg.Hide();}
}//function NewFileDialog()


//Called if a button is touched
function Nfdlgbtn_OnTouch()
{
    var par = this.parent;
    file = par.Nfedt.GetText();
    path = par.txtpath.GetText();
    if(this.GetText()  == "OK") CreateFile(file, path, par.NfControl);
    par.Hide();
}//function dlgbtn_OnTouch


// Called if Button Ok is touched
function CreateFile(filename, path, control)
{
    if (filename != "")
    {
    //Replace illegal letters
    filename = filename.replace(/(=|\\|\/|\*|:|,|;|\+|<|>|\"|\[|\]|\?|\|)/g,"");

    //Replace double Whitespaces   
    filename = filename.replace(/(\s+)/g," "); 

    //Replace Whitespaces at the start and at the end            
    filename = filename.trim();

        //Check if File exists. if yes, show a message
        if (app.FileExists(path + filename))
        {
        app.Alert("Please select another Filename!", 
                  "Error - Filename already exists!");
        }
        else
        {
        //Create the file
        app.WriteFile(path + filename);
        //show a message if creation was ok
        if (app.FileExists(path + filename))
            app.ShowPopup("File Created!");
        control.AddItem(filename);
        }
    }
}//function CreateFile




/********************************************************************
 * CreateNewFolder Dialog =====================================================================
 * Creation date: 23-01-2015 by octazid
 * Last update: 23-01-2015 by octazid =====================================================================
 * Simple dialog to create a new folder ********************************************************************/


//*** CreateNewFile Dialog***//
function NewFolderDialog(savepath, control)
{
  var self = this;
  this.FControl = control;
  this.Fdlg = app.CreateDialog("Create a new Folder:");
  this.Flay = app.CreateLayout( "Linear", "FillXY" );
  this.Ftxtpath = app.CreateText(savepath,0.9,0.02,"Left,Autoscale");
  this.Ftxtpath.SetMargins(0,0.01,0,0);
  this.Ftxtpath.parent = self;
  this.Flay.AddChild(this.Ftxtpath);
  this.Fedt = app.CreateTextEdit("",0.9,0.05,"Left");
  this.Fedt.SetTextSize(18);
  this.Fedt.SetHint("Foldername");
  this.Fedt.parent = self;
  this.Flay.AddChild(this.Fedt);
  this.Fbtnlay = app.CreateLayout( "Linear", "Horizontal,FillXY" );
  this.Fdlgbtn = app.CreateButton("OK", 0.45);
  this.Fdlgbtn.parent = self;
  this.Fdlgbtn.SetOnTouch(Fdlgbtn_OnTouch);
  this.Fbtnlay.AddChild(this.Fdlgbtn);
  this.FdlgbtnCancel = app.CreateButton("Chancel",0.45);
  this.FdlgbtnCancel.parent = self;
  this.FdlgbtnCancel.SetOnTouch(Fdlgbtn_OnTouch);
  this.Fbtnlay.AddChild(this.FdlgbtnCancel);
  this.Flay.AddChild(this.Fbtnlay)
  this.Fdlg.AddLayout(this.Flay);
  this.Show = function(){self.Fdlg.Show();}
  this.Hide = function(){self.Fdlg.Hide();}
}//function NewFolderDialog()


// Called if a button is touched
function Fdlgbtn_OnTouch()
{
    var par = this.parent;
    folder = par.Fedt.GetText();
    path = par.Ftxtpath.GetText();
    if(this.GetText()  == "OK") CreateFolder(folder, path, par.FControl);
    par.Hide();
}//function Fdlgbtn_OnTouch


// Called if Button Ok is touched
function CreateFolder(foldername, path, control)
{
    if (foldername != "")
    {
    //Replace illegal letters
    foldername = foldername.replace(/(=|\\|\/|\*|:|,|;|\+|<|>|\"|\[|\]|\?|\|)/g,"");  

    //Replace double Whitespaces   
    foldername = foldername.replace(/(\s+)/g," "); 

    //Replace Whitespaces at the start and at the end            
    foldername = foldername.trim();

        //Check if Folder exists. If yes, show a message
        if (app.FolderExists(path + foldername))
        {
        app.Alert("Please select another Foldername!", 
                  "Error - Folder already exists!");
        }
        else
        {
        //Create the folder
        app.MakeFolder(path + foldername);
        //show a message if creation was ok
        if (app.FolderExists(path + foldername))
            app.ShowPopup("Folder Created!");
        control.AddItem(foldername,"new created",":folder");
        }
    }
}//function CreateFolder


