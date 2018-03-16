function sqr(v) 
{ 

    return v*v;

}

var sw = app.GetScreenWidth();
var sh = app.GetScreenHeight();
var wh = sw/sh;

var wdec = sw/1000;
var hdec = sh/1000;

function dist(a,b) 
{
    
    var distx = a.x-b.x;
    var disty = a.y-b.y;
    
    return Math.sqrt((distx/hdec*distx/hdec)+(disty/wdec*disty/wdec));

}

function checkcollision(b1,b2) 
{

    return dist(b1,b2) <= b1.r+b2.r;
    
}

dc = 1;

function collide(b1,b2) 
{
    
	var dx = b2.x-b1.x;
	var dy = b2.y-b1.y;
	var dist = Math.sqrt(dx*dx+dy*dy);

	if ((b1.vx-b2.vx)*dx/dist <= -(b1.vy-b2.vy)*dy/dist) return;

	var mag1 = Math.sqrt(b1.vx*b1.vx+b1.vy*b1.vy);
	var mag2 = Math.sqrt(b2.vx*b2.vx+b2.vy*b2.vy);
		
	var dir1 = Math.atan2(b1.vy,b1.vx);
	var dir2 = Math.atan2(b2.vy,b2.vx);
	var collangle = Math.atan2(dy,dx);
	
	var nvx1 = mag1*Math.cos(dir1-collangle);
	var nvy1 = mag1*Math.sin(dir1-collangle);
	var nvx2 = mag2*Math.cos(dir2-collangle);
	var nvy2 = mag2*Math.sin(dir2-collangle);

	var fvx1=((b1.m-b2.m)*nvx1+(b2.m+b2.m)*nvx2)/(b1.m+b2.m);
	var fvx2=((b1.m+b1.m)*nvx1+(b2.m-b1.m)*nvx2)/(b1.m+b2.m);

	var fvy1 = nvy1;
	var fvy2 = nvy2;

	b1.vx = (Math.cos(collangle)*fvx1+Math.cos(collangle+Math.PI/2)*fvy1)*dc;
	b1.vy = (Math.sin(collangle)*fvx1+Math.sin(collangle+Math.PI/2)*fvy1)*dc;
	b2.vx = (Math.cos(collangle)*fvx2+Math.cos(collangle+Math.PI/2)*fvy2)*dc;
	b2.vy = (Math.sin(collangle)*fvx2+Math.sin(collangle+Math.PI/2)*fvy2)*dc;
	
}

var balls = [];
var blocks = [];
var bsv = -1;

function OnStart()
{
    
    app.SetOrientation("Portrait");
    app.SetScreenMode("Game");
  	app.PreventScreenLock(true);

    floor = app.CreateLayout("Absolute","FillXY");

  	glv = app.CreateGLView(1,1,"Fast2D");
  	floor.AddChild(glv);

    goldball = glv.CreateImage("Img/gold.png",startrender);
    silverball = glv.CreateImage("Img/silver.png",startrender);
    bronzeball = glv.CreateImage("Img/bronze.png",startrender);
    block = glv.CreateImage("Img/block.png",startrender);
    
    selectedball = goldball;

    screen = app.CreateImage(null,1,1);
    screen.SetOnTouchUp(sendballs);
    floor.AddChild(screen);

    app.AddLayout(floor);
    app.SetDebugEnabled(false);

    for (var bl=0;bl<4;bl++)
    {

        var blx = 0.5;
        var bly = 0.2+(bl*0.2);

        var blk = {"img":block,"x":blx,"y":bly,"m":0,"r":0.075,"vx":0,"vy":0};
        blk.m = Math.PI*blk.r*blk.r;
  
        blocks.push(blk);

    }

    addballs();

}

function addballs()
{

    for (var gb=0;gb<4;gb++)
    {

        var gx = 0.05+(gb*0.3);
        var gy = 0.25;

        var gold = {"img":goldball,"x":gx,"y":gy,"m":0,"r":0.025,"vx":0,"vy":0};
        gold.m = Math.PI*gold.r*gold.r;
  
        balls.push(gold);

    }
    
    for (var sb=0;sb<4;sb++)
    {

        var sx = 0.05+(sb*0.3);
        var sy = 0.5;

        var silver = {"img":silverball,"x":sx,"y":sy,"m":0,"r":0.025,"vx":0,"vy":0};
        silver.m = Math.PI*silver.r*silver.r;
  
        balls.push(silver);

    }
    
    for (var bb=0;bb<4;bb++)
    {

        var bx = 0.05+(bb*0.3);
        var by = 0.75;

        var bronze = {"img":bronzeball,"x":bx,"y":by,"m":0,"r":0.025,"vx":0,"vy":0};
        bronze.m = Math.PI*bronze.r*bronze.r;
  
        balls.push(bronze);

    }
     
}

function startrender()
{
    
    setInterval(animate,100/6);

}

function animate() 
{

    for (var bl=0;bl<4;bl++)
    {
        
        var blk = blocks[bl];   
        glv.DrawImage(blk.img,blk.x-blk.r,blk.y-blk.r,blk.r*2,blk.r*2*wh,0);

    }    
	
    var ball1;
    var ball2;

	for (var a=0;a<12;a++)
	{
	    
    	ball1 = balls[a];
  		
    	move(ball1);

		for (var b=0;b<12;b++)
		{
		
		    ball2 = balls[b];
		
		    if (a!=b && checkcollision(ball1,ball2)) 
            {

                collide(ball1,ball2);

            }
            
		}		
				
		for (var bl=0;bl<4;bl++)
		{
		
		    var blk = blocks[bl];
		
		    if (checkcollision(ball1,blk))
            {

                collide(ball1,blk);

            }
            
		}			

		if (ball1.x-ball1.r<=0) 
		{
		    
		    ball1.vx = Math.abs(ball1.vx);                 
 
		}
		
		else if (ball1.x+ball1.r>=1) 
		{
		    
		    ball1.vx =- Math.abs(ball1.vx);                
           
		}
		
		if (ball1.y-ball1.r<=0) 
		{
		    		
		    ball1.vy = Math.abs(ball1.vy);
      
		}
		
        else if (ball1.y+ball1.r>=1) 
        {
            
            ball1.vy = -Math.abs(ball1.vy);                        

        }
        
        var blk;
        
        for (bl=0;bl<4;bl++)
        {
        
            blk = blocks[bl];
                        
        }

		glv.DrawImage(ball1.img,ball1.x-ball1.r,ball1.y-ball1.r,ball1.r*2,ball1.r*2*wh,0);

	}

	glv.Render();

}

function move(ball) 
{

    ball.vx = ball.vx*0.995;
    ball.vy = ball.vy*0.995;

    ball.x += ball.vx;
    ball.y += ball.vy;

}

function sendballs(ev)
{

    bsv++;
    
    if (bsv%3==0) var nextset = goldball;
    if (bsv%3==1) var nextset = silverball;
    if (bsv%3==2) var nextset = bronzeball;
    
    var x = ev.x[0];
    var y = ev.y[0];

    var ball;

		for (var b=0;b<12;b++)
		{
		
		    ball = balls[b];

		    if (ball.img==nextset)	    
		    {
		    
    		    ball.vx = (x-ball.x)/(sw/10);
    		    ball.vy = (y-ball.y)/(sh/10);		    
    		   
     		}     		
     		
		}

}