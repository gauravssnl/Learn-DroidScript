class createDiv {
		constructor(idx,navi={x:0,y:0,w:"5vw",h:"5vw"},colorBack="green",strShadow="0px 0px 30px 3px green",targ=document.getElementById("bodyId")){
				this.idx=idx;
				this.xy = navi; 
				this.xyPrev;
				this.createColorBackground=colorBack;
				this.createShadow=strShadow;
				this.elementDiv=document.createElement("div"); 
				this.memCol=this.elementDiv.style.background=colorBack;
				this.elementDiv.style.position="absolute";
				this.elementDiv.style.width="3vw";
				this.elementDiv.style.height="3vw";
				this.elementDiv.style.borderRadius="50%";
				this.elementDiv.style.boxShadow=strShadow ;
				this.elementDiv.style.border="0px solid transparent";
				this.elementDiv.style.transition="box-shadow .45s";
				this.elementDiv.style.transform=`translate(${this.xy.x}vw,${this.xy.y}vw)`;
				targ.appendChild (this.elementDiv);
				this.s=this.elementDiv.style;
				this.setCreateColorAndShadow=()=>{
						this.s.background=this.createColorBackground;
						this.s.boxShadow=this.createShadow;
				}
				this.tr = (navi2={x:0,y:0}) => {
						this.xyPrev = this.xy;
						this.xy = navi2;
						this.elementDiv.style.transform=`translate(${this.xy.x}vw,${this.xy.y}vw)`;
				}
		}
}