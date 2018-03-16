_AddOptions("NODOM");
app.SetScreenMode("Full");
//app.SetOrientation("Landscape");
function OnStart(){
  lay = app.CreateLayout("linear", "VCenter,FillXY");

   web = app.CreateWebView(1, 1);
   web.SetBackColor("#000000");
   lay.AddChild(web);

   app.AddLayout(lay);
   html = "<style>body{margin: 0}</style>"+
     "<script src='particles.js'></script>"+
     "<canvas id='canvas'></canvas>"
     
   web.LoadHtml(html);
   web.Execute("window.onload = function(){"+
       "particles = new Particles('#canvas');"+
       "particles.setup({"+
         "colors: ['255, 255, 255'],"+
       "minOpacity: .005,"+
       "maxOpacity: .5,"+
       "blurry: false,"+
       "minSpeedX: -2.5,"+
       "maxSpeedX: 2.5,"+
       "minSpeedY: 0,"+
       "maxSpeedY: -2.5,"+
       "numParticles: 200,"+
       "fps: 30,"+
       "minRadius: 10,"+
       "maxRadius: 50"+
     "});"+
     "particles.setBackGround('Img/bg.jpg');"+
     "particles.init();}");
}