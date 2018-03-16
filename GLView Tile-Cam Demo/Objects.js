
function round(v, d) { return Math.round(v*d)/d }

//Obj2D class
function Obj2D(imgID, x, y, v, sx, sy, angle) {
	this.x = x || 0;
	this.y = y || 0;
	this.v = v || 0;
	this.sx = sx || 1;
	this.sy = sy || 1;
	this.imgID = imgID || null;
	this.angle = angle || 0;
	
	this.visible = true;
	
	this.Draw = function(rect) {
		DrawTile( rect, this.imgID, this.x, this.y, rect.w, rect.h, 0 );
	}
}

//camera class
function Camera(x, y, df, tw, scale, aspect) {
	this.x = x || 0;
	this.y = y || 0;
	this.df = df || 0;
	this.tw = tw || 10;
	this.scale = scale || 1;
	this.aspect = aspect || 0.5;
	
	this.th = this.tw / this.aspect;
	
	//move camera to object where v = df * distance
	//the smaller the distance the slower thecamera will move
	this.moveTo = function(obj, dt) {
		this.x += dt * this.df * (obj.x - this.x);
		this.y += dt * this.df * (obj.y - this.y);
	}
	
	//returns the current visible area, optionally cropped
	this.getRect = function(minX, minY, maxX, maxY) {
		var rx = this.scale * this.tw / 2,
			ry = this.scale * this.th / 2,
			rect = {
				x1: this.x - rx, y1: this.y - ry,
				x2: this.x + rx, y2: this.y + ry
			};
		
		//size
		rect.w = rect.x2 - rect.x1;
		rect.h = rect.y2 - rect.y1;
		
		//crop
		if(minX != null && rect.x1 < minX) rect.x1 = minX;
		if(maxX != null && rect.x2 > maxX) rect.x2 = maxX;
		if(minY != null && rect.y1 < minY) rect.y1 = minY;
		if(maxY != null && rect.y2 > maxY) rect.y2 = maxY;
		
		//rounded values
		rect.ix1 = Math.floor(rect.x1);
		rect.ix2 = Math.ceil(rect.x2);
		rect.iy1 = Math.floor(rect.y1);
		rect.iy2 = Math.ceil(rect.y2);
		
		return rect;
	}
}