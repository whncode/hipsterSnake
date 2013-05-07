var HipsterSnake = {
  Snake : function (name, x, y){
    this.poses = [];
    this.poses.push(new HipsterSnake.Pos(x,y,null)); 
    this.breakMe(x, y);
    this.len = 200;
    this.name = name;
    this.angle = 4;
    this.color = '#ff0000';
  },
  Board : function(ctx){
    this.snakes = [];
    this.ctx = ctx; 
  },

  Pos : function(x, y, last){
    this.x = x;
    this.y = y;
    this.last = last;
  },
};

HipsterSnake.Snake.prototype.breakMe = function(x, y) {
  var new_pos = new HipsterSnake.Pos(this.getHead().x, this.getHead().y,this.getHead());
  this.poses.push(new_pos); 
};

HipsterSnake.Snake.prototype.look = function (x, y) {
  var dx = x - this.getHead().x;
  var dy = this.getHead().y - y;
  this.angle = Math.atan2(dx,dy);
  this.breakMe(x,y);
}

HipsterSnake.Snake.prototype.move = function (steps) {
  var new_x = Math.sin(this.angle) * steps;
  var new_y = Math.cos(this.angle) * steps;

  this.getHead().x += new_x;
  this.getHead().y -= new_y;

  this.refreshTail();

  return {'x' : new_x, 'y' : new_y};
};

HipsterSnake.Snake.prototype.getHead = function () {
  return this.poses[this.poses.length - 1];
};

//@todo : fix
HipsterSnake.Snake.prototype.refreshTail = function () {
  var len = 0;
  var i = 0;
  var new_poses = [];
  for(i = this.poses.length -1; i >= 0; i--){
    if(this.poses[i].last !== null){
      new_poses.push(this.poses[i]);
      len += this.poses[i].lenToLast();
      
      if(len > this.len){
        var new_tail_start = new_poses.pop();
        var angle = new_tail_start.getAngleToLast();  
        var need_len = this.len - (len - new_tail_start.lenToLast());

        var new_x = new_tail_start.x + (Math.cos(angle) * need_len);
        var new_y = new_tail_start.y + (Math.sin(angle) * need_len);
        var new_tail_end = new HipsterSnake.Pos(new_x, new_y, null);
        new_tail_start.last = new_tail_end;
        new_poses.push(new_tail_start);
        new_poses.push(new_tail_end);

      }

    }
  }
  this.poses = new_poses.reverse();

};

HipsterSnake.Pos.prototype.lenToLast = function() {
  var dx = Math.abs(this.x - this.last.x);
  var dy = Math.abs(this.y - this.last.y); 
  return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)); 
};

HipsterSnake.Pos.prototype.getAngleToLast = function(pos){
  var dx = this.x - this.last.x;
  var dy = this.y - this.last.y;
  return Math.atan2(dx, dy);
};

HipsterSnake.Board.prototype.newSnake = function(name){
  var snake = HipsterSnake.Snake;
  this.snakes.push(new snake(name,100,100));
};

HipsterSnake.Board.prototype.drawAll = function(){
  this.drawBackground();
  this.snakes.forEach(this.drawSnake);
};

HipsterSnake.Board.prototype.drawBackground = function(){
  this.ctx.fillStyle = "#fef";
  this.ctx.fillRect(0,0,500, 500);
};

HipsterSnake.Board.prototype.moveAll = function(){
  this.snakes.forEach(function(snake){
    snake.move(1);
  }); 
}

HipsterSnake.Board.prototype.drawSnake = function (snake){
  
  this.ctx.beginPath();
  this.ctx.closePath();
  //this.ctx.lineCap = "round";
  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "#000000";
  this.ctx.arc(snake.getHead().x, snake.getHead().y, 10, snake.angle + Math.PI, Math.PI*2 + snake.angle, false); 
  //draw tail
  ctx.beginPath();
  ctx.closePath();
  this.ctx.font =  '12px Monospace' ; 

  this.ctx.fillStyle = "#000000";
  this.ctx.fillText(snake.len, snake.getHead().x, snake.getHead().y);
  
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
