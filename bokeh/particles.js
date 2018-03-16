
function Particles(selector){
  this.colors = ['0, 0, 0']
  this.blurry = false;
  this.border = false;
  this.background = false;
  this.minRadius = 10;
  this.maxRadius = 35;
  this.minOpacity = .05;
  this.maxOpacity = .5;
  this.minSpeedX = -.05;
  this.maxSpeedX = .05;
  this.minSpeedY = .05;
  this.maxSpeedY = .5;
  this.fps = 60;
  this.numParticles = 200;
  this.canvas = document.querySelector(selector);
  this.ctx = this.canvas.getContext('2d');
}

Particles.prototype.setup = function(options){
  for(var prop in options){
    this[prop] = options[prop];
  }
}

Particles.prototype.setBackGround = function(src){
  var img = new Image();
  img.src = src;
  this.background = img
}

Particles.prototype.init = function(){
  this.render();
  this.createCircle();
}

Particles.prototype.random = function(min, max){
  return Math.random() * (max - min) + min;
}

Particles.prototype.render = function(){
  var self = this
  self.canvas.width = window.innerWidth;
  self.canvas.height = window.innerHeight;
  
  window.onresize = function(){
    self.render()
  }
}

Particles.prototype.createCircle = function(){
  var particle = [];

  for (var i = 0; i < this.numParticles; i++) {
    var self = this,
      color = self.colors[~~(self.random(0, self.colors.length))];
    
    particle[i] = {
      radius      : self.random(self.minRadius, self.maxRadius),
      xPos        : self.random(0, canvas.width),
      yPos        : self.random(0, canvas.height),
      xVelocity : self.random(self.minSpeedX, self.maxSpeedX),
      yVelocity : self.random(self.minSpeedY, self.maxSpeedY),
      color        : 'rgba(' + color + ',' + self.random(self.minOpacity, self.maxOpacity) + ')'
    }
    
    self.draw(particle, i);
  }
  self.animate(particle);
}

Particles.prototype.draw = function(particle, i){
  var self = this,
    ctx = self.ctx;
  
  if(self.blurry){
    var grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius/self.blurry);
    
    grd.addColorStop(1.000, particle[i].color);
    grd.addColorStop(0.000, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grd;
  } else {
    ctx.fillStyle = particle[i].color; 
  }
  
  if (self.border) {
    ctx.strokeStyle = self.border;
    ctx.stroke();
  }
  
  ctx.beginPath();
  ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
  ctx.fill();
}

Particles.prototype.animate = function(particle){
  var self = this,
    ctx = self.ctx;
  
  setInterval(function(){
    self.clearCanvas();
    for (var i = 0; i < self.numParticles; i++) {
      particle[i].xPos += particle[i].xVelocity;
      particle[i].yPos -= particle[i].yVelocity;
     
      if (particle[i].xPos > self.canvas.width + particle[i].radius || particle[i].yPos > self.canvas.height + particle[i].radius ||
           particle[i].xPos < -particle[i].radius || particle[i].yPos < -particle[i].radius) {
        self.resetParticle(particle, i);
      } else {
        self.draw(particle, i);
      }
    }  
  }, 1000/self.fps); 
}

Particles.prototype.resetParticle = function(particle, i){
  var self = this;
  var part = particle[i];
    part.yPos = self.random(-part.radius, (Math.sign(part.yVelocity)>0)? self.canvas.height + part.radius : -part.radius);
    part.xPos = self.random(-part.radius, (Math.sign(part.xVelocity)>0)? self.canvas.width + part.radius : -part.radius);
  self.draw(particle, i);
}

Particles.prototype.clearCanvas = function(){
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  var bg = this.background
  if(bg) this.ctx.drawImage(bg, -(canvas.width*bg.width/bg.height)*0.25, 0, canvas.width*bg.width/bg.height, canvas.height);
}