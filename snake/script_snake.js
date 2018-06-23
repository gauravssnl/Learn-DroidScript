window.onload=function(){
		app.SetOrientation( "Portrait" );
    app.SetScreenMode( "Game" );
    var bod=document.getElementById("bodyI");
    bod.style.height="100vh";
    bod.style.width="100vw";
var item1,item2,item3,circle,menuFlag;
menuFlag=false;
// 	$("#divTwo").on("transitionend",	function(){if($("#wrap").hasClass("floatButtonAnim")){$(".menuHidden").toggleClass("menuVisible");app.ShowPopup("1")};});
// 	$("#divTwo").on("transition",	function(){$(".menuHidden").toggleClass("menuVisible");app.ShowPopup("1");});
$(function(){
item1=$("<div></div>").addClass("menuHidden");
$("#divTwo").append(item1);
item2=$("<div></div>").addClass("menuHidden");
$("#divTwo").append(item2);
 item3=$("<div></div>").addClass("menuHidden");
$("#divTwo").append(item3);
// circle=$("<div></div>").addClass("animButtonCircle");
//document.getElementById("divOne").addEventListener("transitionend",function(){app.ShowPopup("s")});
    	
});
$(function(){  
   $("#divTwo").click(function(e){
  e.preventDefault();
 if (gameState==="stop"){ e.stopPropagation();
 app.ShowPopup( e.pageX );
 
 };
  })
 item1.click(function(e){
  //let bound=item1.getBoudingClientRect();
  item1.toggleClass("test");
  document.getElementById("bodyId").style.filter="blur(1px)";
  //circle.css({"top":Number(e.pageY-item1.css("top"))+"px"});
 // circle.animate({width:"300%",height:"300%"},300,function(){circle.css({"width":"0%"})});
  e.preventDefault();
  e.stopPropagation();
  });
   item2.click(function(e){
 item2.toggleClass("test");
  document.getElementById("bodyId").style.filter="grayscale(50%)";
 // $(this).append($("<div></div>").addClass("animButtonCircle").animate({width:"300%",height:"300%"},300,function(){circle.css({"width":"0%"});$(".animButtonCircle").remove()}));
  e.preventDefault();
  e.stopPropagation();
  });
  item3.click(function(e){
 item3.toggleClass("test");
  document.getElementById("bodyId").style.filter="";
 // $(this).append($("<div></div>").addClass("animButtonCircle").animate({width:"300%",height:"300%"},300,function(){circle.css({"width":"0%"});$(".animButtonCircle").remove()}));
  e.preventDefault();
  e.stopPropagation();
  });
  $("#menu").click(function(e){
  
  e.preventDefault();
  e.stopPropagation();
  gameState==="start"?stop():start();
  if(!menuFlag){
  				//$("#bodyId").addClass("blurBody");
  				$("#bodyId").toggleClass("backBody");
  	
  				$("#divTwo")
  				.css("background","#ffeb3b")
  				.animate({width:"+=50vw",left:"-=60vw"},400)
  				.animate({height:"+=50vw",top:"-=60vw",borderRadius:"5px"},{duration:300,queue:false,complete:
    	  function(){	$("#menu").toggleClass("menuClass");
    		$("#wrap").toggleClass("floatButtonAnim");
    		$(".menuHidden").toggleClass("menuVisible");
    		
    		}});
    		menuFlag=true;
   }
   else if(menuFlag){
   			$(".menuHidden").toggleClass("menuVisible");
  				$("#bodyId").toggleClass("backBody");
  				$("#divTwo")
  				.animate({width:"-=50vw",left:"+=60vw"},400)
  				.animate({height:"-=50vw",top:"+=60vw"},{duration:300,queue:false,complete:
    	  function(){	
    	  $("#menu").toggleClass("menuClass");
    		$("#wrap").toggleClass("floatButtonAnim");
    		$(this).css("background","#fff");
    		
    		}});
    		menuFlag=false;
   	}		
    			//$('#divTwo').on("transitionend",	function(){$(".menuHidden").toggleClass(".menuHidden menuVisible")});
    		//$(".menuHidden").toggleClass("menuVisible");
   
    	//	$(".menuVisible").removeClass("menuVisible");
    		
    		});
});
/*snake99.pushCell({x:10,y:50});

snake99.pushCell({x:10,y:50});
for (let i = 0;i<2;i++){
  snake99.pushCell({x:10,y:50});
  }
snake99.cells[0].elementDiv.style.background=`rgba(0,200,0,1)`;
snake99.cells[0].elementDiv.style.boxShadow="0px 0px 10px 2px red,0px 0px 40px 10px red";
*/
 

var di1=[];
var score =document.querySelector('#score');
var lastScore = document.getElementById('lastScore');
var initialPoint;
var finalPoint;

var snake99 = new snakeObjekt();
//app.WriteFile( "/sdcard/snake99.txt", JSON.stringify(snake99) );

//var snake99=JSON.parse( app.ReadFile( "/sdcard/snake99.txt") );

class Apple{
	constructor(){
		this.randPos = () =>{
			return ({x:getRandomInt(1,9) *10+gR(),y:getRandomInt(1,Math.floor(snake99.maxH/10)) *10+gR()});
		}
    this.xymy=this.randPos();
    this.appleDiv = new createDiv(1,this.xymy,"#ff3d00","ff3d00");
    this.appleDiv.elementDiv.style.boxShadow="0px 2px 5px 0px #000";
    this.newPos=()=>{
    	this.xymy=this.randPos();
    	this.appleDiv.tr(this.xymy);
    }
    //return this.appleDiv;
   }
}
var apple= new Apple();
//var snake99 = new snakeObjekt();
bod.addEventListener('touchstart', function(event) {
//  event.preventDefault();
  event.stopPropagation();
  //this.style.background="red";
  initialPoint=event.changedTouches[0];
}, false);
bod.addEventListener('touchend',  function(event) {
  //event.preventDefault();
  //event.stopPropagation();

  //app.ShowPopup( JSON.stringify(this.xymy )+"::"+gR());
  
  finalPoint=event.changedTouches[0];
  var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
   if (xAbs > yAbs) {
    if (finalPoint.pageX < initialPoint.pageX){
      snake99.move("left");
      
    }else{
     snake99.move("right");
     }
   }else { if (finalPoint.pageY < initialPoint.pageY){
     snake99.move("up");
   }else{
     snake99.move("down");
     }
}}}, false);
var vScore=0,vLastScore=0;

var corr=app.GetDisplayHeight()/app.GetDisplayWidth();

function gR(){
if(Math.random()>0.5){
return Number(0);}
return Number(5);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var intervalAnim,intervalMove,gameState;
function start(){
intervalAnim=setInterval(snake99.animationShadow,500);
intervalMove=setInterval(snake99.moveStep,100,apple);
gameState="start";
}
function stop(){
clearInterval(intervalAnim);
clearInterval(intervalMove);
gameState="stop";
}
start();

}