app.LoadPlugin('FuncsLib'); // library functions

var gl=app.CreateAppScr();
var gd=app.CreateGenDlg('','notitle,border');
var greet=true;
var s2=s3=null;
var htxt='Generic App Layout Screen\nTouch the icon on the top left'+
    '\nTouch the app name\nFlip/Rotate the device\nTry all buttons\nTry the menu buttons last';
    
//Called when application is started.
function OnStart() {
    // status bar. icon
    gl.StatusBar(1,1);
    gl.TopIcon(1,20,'[fa-bars]',go_icon);
    
    // top status bar
    gl.MakeBtn('t','on','btnid',go_btnMenu,'MENU');
    gl.MakeBtn('t',true,'screen',go_black,'SCRN OFF');
    gl.MakeBtn('t',true,'screen',go_test,'TEST');
    
    // bottom status bar
    gl.MakeBtn('b',true,'',go_midtxt,'MID TXT');
    gl.MakeBtn('bot',1,'btnid',go_exit,'EXIT');
    
    // make the app screen
    gl.MakeLay(' FuncLib',go_apname);

    // add text element on screen 
    s2=gl.GetMidLay();
    s3=gl.GetMidLay();
    txt = app.CreateText( htxt,-1,-1,"multiline" );
    txt.SetTextSize( 20 );
    s2.AddChild( txt );

} // OnStart()

// add ScrnRefresh to onconfig to rotate
// the app screen when the device rotates
function OnConfig() {
    gl.ScrRefresh();
}

// black out the middle layout
function go_black() { 
    var s2=gl.GetMidLay();
    var sh=s2.GetVisibility().toLowerCase();
    //alert(sh);
    if (sh=='show') {
        s2.SetVisibility('hide');
        gl.LinkBtn('screen',go_black,'SCRN  ON');
    }
    else {
        s2.SetVisibility('show');
        gl.LinkBtn('screen',go_black,'SCRN OFF');
    }
}

// change middle layout text
/* 
	possible bug....
	switching fails when menu button was pressed
	mid lay button will fail
	but var s3 and s4 shows its still the same reference
*/
function go_midtxt() { 
    var sh=s3.GetVisibility().toLowerCase();
    if (sh=='show') {
        if (greet) {

            txt.SetText('Hello World\nPress again please.');
            greet=false;
        }
        else {
            txt.SetText(htxt);
            greet=true;
            /*
            	uncomment the following lines below
				to compare var s3 and s4
            */
            var s4=gl.GetMidLay();
         //   if (s3==s4) alert('same reference');
         //   else alert('not the same reference');

        }
    }
}

// other functions
function go_exit () { app.Exit(); }
function go_test() { 
    alert('test function works'); 
    var sw=app.CreateStopwatch();
}
function go_icon() { app.ShowPopup('Top left icon touched'); }

// display funclib version
function go_apname() { 
    var fl=app.CreateFuncsLib();
    fl.FuncsLibVerChk();
}

// display button dialog
function go_btnMenu( ) {
    gd=app.CreateGenDlg('','notitle,border');
    gd.AddButton('id1',btnPressed,'\t\t\tOne\t\t\t');
    gd.AddButton('id2',btnPressed,'Dialog Text');
    gd.AddButton('id3',btnPressed,'Image Dialog');
    gd.AddButton('id4',btnPressed,'Text Columns');
    gd.AddButton('id5',btnPressed,'Text Edit');
    gd.AddButton('id6',btnPressed,'List Dialog');
    gd.AddButton('id7',btnPressed,'Checkbox Dialog');
    //gd.AddButton('',btnExit,'Exit')
    gd.Txt('');
}

// button pressed
function btnPressed( ) {
    var sel=ss='';
    sel=gd.GetBtnPressed();
    switch (sel) {
        case 'id1': ss='Button One pressed'; break;
        case 'id2': gdTxt(); break;
        case 'id3': gdImage(); break;
        case 'id4': gdTxtCol(); break;
        case 'id5': gdTxtEdit(); break;
        case 'id6': gdList(); break;
        case 'id7': gdCheckbox(); break;
        case 'id10': ss='Cancel pressed'; break;
    }
    if (ss!='') app.ShowPopup(ss,'bottom');
}

// do nothing
function do_nothing() {
    var sel='';
    sel=gd.GetBtnPressed();
    if (sel=='id5') gd.SetBtnPressed('id10');
    btnPressed();
}

// dialog text
function gdTxt() {
    gd=app.CreateGenDlg('Generic Dialog Text','layleft,txtright,hbtn');
    // no action when button pressed
    gd.AddButton ('',do_nothing,'Ok');
    var ss='my layout align to the left side\nmy text dialog align to the right\n'+
    'have 1 button';
    gd.Txt(ss,0.95);
}

// dialog image
function gdImage() {
    gd=app.CreateGenDlg('Image Dialog','txttitle,border');
    gd.AddButton ('',do_nothing,'Ok');
    gd.Image('/Sys/Img/Droid1.png',0.2,-1,'hello there');
}

// text edit dialog
function gdTxtEdit() {
    gd=app.CreateGenDlg('Text Edit Dialog','txttitle,enum');
    gd.AddButton('',btnTEOk,'Ok');
    gd.AddButton('id5',do_nothing,'Cancel');
    gd.TxtEdit('Edit me',0.2);
}

// show text edit results
function btnTEOk() {
    app.ShowPopup ('ok button pressed\n\nstring was: '+gd.GetTxtEdit( ));
}

// text columns
function gdTxtCol( ) {
    var ss1=''; ss2=''; ss3='';
    for (var i=0;i<30;i++) { ss1+='Line '+i+'\n'; }
    for (var i=0;i<50;i++) { ss2+='Line '+i+'\n'; }
    for (var i=0;i<70;i++) { ss3+='Line '+i+'\n'; }
    gd=app.CreateGenDlg('Multiple Column Dialog','txtcol,txttitle,txtcol,txtcolleft,scroll');
    gd.AddButton ('',do_nothing,'Ok');
    gd.Txt(ss1+','+ss2+','+ss3);
}

// list dialog
function gdList( ) {
    var ss='List One,List Two,List Three';
    gd=app.CreateGenDlg('List Dialog','txttitle');
    gd.AddButton ('',do_nothing,'Cancel');
    gd.List(ss,lst_pick);
}

// list item picked
function lst_pick(itm) {
    app.ShowPopup('item selected: '+itm);
}

// checkbox dialog
function gdCheckbox( ) {
    gd=app.CreateGenDlg('Checkboxes','layleft,txttitle');
    // 3 checkbox field entered
    // remaining 2 will have default value as false
    var ss='One\n- 1st extra line\n- 2nd extra line,Two,Three\n- will be evaluated,Four,Five';
    gd.AddButton ('',btnCheckbox,'Ok');
    gd.Checkbox(ss,'1,0,1');
}

// show checkbox results
function btnCheckbox( ) {
    var chkval=gd.GetCheckboxVal();
    // arrays start at 0
    // so 3rd checkbox is 2
    app.ShowPopup('Checkbox Values returned: '+chkval+'\n\n3rd checkbox is '+chkval[2]);
}