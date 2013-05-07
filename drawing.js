HipsterSnake.Board.prototype.drawSnake = function (snake){
  this.ctx.beginPath();
  this.ctx.closePath();
  this.ctx.lineCap = "round";
  this.ctx.lineWidth = 4;
  this.ctx.strokeStyle = "#ff0000";
  this.ctx.arc(snake.getHead().x, snake.getHead().y, 10, snake.angle + Math.PI, Math.PI*2 + snake.angle, false); 
  //draw tail
  ctx.beginPath();
  ctx.closePath();
  this.ctx.font =  '12px Monospace' ; 
  this.ctx.fillStyle = "#000000";
  this.ctx.fillText(snake.len + ' ' + snake.name, snake.getHead().x, snake.getHead().y);
  
  this.ctx.beginPath();
  this.ctx.closePath();

  this.ctx.moveTo(snake.getHead().x, snake.getHead().y);
  this.ctx.strokeStyle = snake.color; 
  this.ctx.lineWidth = 4;
  for(var i = snake.poses.length - 1; i >= 0; i--){
    ctx.lineTo(snake.poses[i].x, snake.poses[i].y); 
  }
  ctx.stroke();
};

HipsterSnake.Board.prototype.drawBackground = function(){
  this.ctx.fillStyle = "#fef";
  this.ctx.fillRect(0,0,500, 500);
};

HipsterSnake.Board.prototype.drawAll = function(){
  this.drawBackground();
  this.snakes.forEach(this.drawSnake);
};

var canvas = document.getElementById('drawSpace');
var ctx = canvas.getContext('2d');

board1 = new HipsterSnake.Board(ctx);
board1.newSnake('STEFAN');
board1.drawAll();



//everyhing bottom to refactor
//only for testing existing code
canvas.onclick = function (event){
  var x, y;

  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canvas.offsetLeft);
  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canvas.offsetTop) + 1;

  board1.snakes[0].look(x,y);
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();




function animate() {
  board1.moveAll();  
  board1.drawAll();
  // request new frame
  requestAnimFrame(function() {
    animate();
  });
}
animate();


