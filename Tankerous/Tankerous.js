/*******************************************************************\
|*                                                                                                              *|
|*                            APPLICATION FROM ALEX F                              *|
|*                                     BY SYMBROSON                                          *|
|*                                                                                                              *|
|*    -  it is not allowed to Uload this app on other platforms       *|
|*           without getting a unique permission from Alex               *|
|*        - this should be an example how to make RPG games      *|
|* and you can modify it by yourself but don't Uload it without  *|
|*                                            my approval !                                          *|
|*                                                                                                              *|
|*                                           cheers,    Alex                                          *|
|*                                                                                                              *|
\*******************************************************************/

//globals
Folder="/sdcard/Tankerous/"
app.MakeFolder( Folder+"Img" );
var itv, itvWalk, walking=false, tdir
sizX=1; sizY=1, dHit=0.3
app.LoadScript( "Special.js" );

function OnStart() {
	app.SetOrientation( "Landscape" );
	app.SetScreenMode( "game" );
	app.SetDebugEnabled( false );
	
	//create main layout //with scroller
	layMain= app.CreateLayout("Absolute" );
			//map layout
			lay= app.CreateLayout( "absolute" );
				glv= app.CreateGLView( 1,1,"fast2d" );
				glv.Images=[];
				lay.AddChild( glv );
				initTexture();
				initWorlds();
				initControls();
		layMain.AddChild( lay );
		
//		fader= app.CreateLayout( "linear","FillXY" );
//		fader.SetBackColor( "black" );
				
		sndShot= app.CreateMediaPlayer();
		sndShot.SetFile( "Snd/Bullet.mp3" );
		sndShot.SeekTo(0);
		sndShot.SetVolume( 0.4,0.4 );
		sndExpl= app.CreateMediaPlayer();
		sndExpl.SetFile( "Snd/Explode.mp3" );
		sndExpl.SeekTo(0);
}

function showGame(s) {
	app.AddLayout(layMain);
	resetVars();
	greeted=true;
//	app.AddLayout( fader );
}

//handle control keys
function onKeys(ev) {
	tdir=this.Action;
	if( ev.action=="Down" ) {
		this.SetBackColor( "#33ffffff" );
		if(!walking && canMove(tdir)) {
			walking="start";
			glv.PlayerPos[2]=tdir
			itvWalk=setInterval(move);
		}
		if(walking=="stop") walking="res"
	}
	if( ev.action=="Up" ) {
		this.SetBackColor( "#00ffffff" );
		if(walking) walking="stop";
	}
}

//walk
function move() {
	//if not integer pos
	if(!isInt(glv.PlayerPos[0]) || !isInt(glv.PlayerPos[1])) {
		walk(glv.PlayerPos[2]);
	}
	else if(walking=="stop") {
		clearInterval(itvWalk);
		walking=false;
		glv.PlayerPos[2]=tdir;
	}
	else {
		glv.PlayerPos[2]=tdir;
		if(canMove(tdir)) walking="start"
		else {
			clearInterval(itvWalk);
			walking=false;
		}
	}
	if(walking=="start") {walking=true; walk(glv.PlayerPos[2])}
}

//move the player
function walk(dir) {
var s=0.02
	switch (dir) {
		case "U": glv.PlayerPos[1]-=s; break;
		case "D": glv.PlayerPos[1]+=s; break;
		case "L": glv.PlayerPos[0]-=s; break;
		case "R": glv.PlayerPos[0]+=s; break;
	}
	glv.PlayerPos[0]=1*glv.PlayerPos[0].toFixed(2)
	glv.PlayerPos[1]=1*glv.PlayerPos[1].toFixed(2)
}

//check the player walks to an other map
function ckeckBorders() {
	for(var w in curW.out) {
		var arr=curW.out[w]
		for( var i in arr[2] ) 
		if( glv.PlayerPos[0]==arr[2][i][0] && glv.PlayerPos[1]==arr[2][i][1] ) {
			glv.PlayerPos[0]=arr[2][i][2];
			glv.PlayerPos[1]=arr[2][i][3];
			change(curW,curW.out[w][0],curW.out[w][1]);
			return;
		}
	}
}

//change maps
function change(oldW,newW,type) {
	curW=newW;
	clearInterval(itv);
	switch (curW) {
		case world1: glv.PlayerPos=[10,9,"U"]; break;
		case world2: glv.PlayerPos=[10,1,"D"]; break;
		case world3: glv.PlayerPos=[2,1,"L"]; break;
	}
	//if(oldW) fader.Animate( "FadeIn",showW,2000 );
	//else 
	showW();
}
function showW() {
//	fader.Animate( "FadeOut",changed,2000 );
	nameBar.SetText( curW.Name );
	nameBar.Animate( "SlideFromLeft",hideBar,2000 );
	changed();
}
function changed() {itv=setInterval(RendImg,10)}
function hideBar() {nameBar.Animate( "SlideToLeft",null,2000 )}

function moveEnemies() {
	for( var i in curW.Enemies )
	if( curW.Enemies[i]) {
		var p=curW.Enemies[i]
		var a=angle(p,glv.PlayerPos)
		p[2]="U";
		if(a>45) p[2]="R";
		if(a>135) p[2]="D";
		if(a>225) p[2]="L";
		if(a>315) p[2]="U";
		
		if(p[4]==80) p[3]=false;
		var w=90*(["U","R","D","L"].indexOf(p[2]))
		if(!p[3])
			if(Math.abs(a-w)<20 || w-a+360<20) {
				var x=p[0], y=p[1];
				while(!curW.Area[y][x])
					switch( p[2] ) {
						case "U": y--; break;
						case "D": y++; break;
						case "L": x--; break;
						case "R": x++; break;
					}
				if(dist(p,[x,y])>dist(p,glv.PlayerPos)) {
					var x=p[0], y=p[1];
					switch( p[2] ) {
						case "U": y-=dHit; break;
						case "D": y+=dHit; break;
						case "L": x-=dHit; break;
						case "R": x+=dHit; break;
					}
					addBullet(x,y,p[2])
					p[3]=true; p[4]=0;
				}
			}
		p[4]++
	}
}

function stopMove() {
	clearInterval(itvWalk);
	glv.PlayerPos[0]=rnd(glv.PlayerPos[0]);
	glv.PlayerPos[1]=rnd(glv.PlayerPos[1]);
	if(walking) walking=false;
}


function dlgTouch(reply) {
	switch(dlg.Type) {
		case "restart":
			if(reply=="No") app.Exit();
			else change(curW,world1,"Fade");
		break;
	}
}



/******************************************************************\
\******************************************************************/

//check the player can move in a given direction
function canMove(dir) {
	var x=glv.PlayerPos[0], y=glv.PlayerPos[1];
	switch( dir ) {
		case "U": y--; break;
		case "D": y++; break;
		case "L": x--; break;
		case "R": x++; break;
	}
	x=rnd(x); y=rnd(y)

	if( x<0 || x>=curW.W || y<0 || y>=curW.H ) {ckeckBorders();return false}
	return (curW.Area[y][x]<=0);
}

function OnDlg() {
	//<dlg>;type;title;list
	txt=text.split(';')
	dlg= app.CreateListDialog( txt[2],txt[3] );
	dlg.Type=txt[1]
	dlg.SetOnTouch( dlgTouch );
}

function makeBullet() {
	kEnter=this
	kEnter.SetTouchable(false)
	var p=glv.PlayerPos, x=p[0], y=p[1];
				switch( p[2] ) {
					case "U": y-=dHit; break;
					case "D": y+=dHit; break;
					case "L": x-=dHit; break;
					case "R": x+=dHit; break;
				}
				addBullet(x,y,p[2])
	setTimeout( enableShot,500 )
}
function enableShot() {
	kEnter.SetTouchable(true)
}

function addBullet(x,y,dir) {
	sndShot.Stop();
	sndShot.Play();
	glv.BulletsPos.push([x,y,dir,0]);
}

//draw the player
function redrawPlayer() {
	var x,y
	x=glv.PlayerPos[0]; y=glv.PlayerPos[1];
	glv.DrawImage( Player, glv.PlayerPos[0]/curW.W,glv.PlayerPos[1]/curW.H,1/curW.W, 1/curW.H,90*(["U","R","D","L"].indexOf(glv.PlayerPos[2])),0);
}

//draw all enemies
function redrawEnemies() {
	for( var i in curW.Enemies ) {
		if( curW.Enemies[i]) {
			var p=curW.Enemies[i], x=p[0], y=p[1];
			glv.DrawImage( Enemie, p[0]/curW.W,p[1]/curW.H,1/curW.W, 1/curW.H,90*(["U","R","D","L"].indexOf(p[2])),0);
		}
	}
}

//draw all bullets
function redrawBullets() {
	//velocity, angle
	var v=0.1, a, obj
	//redraw bullets
	for( var i in glv.BulletsPos ) {
		var p=glv.BulletsPos[i];
		
		//if not collided
		if(p) {
			switch(p[2]) {
				case "U": p[1]-=1*v; a=0; break;
				case "D": p[1]+=1*v; a=2; break;
				case "L": p[0]-=1*v; a=3; break;
				case "R": p[0]+=1*v; a=1; break;
			}
			obj=null
			//check collisions
			//bullet <-> border
			if(curW.Area[rnd(p[1])][rnd(p[0])]>0)
			obj="Bullet"
			
			//bullet <-> bullet
			for( var j in glv.BulletsPos )
				if(glv.BulletsPos[j]) if(dist(p,glv.BulletsPos[j])<0.51 && j!=i) {
					obj="Bullet";
					glv.BulletsPos[j]=null;
					break
				}

			//bullet <-> player
			if(dist(glv.PlayerPos,p)<dHit) obj="Player"
			
			//bullet <-> enemie
			if(!obj) for( var j in curW.Enemies ) if(curW.Enemies[j])
				if(dist(curW.Enemies[j],p)<dHit) {obj="Enemie"; break}
			
			//explosion when collided
			if(obj) {
				sndExpl.Stop();
				sndExpl.Play();
				glv.BulletsPos[i]=null;
				if(obj=="Bullet") glv.DrawImage( Explode, p[0]/curW.W,p[1]/curW.H,1/curW.W, 1/curW.H,0 );
				else glv.DrawImage( Explode, rnd(p[0])/curW.W,rnd(p[1])/curW.H,1/curW.W, 1/curW.H,0 );
				
				//lower HP and restart if player or enemie died
				switch (obj) {
					case "Player": glv.PlayerHealth--;
						app.ShowPopup( "! "+glv.PlayerHealth+" !" );
						if(glv.PlayerHealth==0) {app.ShowPopup("You failed!"); resetVars(false)}
						return;
					break;
					
					case "Enemie":
						curW.Enemies[j][5]--
						app.ShowPopup( curW.Enemies[j][5] );
						if(curW.Enemies[j][5]==0) curW.Enemies[j]=null
						var sum=0
						for(var j in curW.Enemies) if(curW.Enemies[j]) sum+=curW.Enemies[j][5]
						if(sum==0) {app.ShowPopup("You won!");resetVars(true)}
						return;
					break;
				}
			}
			//draw bullet
			else glv.DrawImage( Bullet, p[0]/curW.W,p[1]/curW.H,1/curW.W, 1/curW.H,90*a,0 );
		}
	}
}

function RendImg() {
	glv.DrawImage( glv.Images[curW.N] ,0,0,1,1,0 )
	redrawPlayer();
	moveEnemies();
	redrawEnemies();
	redrawBullets();
	glv.Render();
}


/******************************************************************\
\******************************************************************/

//inutialisize maps
function initWorlds() {
	world1= newWorld( "Level 1", null,
	[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1],
	[1,2,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,2,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,1],
	[1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,1],
	[1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] );
	lay.AddChild( world1 );
	
	world2= newWorld( "Level 2", null,
	[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
	[1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
	[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,0,1,0,0,0,1,0,2,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] );
	lay.AddChild( world2 );
	
	world3= newWorld( "Level 3", null,
	[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,2,0,0,1],
	[1,0,1,0,0,0,1,0,1,2,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,1,0,1,0,1,0,0,0,0,2,0,1,0,0,0,0,1],
	[1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
	[1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,1],
	[1,2,1,0,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,1],
	[1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
	[1,0,0,2,1,2,1,2,0,0,0,0,0,0,2,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] );
	lay.AddChild( world3 );
	
	world1.next=world2;
	world2.next=world3;
	world3.next=world1;
	
	//bar shown when player arrives at an nw map
	nameBar= app.CreateLayout( "Linear", "Horizontal" );
	nameBar.SetVisibility( "Hide" );
	var Txt= app.CreateText( "",0.7,0.1 );
	Txt.SetTextSize( 25 );
	nameBar.SetText=function(tx){Txt.SetText(tx)}
	nameBar.AddChild( Txt );
	nameBar.SetBackGradientRadial(0, 0, 0.7,"blue", "#00000000" );
	lay.AddChild( nameBar );
}

//get textures
function initTexture() {
	Ground= app.CreateImage( "Img/Ground.png" );
	Rock= app.CreateImage( "Img/Rock.png" );
	Bullet= glv.CreateImage( "Img/Bullet.png" );
	Explode= glv.CreateImage( "Img/Explode.png" );
	Player= glv.CreateImage( "Img/TankB.png" );
	Enemie= glv.CreateImage( "Img/TankR.png" );
}

//set control keys
function initControls() {
	layConsH= app.CreateLayout( "Linear", "Horizontal,VCenter" );
	layConsH.SetPosition( 0.05,0.4 );
	var layControls= app.CreateLayout( "linear" );
	var btnL= control("Left");
	var btnR= control("Right");
		btnR.SetMargins(0.1);
	var btnU= control("Up");
	var btnD= control("Down");
	var btnEnter= control("[fa-dot-circle-o]");
		btnEnter.SetMargins(0.5);
	
	var layH= app.CreateLayout( "Linear", "Horizontal" );
	layH.AddChild( btnL );
	layH.AddChild( btnR );
	
	layControls.AddChild( btnU );
	layControls.AddChild( layH );
	layControls.AddChild( btnD );
	
	layConsH.AddChild( layControls );
	layConsH.AddChild( btnEnter );
	
	lay.AddChild( layConsH );
}


//set world object
function newWorld(name,img,arr) {
	//make world object
	var world= app.CreateLayout( "Absolute" );
	world.Area=arr;
	world.Name=name;
	world.H= arr.length;
	world.N= glv.Images.length;
	world.W= arr[0].length;
	world.Enemies=[];
	world.SetVisibility( "Hide" );

	//if map image not exists draw and save it
	var draw= !app.FileExists(Folder+"Img/"+"/"+name+".png")
	if(draw) var timg=app.CreateImage( img, sizX,sizY );
	//draw objects with worlds array
		var w=1/world.W, h=1/world.H;h
		for( i in arr )
			for( j in arr[i] ) {
				if(draw) timg.DrawImage( Ground, j*w, i*h, w, h, 0 );
				switch(arr[i][j]) {
					case 1: if(draw) timg.DrawImage( Rock, j*w, i*h, w, h, 0 ); break;
					case 2:
						world.Enemies.push([1*j,1*i,'U',false,0,4]);
						world.Area[i][j]=0;
					break;
				}
			}
	//save in Private Folder
	if(draw) timg.Save(Folder+"Img/"+"/"+name+".png" );
	//Create map image
	glv.Images.push( glv.CreateImage(Folder+"Img/"+"/"+name+".png" ));
	return world;
}

function resetVars(next) {
	glv.PlayerHealth=3
	glv.BulletsPos=[];
	if(greeted) change(curW,next?curW.next:curW,"Fade");
	else change(null,world1,"Fade");
	stopMove();
}