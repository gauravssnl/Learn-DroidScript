app.LoadScript('filemanager.js');
var ExitFlag = 'start';
app.EnableBackKey(false);

function OnStart()
{
	var lay = app.CreateLayout( "linear", "VCenter,FillXY" );
	lay.SetBackColor('#eeeeee');
	var b = app.CreateButton( "Filemanager", 0.8, 0.1, 'gray' );
	b.SetOnTouch(OnTouchSelectFile);
	lay.AddChild( b );
	app.AddLayout( lay );
}


function OnTouchSelectFile() {
    ExitFlag = 'filemanager';
    FileManager(SelectFile, [], '/storage/sdcard0');  
}


function SelectFile(path) {
    ExitFlag = 'start';
    CloseFM();
    alert(path);
}

function OnBack() {
    if (ExitFlag == 'filemanager') {
        if (BackFM())
            ExitFlag = 'start';
    }
    else if (ExitFlag = 'start') app.Exit()
}