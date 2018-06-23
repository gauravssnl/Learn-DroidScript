class snakeObjekt {
		constructor(){
				this.cellsCout = 1;
				this.cells=[];
				this.step = 5;
				this.cellWH = 5;
				this.maxW=100;
        this.score=0;
				this.bgColor=["radial-gradient(circle,#424242 40%,#ffde00 50%,#212121 60%)","radial-gradient(circle,#ff3d00 30%,#424242 40%,#ffff00 50%,#212121 60%)"];
				this.shadow=["0px 2px 2px 0px black","0px 0px 25px 3px #ff3d00"];
				this.shadpwIdx=0;
				this.cr = app.GetScreenHeight()/app.GetScreenWidth();
				this.maxH=parseInt(100*(this.cr));
				while((this.maxH%5)!=0){this.maxH-=1}
				this.directionHead = {x:5,y:0};
				app.ShowPopup( Math.floor(this.maxH/10));
		
		this.animationShadow = () =>{
						this.shadowIdx===0?this.shadowIdx=1:this.shadowIdx=0;
						this.cells[0].elementDiv.style.boxShadow=this.shadow[this.shadowIdx];
						this.cells[0].elementDiv.style.background=this.bgColor[this.shadowIdx];
	  }			
	  this.pushCell = (arg)=>{
				this.cells.unshift(new createDiv(1,arg,"radial-gradient(circle,#424242 40%,#ffde00 50%,#212121 60%)","0px 2px 5px 0px rgb(0,0,0)"));
		}
		this.moveStep = (apple,dir = this.directionHead)=>{
				for(let i = 0;i<this.cells.length;i++){
						if(i===0){
						
									let c=this.cells[0].xy;
									//app.ShowPopup( c.x +">"+apple.xymy.x);
									if(c.x===apple.xymy.x&&c.y===apple.xymy.y){
										this.cells[0].setCreateColorAndShadow();
										this.pushCell(apple.xymy);
										apple.newPos();
                    $("#score").text(++this.score);
										break;
									}
									
									//app.ShowPopup( JSON.stringify(this.cells[0].xy) );
									if(dir.x!=0){
							  		if((c.x<95)&&(c.x!=0)){
											this.cells[0].tr({x:(this.cells[0].xy.x+dir.x),y:(this.cells[0].xy.y+dir.y)});
										}
										else if((c.x===0)&&(dir.x<0)){
											this.cells[0].tr({x:95,y:this.cells[0].xy.y+dir.y})
										}
										else if((c.x===0)&&(dir.x>0)){
											this.cells[0].tr({x:c.x+dir.x,y:c.y});
										}
										else if((c.x===95)&&(dir.x>0)){
											this.cells[0].tr({x:0,y:this.cells[0].xy.y})
										}
										else if((c.x===95)&&(dir.x<0)){
											this.cells[0].tr({x:c.x+dir.x,y:c.y})
										}
								}
								if(dir.y!=0){
									if((c.y<this.maxH)&&(c.y!=0)){
											this.cells[0].tr({x:(this.cells[0].xy.x+dir.x),y:(this.cells[0].xy.y+dir.y)});
										}
										else if((c.y===0)&&(dir.y<0)){
											this.cells[0].tr({x:c.x,y:this.maxH})
										}
										else if((c.y===0)&&(dir.y>0)){
											this.cells[0].tr({x:c.x,y:c.y+dir.y});
										}
										else if((c.y===this.maxH)&&(dir.y>0)){
											this.cells[0].tr({x:c.x,y:0})
										}
										else if((c.y===this.maxH)&&(dir.y<0)){
											this.cells[0].tr({x:c.x,y:c.y+dir.y})
										}
								}
								}
							 else{
							 // i%2>0?this.cells[i].s.background="#ff6e40":this.cells[i].setCreateColorAndShadow();
							 	this.cells[i].tr(this.cells[i-1].xyPrev);
								}
				}
		}
		
		this.move=(arg1)=>{
				switch (arg1){
						case "left":
								this.directionHead={x:-5,y:0};
								
								break;
						case "down":
								this.directionHead={x:-0,y:5};
								break;
						case "right":
							  this.directionHead={x:5,y:0};
								break;
						case "up":
								this.directionHead={x:0,y:-5};
								break;
				};
		}
		for (let i = 0;i<7;i++){
  this.pushCell({x:10,y:50});}
		
}

}								