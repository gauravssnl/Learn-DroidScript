
function OnStart(){
	lay = app.CreateLayout("Linear", "FillXY");
	
  gl = app.CreateGLView(1, 1, "Fast2d");
  lay.AddChild(gl);
  
  coins = [];
  
  coinImg = gl.CreateImage("Img/coin.png",StartRendering);
  
  app.AddLayout(lay);
}

function StartRendering(){
  for(var i = 0; i<50; i++){
    var s=Math.random()/50
    coins.push({
      x: 0.5-s/2, y: 0,
      ax: (Math.round(Math.random())-0.5)*Math.random()/60,
      ay: (Math.round(Math.random())-0.5)*Math.random()/60,
      size: s
    });
  }
  
  app.Animate(DrawFrame, 60);
}

function DrawFrame(t, dt){
  coins.forEach(function(coin){
    (coin.ax>0)?coin.ax-=0.0001 : coin.ax+=0.0001;
    coin.ay+=0.000025*dt;
    coin.y+=coin.ay;
    (coin.size<0.15)?ncs = coin.size+=0.0001*dt:ncs=coin.size;
    coin.x+=coin.ax-(coin.size-ncs)/2
	  gl.DrawImage(coinImg, coin.x, coin.y, coin.size, coin.size*gl.aspect, 0);
	});
	gl.Render();
}