var HipsterSnake = {
  Snake : function (name, x, y){
    this.poses = [];
    this.poses.push(new pos(x,y,null)); 
    this.len = 100;
    this.name = name;
    this.angle = 4;
    this.color = '#ff0000';
  },
  Board : function(ctx){
    this.snakes = [];
    this.ctx = ctx;
    
    var snake = HipsterSnake.Snake;
  }

};

HipsterSnake.Snake.prototype.goTo = function(x, y) {
  var new_pos = new pos(this.getHead().x, this.getHead().y,this.getHead());
  this.poses.push(new_pos); 
};

HipsterSnake.Snake.prototype.look = function (x, y) {
  var dx = x - this.getHead().x;
  var dy = this.getHead().y - y;
  this.angle = Math.atan2(dx,dy);
};

HipsterSnake.Snake.prototype.move = function (steps) {
  var new_x = Math.sin(this.angle) * steps;
  var new_y = Math.cos(this.angle) * steps;

  this.getHead().x += new_x;
  this.getHead().y -= new_y;

  return {'x' : new_x, 'y' : new_y};
};

HipsterSnake.Snake.prototype.getHead = function () {
  return this.poses[this.poses.length - 1];
};

HipsterSnake.Snake.prototype.refreshTail = function () {
  var positions = this.positions.slice();
  var len = 0;
};

var pos = function (x, y, last) {
  this.x = x;
  this.y = y;
  this.last = last;

  this.lenTo = function(pos) {
    var dx = Math.abs(this.x - pos.x);
    var dy = Math.abs(this.y - pos.y);
    return Math.sqrt(Math.pow(dx,2)+Math.pow(xy,2)); 
  }
};

HipsterSnake.Board.prototype.newSnake = function(name){
      this.snakes.push(new snake(name,100,100));
};

HipsterSnake.Board.prototype.drawAll = function(){
      drawBackground();
      snakes.forEach(drawSnake);
};

HipsterSnake.Board.prototype.drawBackground = function (){
      this.ctx.fillStyle = "#fef";
      this.ctx.fillRect(0,0,500, 500);
};

HipsterSnake.Board.prototype.drawSnake = function (snake){
      newLine();
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "#000000";
      this.ctx.arc(snake.getHead().x, snake.getHead().y, 10, snake.angle + Math.PI, Math.PI*2 + snake.angle, false); 

      //draw tail
      newLine();
      this.ctx.moveTo(snake.getHead().x, snake.getHead().y);
      this.ctx.strokeStyle = snake.color; 
      this.ctx.lineWidth = 4;
      for(var i = snake.poses.length - 1; i >= 0; i--){
        ctx.lineTo(snake.poses[i].x, snake.poses[i].y); 
      }
      ctx.stroke();
}; 


var canvas = document.getElementById('drawSpace');
var ctx = canvas.getContext('2d');

board1 = new HipsterSnake.Board(ctx);
board1.newSnake('STEFAN');
board1.drawAll();

canvas.onclick = function (event){
  var x, y;

  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canvas.offsetLeft);
  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canvas.offsetTop) + 1;

  new_snake.look(x,y);
  new_snake.goTo(x,y);
}

//everyhing bottom to refactor
window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();




function animate() {
  new_snake.move(1);
  new_snake.drawMe(ctx);
  // request new frame
  requestAnimFrame(function() {
    animate();
  });
}
animate();
