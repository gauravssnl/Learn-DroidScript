_AddOptions("NoDom");
var versao="0.2";
var dld;
app.SetOrientation("Portrait" );
var dldVersao;
var dia;
function getUpdate(){
dld=app.CreateDownloader("NoDialog" );
dld.Download(u+"/versao_itens.txt","/sdcard/","v.txt");
dld.SetOnComplete(verify );
}

function verify()
{
	if( dld.IsComplete()==true){
	dldVersao= app.ReadFile("/sdcard/v.txt" );
	if(dldVersao>versao){
	dia=app.CreateYesNoDialog("Atualização do Heroes Evolved Itens Disponível!" );
	dia.SetButtonText("Atualizar","Depois" );
	dia.SetOnTouch( update );
	dia.Show();
	}
	}
}

function update(ur)
{
	if(ur=="Yes"){
	bota_web.LoadUrl(u+"/Heroes%20Evolved%20Itens.apk" );
	botas_app();
	}else{
	dia.Dismiss();
	}
}

var txt;
function search()
{
popu= app.CreateDialog("Pesquisa de Qualidade" ,"NoTitle");
lai= app.CreateLayout( "Linear", "VTop,FillXY");
popu.SetSize(0.9,0.9);
txt= app.CreateTextEdit("",0.9,0.7 );
txt.SetBackColor( "#000000" );
txt.SetHint("Como está o Layout geral do app na sua tela? encaixado? desproporcional? etc. Conte os detalhes!" );
popu.AddLayout(lai );

btn= app.CreateButton( "Responder",0.6,0.2 );
btn.SetTextSize(20 );
btn.SetHtml("<b>Responder" );
btn.SetOnTouch(sendFeed);
lai.AddChild(txt );
lai.AddChild(btn );
popu.Show();
}
var reptxt;
function sendFeed()
{
if(txt.GetText()!=""){
	reptxt="?pasta=HeItens__"+ app.GetDeviceId()+"&box_content="+txt.GetText()+"<br><br>Width: "+ app.GetScreenWidth(  )+"px<br><br>Heigth: "+ app.GetScreenHeight(  )+"px";
	app.ShowProgress("Enviando..." );
sendBug(reptxt);
app.HideProgress();
popu.Hide();
}else{
app.Alert( "Faça uma descrição melhor, com mais detalhes." );
}
}
var dgs="https://hefiles.000webhostapp.com/HeroesEvolvedBugs/digestor.php";
function sendBug(path) {
soket=app.CreateWebView(0,0 );
             soket.LoadUrl(dgs+path );
 soket.SetOnProgress(soketPrg );
    }
    var ok=0;
function soketPrg(p)
{
	if(p==100&&ok==0){
	  soket.Reload();
	 app.ShowPopup("Obrigado pela ajuda!");
	 ok=1;
	}
}

function OnBack()
{

if( app.LoadText("url" )=="fisico"){
fisico_web.Execute("document.getElementById('pop').style.display='none'",null );
}

if( app.LoadText("url" )=="magico"){
magico_web.Execute("document.getElementById('pop').style.display='none'",null );

}
if( app.LoadText("url" )=="bota"){
bota_web.Execute("document.getElementById('pop').style.display='none'",null );
}

if( app.LoadText("url" )=="duravel"){
duravel_web.Execute("document.getElementById('pop').style.display='none'",null );
}
}

app.LoadPlugin( "UIExtras" );
app.SetPriority("IMPORTANCE_CACHED");
	 var u="https://hefiles.000webhostapp.com/ajuda/app_";
var fisico_web,magico_web,duravel_web,reload_web;
var nweb;
function OnStart()
{
if( app.LoadBoolean("search1" )==false){
search()
app.SaveBoolean("search1",true );
}
uix = app.CreateUIExtras();
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
if( app.LoadText("url" )==""){
nweb= app.CreateWebView(1,1,"NoScroll,IgnoreErrors");
nweb.LoadUrl("https://hefiles.000webhostapp.com/ajuda/arsenal_app.php");
lay.AddChild(nweb );
}
 
 layFam = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
  cfg = uix.CreateFAMenu( "[fa-ellipsis-v]", "LabelsLeft,Mini" );
 cfg.SetIconColor( "#000000" );
 cfg.SetButtonColors( "#EDEDED", "#ececec" );
  cfg.SetLabelBackColor( "#EDEDED" );
 cfg.SetLabelTextColor( "#646464" );
 cfg.SetMargins( 0.0, 0.0, 0.01, 0.0 );
  fisico = uix.CreateFAButton("[fa-book]", "Mini" );
  fisico.SetLabel("Itens Físicos");
  fisico.SetOnTouch(fisico_app);
  
  magico = uix.CreateFAButton("[fa-book]", "Mini" );
  magico.SetLabel("Itens Mágicos");
   magico.SetOnTouch(magico_app);
  
  duravel = uix.CreateFAButton("[fa-book]", "Mini" );
  duravel.SetLabel("Itens Duráveis");
   duravel.SetOnTouch(duravel_app);
   
    botas = uix.CreateFAButton("[fa-book]", "Mini" );
  botas.SetLabel("Botas");
   botas.SetOnTouch(botas_app);

  
  reload = uix.CreateFAButton("[fa-retweet]", "Mini" );
  reload.SetLabel("Recarregar Tudo");
  reload.SetOnTouch(reloadAll);

    info = uix.CreateFAButton("[fa-info]", "Mini" );
  info.SetLabel("Sobre");
  info.SetOnTouch(info_app);

   cfg.AddFAButton(fisico);
   cfg.AddFAButton(magico);
 cfg.AddFAButton(duravel);
 cfg.AddFAButton(botas);
cfg.AddFAButton(reload);
cfg.AddFAButton(info);

    layFam.AddChild(cfg ); 
	app.AddLayout( lay );
	 app.AddLayout(layFam );

fisico_web= app.CreateWebView(1,1,"IgnoreErrors,AllowZoom" );
bota_web= app.CreateWebView(1,1,"IgnoreErrors,AllowZoom" );
magico_web= app.CreateWebView(1,1,"IgnoreErrors,AllowZoom" );
duravel_web= app.CreateWebView(1,1,"IgnoreErrors,AllowZoom" );
info_web= app.CreateWebView(1,1,"AllowZoom,IgnoreErrors" );
info_web.LoadUrl("Html/info.html" );
fisico_web.SetOnError(ErrorWeb );
magico_web.SetOnError(ErrorWeb );
bota_web.SetOnError(ErrorWeb );
duravel_web.SetOnError(ErrorWeb );
fisico_web.LoadUrl(u+"/fisico.php" );
bota_web.LoadUrl(u+"/botas.php" );
magico_web.LoadUrl(u+"/magico.php" );
duravel_web.LoadUrl(u+"/duravel.php" );

if( app.LoadText("url" )=="fisico"){
lay.AddChild(fisico_web );
}

if( app.LoadText("url" )=="magico"){
lay.AddChild(magico_web );
}
if( app.LoadText("url" )=="bota"){
lay.AddChild(bota_web );
}

if( app.LoadText("url" )=="duravel"){
lay.AddChild(duravel_web );
}

getUpdate();
}

function info_app()
{
lay.Animate("FadeIn",null,500);
lay.AddChild(info_web);
info_web.LoadUrl("Html/info.html" );
lay.RemoveChild(magico_web);
lay.RemoveChild(duravel_web );
lay.RemoveChild(bota_web );
lay.RemoveChild(fisico_web );
}
function ErrorWeb(e)
{
if(e.lastIndexOf("ERR_INTERNET_DISCONNECTED")>0){
	fisico_web.LoadUrl("Html/error.html");
		magico_web.LoadUrl("Html/error.html");
	bota_web.LoadUrl("Html/error.html");
	duravel_web.LoadUrl("Html/error.html");
}
if(e.lastIndexOf("502")>0||e.lastIndexOf("500")>0||e.lastIndexOf("403")>0||e.lastIndexOf("400")>0){
	if( app.LoadText("url" )=="fisico"){
	fisico_web.LoadUrl(u+"/fisico.php" );
}

if( app.LoadText("url" )=="magico"){
	magico_web.LoadUrl(u+"/magico.php" );
}
if( app.LoadText("url" )=="bota"){
	bota_web.LoadUrl(u+"/botas.php" );
}

if( app.LoadText("url" )=="duravel"){
	duravel_web.LoadUrl(u+"/duravel.php" );
}
app.Alert("Ocorreu um erro ao Carregar esta Página: "+e+"\n se o erro persistir, porfavor reporte o erro!" );
}
}

function reloadAll()
{
	fisico_web.LoadUrl(u+"/fisico.php" );
bota_web.LoadUrl(u+"/botas.php" );
magico_web.LoadUrl(u+"/magico.php" );
duravel_web.LoadUrl(u+"/duravel.php" );
}

function fisico_app()
{
lay.Animate("FadeIn",null,500);
app.SaveText("url","fisico" );
lay.AddChild(fisico_web);
lay.RemoveChild(magico_web);
lay.RemoveChild(duravel_web );
lay.RemoveChild(info_web );
lay.RemoveChild(bota_web );
if(nweb!=null){
lay.RemoveChild(nweb );
}
}

function magico_app()
{
lay.Animate("FadeIn",null,500);
	app.SaveText("url","magico" );
lay.AddChild(magico_web);
lay.RemoveChild(fisico_web);
lay.RemoveChild(info_web );
lay.RemoveChild(duravel_web );
lay.RemoveChild(bota_web );
if(nweb!=null){
lay.RemoveChild(nweb );
}
}

function duravel_app()
{
lay.Animate("FadeIn",null,500);
	app.SaveText("url","duravel" );
lay.AddChild(duravel_web);
lay.RemoveChild(magico_web);
lay.RemoveChild(info_web );
lay.RemoveChild(fisico_web );
lay.RemoveChild(bota_web );
if(nweb!=null){
lay.RemoveChild(nweb );
}
}

function botas_app()
{
lay.Animate("FadeIn",null,500);
	app.SaveText("url","bota" );
lay.AddChild(bota_web);
lay.RemoveChild(magico_web);
lay.RemoveChild(info_web );
lay.RemoveChild(duravel_web );
lay.RemoveChild(fisico_web );
if(nweb!=null){
lay.RemoveChild(nweb );
}
}