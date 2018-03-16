
var myVar="visible";
var finished="false";

var marks=["àèìòùħ","áéíóú","âêîôû","ŕ","ś","ė","ñ","ý","ø","õ","ç","ő","τ","ö","ŝ","ā","ĉ","å","ō","ã","ţ","ï","ĝ","ü","ŷ","ð","ť","σ","þ","υ","ë","ū","ć","ẏ","ĩ","δ","ĕ","μ","ũ","ĵ"];
var layouthash={N:"Normal",S:"Sequential",C:"Columns"};



//Create horizontal sub-layout for buttons.
function createButtons()
{	
	layHoriz = app.CreateLayout( "linear", "Horizontal" );	
	
	//Create 'Book' button.
	btnBook = app.CreateButton( "[fa-book]", -1,0.07,"FontAwesome");
	btnBook.SetOnTouch( btnBook_OnTouch );
	btnBook.SetBackColor('#ff444428');
	btnBook.SetMargins(0.01,0.01,0.01,0.01);
	layHoriz.AddChild( btnBook );
	
		//Create 'Settings' button.
	btnSettings = app.CreateButton( "[fa-bars]",-1,0.07,"FontAwesome" );
	btnSettings.SetOnTouch( btnSettings_OnTouch );
	btnSettings.SetBackColor('#ff444428');
	btnSettings.SetMargins(0.01,0.01,0.01,0.01);
	layHoriz.AddChild( btnSettings );
	
		//Create 'Back' button.
	btnBack = app.CreateButton( "[fa-arrow-left]",-1,0.07,"FontAwesome"  );
	btnBack.SetOnTouch( btnBack_OnTouch );
	btnBack.SetBackColor('#ff444428');
	btnBack.SetMargins(0.01,0.01,0.01,0.01);
	layHoriz.AddChild( btnBack );
  lay.AddChild( layHoriz );
}

//Called when application is started.
function OnStart()
{
     var filterstr='th,ch,ing';
     
     if(window.localStorage['virgin']==undefined){
      window.localStorage['oy']='oy'
    window.localStorage['oi']='oi' 
    window.localStorage['õụ']='õụ' 
    window.localStorage['oụ']='oụ' 
      window.localStorage['ch']='ch' 
    window.localStorage['th']='th' 
     window.localStorage['COLORVOICED']='COLORVOICED'
     window.localStorage['lower-cutoff']=6
     window.localStorage['markThresh']=40
     }
     
     		//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	web = app.CreateWebView( 1, 0.90,"AllowZoom" );
	app.AddLayout( lay );
	web.LoadUrl('splash.html');
	web.LoadUrl("splash.html");
	lay.AddChild( web );
	app.ShowProgress('loading...');
	web.SetOnProgress( web_OnProgess );
   txt='';
		createButtons();
	MakeDrawer()
	window.localStorage['virgin']='no';
}

//Called when user touches 'Back' button.
function btnBack_OnTouch() {web.Back();}

//Called when user touches 'Book' button.

function btnBook_OnTouch(){web.LoadUrl( "BookA.html");}
function btnSettings_OnTouch(){web.LoadUrl( "options.html");}


//Show page load progress.
//function web2_OnProgess( progress )
function web_OnProgess( progress )
{
	app.Debug( "web_OnProgress: progress = " + progress );
	if( progress==100 ) 
	{
	//    makeDic();
	    app.HideProgress();
//	    lay.RemoveChild( img );
	    }
}

function MakeDrawer()
{
 
  layDrawer = app.CreateLayout( "Linear", "VCenter,FillXY" );
  layDrawer.SetBackColor( "#ff000000" );  
  orient = app.GetOrientation();
	if (orient == "Portrait") var width=0.9;
	 else  var width=0.65;	
	 
  app.AddDrawer( layDrawer, "left", width );

  freqSkb = app.CreateSeekBar( 0.55 );
  freqSkb.SetRange( 288 );
  var frVal=window.localStorage['lower-cutoff']
  var fVal=6;
  if(frVal!==undefined) fVal=Math.round(2*Math.pow(frVal,0.66667));
// var fVal=Math.round(window.localStorage['lower-cutoff']*Math.sqrt(window.localStorage['lower-cutoff']))
  freqSkb.SetValue(fVal);
  freqSkb.SetMargins(0,0,0,0)
  freqSkb.SetOnTouch( freqSkb_OnTouch );
  freqSkb.SetMaxRate( 10 )
  //freqSkb.Gone(app.ShowPopup('t'));  

//  freqThres = app.CreateText( "Exclude 1024 most common words" );
  freqThres = app.CreateText( "Exclude " + window.localStorage['lower-cutoff'] +" most commmon words" );
   freqThres.SetTextSize( 13 );
   freqThres.SetTextColor("#ffdddddd");
   freqThres.SetMargins(0,0,0,0.);

    layDrawer.AddChild(  freqThres );
   layDrawer.AddChild( freqSkb );
   
  var markThreshVal=window.localStorage['markThresh'];
  if(markThreshVal==undefined){markThreshVal=40}
   markSkb = app.CreateSeekBar( 0.55 );
  markSkb.SetRange( 40 );
  markSkb.SetValue(markThreshVal);
  markSkb.SetOnTouch( markSkb_OnTouch );
  markSkb.SetMargins(0,0,0,0.15);
  
  markThres = app.CreateText( "Include " +markThreshVal +" most common marks:- ",0.6,-1,"Multiline" );
  markThres.SetTextSize( 13 );
  markThres.SetTextColor("#ffdddddd");
  markThres.SetMargins(0,0.1,0,0)

  layDrawer.AddChild(  markThres );
  layDrawer.AddChild( markSkb );
  
  
  voicingChk=  app.CreateCheckBox('Color Voiced Letters' );
//     voicingChk.SetChecked(true  );
  
  if(window.localStorage['COLORVOICED']=='COLORVOICED')
         voicingChk.SetChecked(true  );
    else     
         voicingChk.SetChecked(false ); 
 
  voicingChk.SetOnTouch( voicingChk_OnTouch ); 
      
  layDrawer.AddChild(voicingChk)
  
      //Create a list box.
//    LayoutSpinner = app.CreateSpinner( "Normal,Reverse,Sequential,Columns", 0.3, 0.2 );
    LayoutSpinner = app.CreateSpinner( "Normal,Sequential,Columns");
    LayoutSpinner.SetMargins( 0, 0.03, 0, 0 );
    LayoutSpinner.SetOnTouch( LayoutSpinner_OnTouch );
    layDrawer.AddChild( LayoutSpinner );

  
  layDrawer.SetBackColor('#ff444428');
  markSkb_OnTouch(markThreshVal);
 }

function LayoutSpinner_OnTouch( item )  
{
    for(i in layouthash){
        if(layouthash[i]==item){window.localStorage['layout']=i}
        //app.ShowPopup( 'item:=' + item + '  i ' +i );
    }
    basicSetChange=1;
}

function voicingChk_OnTouch(isChecked)
{
//	app.ShowPopup("yabadabbado! "+ window.localStorage['COLORVOICED']);
 if(isChecked)
	 {window.localStorage['COLORVOICED']='COLORVOICED'}
	else
	 {window.localStorage['COLORVOICED']=''};
	  	
	basicSetChange=1;
}

function freqSkb_OnTouch( value )
{
  var val=value/2;
  var val=val*Math.sqrt(val);
  var  v=Math.round(val);
   freqThres.SetText('Exclude '+ v + ' most common words');
   window.localStorage["lower-cutoff"]=v;
//   app.ShowPopup('v:= ' + v);
   basicSetChange=1;
}

function markSkb_OnTouch( value )
{
  val=value;
   v=Math.round(val);
   var noMarks='Include '+ v + ' most common marks:- ';
   var incMarks="";
   for(var i=0;i<v;i++){
       incMarks=incMarks +" " + marks[i];
   }
   finalText=noMarks+incMarks;
   markThres.SetText(finalText);
   markThreshVal=v;
 basicSetChange=1;     
}

function OnConfig() 
{ 
  //resize web view on orientation change 
  web.SetSize(1,0.90); 
} 
var basicSetChange=0;
function OnDrawer( side, state )
{
    if(side=="Left" && state=="Open")
    {
      basicSetChange=0;
    //  app.ShowPopup('drawer just opened? ' + window.localStorage['COLORVOICED'])
      if(window.localStorage['COLORVOICED']=='COLORVOICED')
     {
         voicingChk.SetChecked(true  );
//         app.ShowPopup('Colorvoiced');
     }
    else
      {
         voicingChk.SetChecked(false ); 
//         app.ShowPopup('not colored');
      }  
//  app.ShowPopup(layouthash[window.localStorage['layout']]); 
    LayoutSpinner.SelectItem(layouthash[window.localStorage['layout']]);
    }
    if(side=="Left" && state=="Closed" && basicSetChange==1){
       window.localStorage['markThresh']=markThreshVal;
       app.ShowPopup('markThresh' + window.localStorage['markThresh'] + "  side:=" +side+ "  state:=" +state + " basicSetChange:=" + basicSetChange )
       setMarks();
       web.Execute("alert(location);location.reload(true);");
    }
}


function setMarks(){
    
   markmap="àaèeìiòoùuħháaéeíióoúuâaêeîiôoûuŕrħhśsėeñnýyøoõoçcőoτtöoŝsāaĉcåaōoãaţtïiĝgüuŷyðdťtσoþpυuëeūućcẏyĩiδdĕeμuũuĵj";
   for(i=1;i<56;i++){
//       var mykey=markmap.substr(
       window.localStorage[markmap.substr(2*i-2,1)]=markmap.substr(2*i-1,1);
   }
   markstoset=finalText.replace(/ /gi, "");
// app.ShowPopup(markstoset);
    for(i=0;i<markstoset.length;i++){
       window.localStorage[markstoset.substr(i,1)]=markstoset.substr(i,1);
   }
  
}   
       
       
       