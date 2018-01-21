/*******************************************************************\
|*                                                                                                              *|
|*                            APPLICATION FROM ALEX F                              *|
|*                                     BY SYMBROSON                                          *|
|*                                                                                                              *|
|*    -  it is not allowed to upload this app on other platforms      *|
|*           without getting a unique permission from Alex               *|
|*        - this should be an example how to make RPG games      *|
|* and you can modify it by yourself but don't upload it without *|
|*                                            my approval !                                          *|
|*                                                                                                              *|
|*                                           cheers,    Alex                                          *|
|*                                                                                                              *|
\*******************************************************************/

//globals
Folder="/sdcard/DroidScript/Tanks2" //app.GetPrivateFolder('')
var curWorld, text, itvWalk, itvBull, itvEne
sizX=1; sizY=1, dHit=0.25
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
		layMain.AddChild( lay );
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
	setInterval(RendImg,10)
}

//handle control keys
function onKeys(ev) {
	glv.PlayerPos[2]=this.Action;
	if( ev.action=="Down" && !sb.IsVisible() ) { clearInterval(itvWalk); this.SetBackColor( "#33ffffff" ); itvWalk=setInterval(move,20) }
	if( ev.action=="Up" ) { this.SetBackColor( "#00ffffff" ); clearInterval(itvWalk) }
}

function makeBullet() {
	kEnter=this
	kEnter.SetTouchable(false)
	var p=glv.PlayerPos, x=p[0], y=p[1];
				switch( p[2] ) {
					case "Up": y-=dHit; break;
					case "Down": y+=dHit; break;
					case "Left": x-=dHit; break;
					case "Right": x+=dHit; break;
				}
				addBullet(x,y,p[2])
	setTimeout( enableShot,500 )
}
function enableShot() {
	kEnter.SetTouchable(true)
}

//walk if possible
function move() {
	if( canMove(glv.PlayerPos[2]) ) walk(glv.PlayerPos[2])
	else clearInterval(itvWalk)
}

//move the player
function walk(dir) {
	var s=1/8, t=2
	for( var i=0; i<8*t; i++ ) {
		switch (dir) {
			case "Up": glv.PlayerPos[1]-=s/t; break;
			case "Down": glv.PlayerPos[1]+=s/t; break;
			case "Left": glv.PlayerPos[0]-=s/t; break;
			case "Right": glv.PlayerPos[0]+=s/t; break;
		}
		if(i%2) { redrawBullets(); redrawEnemies() }
		//walk animation		
		redrawPlayer()
	}
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
function change(oldW,newW,type,option) {
	layControls.SetTouchable( false );
	clearInterval(itvWalk)
	layMain.ChildToFront( sb );
	layMain.ChildToFront( layControls );
	nameText.SetText( newW.Name );
	nameBar.Animate( "SlideFromLeft",null,2000 );
	
	curW=newW;
	switch (curW) {
		case world1: glv.PlayerPos=[10,9,"Up"];
			addEnemie(15,5,"Left",3);
		break;
		case world2: glv.PlayerPos=[5,5,"Right"];
			addEnemie(1,1,"Right",3);
			addEnemie(1,9,"Right",5);
			addEnemie(19,1,"Left",5);
			addEnemie(19,9,"Left",3);
		break;
		case world3: glv.PlayerPos=[10,5,"Up"]
			addEnemie(1,5,"Right",5);
			addEnemie(10,1,"Down",5);
			addEnemie(10,8,"Up",5);
			addEnemie(19,5,"Left",5);
		break;
	}

	switch(type) {
		case "Fade":
			layMain.Animate( "FadeIn",changed,1500 );
		break;
		
		default:
			newW.SetPosition(0,0);
			newW.SetVisibility( "Show" );
			if(oldW) oldW.SetVisibility( "Hide" );
	}
		temp=glv.CreateImage(Folder+"/Img/"+newW.Name+".png" )
	changed();
}

function changed() {
	setTimeout(hideBar,1500);
	layControls.SetTouchable( true );
//	itvBull= setInterval( moveBullets, 80 );
//	itvEne= setInterval( moveEnemies, 80 );
}
function hideBar() {
	nameBar.Animate( "SlideToLeft",null,2000 );
	glv.DrawImage(temp,0,0,1,1,0)
		glv.Render();
}

function moveEnemies() {
	for( var i in glv.EnemiesPos )
	if( glv.EnemiesPos[i]) {
		var p=glv.EnemiesPos[i]
		var a=angle(p,glv.PlayerPos)
		p[2]="Up";
		if(a>45) p[2]="Right";
		if(a>135) p[2]="Down";
		if(a>225) p[2]="Left";
		if(a>315) p[2]="Up";
		
		if(p[4]==15) p[3]=false;
		var w=90*(["Up","Right","Down","Left"].indexOf(p[2]))
		if(!p[3])
			if(Math.abs(a-w)<20 || w-a+360<20) {
				var x=p[0], y=p[1];
				switch( p[2] ) {
					case "Up": y-=dHit; break;
					case "Down": y+=dHit; break;
					case "Left": x-=dHit; break;
					case "Right": x+=dHit; break;
				}
				addBullet(x,y,p[2])
				p[3]=true; p[4]=0;
			}
		p[4]++
	}
	drawEnemies();
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
		case "Up": y--; break;
		case "Down": y++; break;
		case "Left": x--; break;
		case "Right": x++; break;
	}
	x=Math.round(x); y=Math.round(y)
	glv.PlayerPos[0]=Math.round(glv.PlayerPos[0]); glv.PlayerPos[1]=Math.round(glv.PlayerPos[1])
	redrawPlayer();
	
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

function addBullet(x,y,dir) {
	sndShot.Stop();
	sndShot.Play();
	
	glv.BulletsPos.push([x,y,dir,0]);
}

function addEnemie(x,y,dir,hp) {
	glv.EnemiesPos.push([x,y,dir,false,0,hp]);
}

//draw the player
function redrawPlayer() {
	var x,y
	x=glv.PlayerPos[0]; y=glv.PlayerPos[1];
	glv.DrawImage( Player, glv.PlayerPos[0]/curW.W,glv.PlayerPos[1]/curW.H,1/curW.W, 1/curW.H,90*(["Up","Right","Down","Left"].indexOf(glv.PlayerPos[2])),0);
}

//draw all enemies
function redrawEnemies() {
	for( var i in glv.EnemiesPos ) {
		if( glv.EnemiesPos[i]) {
			var p=glv.EnemiesPos[i], x=p[0], y=p[1];
			glv.DrawImage( Enemie, p[0]/curW.W,p[1]/curW.H,1/curW.W, 1/curW.H,90*(["Up","Right","Down","Left"].indexOf(p[2])),0);
		}
	}
}

//draw all bullets
function redrawBullets() {
	//velocity, angle
	var v=0.2, a, obj
	//redraw bullets
//	bullets.Clear();
	for( var i in glv.BulletsPos ) {
		var p=glv.BulletsPos[i];
		//if not collided
		if(p) {
			switch(p[2]) {
				case "Up": p[1]-=v; a=0; break;
				case "Down": p[1]+=v; a=2; break;
				case "Left": p[0]-=v; a=3; break;
				case "Right": p[0]+=v; a=1; break;
			}
			obj=null
			//check collisions
			//bullet <-> player
			if(dist(glv.PlayerPos,p)<dHit) obj=glv.Player
			//bullet <-> border
			if(curW.Area[Math.round(p[1])][Math.round(p[0])]>0) obj=glv.Bullets
			//bullet <-> bullet
			for( var j in glv.BulletsPos )
				if(glv.BulletsPos[j]) if(dist(p,glv.BulletsPos[j])<0.51 && j!=i) {
					obj=glv.Bullets;
					glv.BulletsPos[j]=null;
					break
				}
			//bullet <-> enemie
			if(!obj) for( var j in glv.EnemiesPos ) if(glv.EnemiesPos[j])
				if(dist(glv.EnemiesPos[j],p)<dHit) {obj=glv.Enemies; break}
			
			//explosion when collided
			if(obj) {
				sndExpl.Stop();
				sndExpl.Play();
				glv.BulletsPos[i]=null;
				if(obj.Name=="Bullet") glv.DrawImage( Explode, p[0]/curW.W,p[1]/curW.H,1/curW.W, 1/curW.H,0 );
				else glv.DrawImage( Explode, Math.round(p[0])/curW.W,Math.round(p[1])/curW.H,1/curW.W, 1/curW.H,0 );
				
				//lower HP and restart if player or enemie died
				switch (obj.Name) {
				
					case glv.PlayerName: obj.Health--;
						app.ShowPopup( "! "+obj.Health+" !" );
						if(obj.Health==0) {app.ShowPopup("You failed!"); resetVars(false)}
						return;
					break;
					
					case "Enemie":
						glv.EnemiesPos[j][5]--
						app.ShowPopup( obj.Pos[j][5] );
						if(obj.Pos[j][5]==0) glv.EnemiesPos[j]=null
						var sum=0
						for(var j in glv.EnemiesPos) if(glv.EnemiesPos[j]) sum+=glv.EnemiesPos[j][5]
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
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] );
	lay.AddChild( world1 );
	
	world2= newWorld( "Level 2", null,
	[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] );
	lay.AddChild( world2 );
	
	world3= newWorld( "Level 3", null,
	[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
	[1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,1],
	[1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]] );
	lay.AddChild( world3 );
	
	world1.next=world2;
	world2.next=world3;
	world3.next=world1;
	
	//bar shown when player arrives at an nw map
	nameBar= app.CreateLayout( "Linear", "Horizontal" );
	nameBar.SetVisibility( "Hide" );
	nameText= app.CreateText( "",0.7,0.1 );
	nameText.SetTextSize( 25 );
	nameBar.AddChild( nameText );
	nameBar.SetBackGradientRadial(0, 0, 0.7,"blue", "#00000000" );
	lay.AddChild( nameBar );
	
	glv.Render();
	initControls();
	initSBubble();
}

//get textures
function initTexture() {
	Ground= app.CreateImage( "Img/Ground.png" );
	Rock= app.CreateImage( "Img/Rock.png" );
	Bullet= glv.CreateImage( "Img/Bullet.png" );
	Explode= glv.CreateImage( "Img/Explode.png" );
	Player= glv.CreateImage( "Img/TankB.png" );
	Enemie= glv.CreateImage( "Img/TankR.png" );
	layMain.AddChild( Ground );
	initWorlds();
}

//set speech bubble object
function initSBubble() {
	sb= app.CreateLayout( "Linear","FillXY,VCenter" );
	sb.SetPosition( 0,0.7 );
	sb.SetVisibility( "Hide" );
	sb.txt=app.CreateText( "",1,0.3,"multiline");
	sb.txt.SetTextColor( "black" );
	sb.txt.SetBackColor( "white" );
	sb.txt.SetTextSize( 20 );
	sb.AddChild( sb.txt );
	layMain.AddChild( sb );
}

//set control keys
function initControls() {
	layControls= app.CreateLayout( "linear","FillXY,HCenter" );
	layControls.SetTouchable( false );
	layControls.SetPosition( 0.7,0.4 );
	btnLeft= control("Left");
	btnRight= control("Right");
	btnUp= control("Up");
	btnDown= control("Down");
	btnEnter= control("[fa-dot-circle-o]");
	
	var layH= app.CreateLayout( "Linear", "Horizontal" );
	layH.AddChild( btnLeft );
	layH.AddChild( btnEnter );
	layH.AddChild( btnRight );
	
	layControls.AddChild( btnUp );
	layControls.AddChild( layH );
	layControls.AddChild( btnDown );
	
	layMain.AddChild( layControls );
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
	world.SetVisibility( "Hide" );

	if(!app.FileExists(Folder+"/Img/"+"/"+name+".png")) {
	var timg=app.CreateImage( img, sizX,sizY );
	//draw objects with worlds array
		var w=1/world.W, h=1/world.H;h
		for( i in arr )
			for( j in arr[i] ) {
				timg.DrawImage( Ground, j*w, i*h, w, h, 0 );
				switch(arr[i][j]) {
					case 1: timg.DrawImage( Rock, j*w, i*h, w, h, 0 ); break;
				}
			}
	timg.Save(Folder+"/Img/"+"/"+name+".png" );
	}
	glv.Images.push( glv.CreateImage(Folder+"/Img/"+"/"+name+".png" ));
	return world;
}

function resetVars(next) {
	clearInterval( itvBull );
	clearInterval( itvEne );
	layControls.SetTouchable( false );
	glv.PlayerHealth=3
	glv.BulletsPos=[];
	glv.EnemiesPos=[];
//clearglv
	if(greeted) {
		text="<Dlg>;restart;Do you want to restart the glv?;Yes,No"
		if( next && curW==world3 ) OnDlg()
		else change(curW,next?curW.next:curW,"Fade");
		} else change(null,world1,"Fade");
}