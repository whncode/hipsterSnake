var HipsterSnake = {
  Snake : function (name, x, y, board){
    this.poses = [];
    this.poses.push(new HipsterSnake.Pos(x,y,null)); 
    this.breakMe(x, y);
    this.len = 100;
    this.name = name;
    this.angle = 4;
    this.color = '#ff0000';
    this.board = board;
  },
  Board : function(ctx){
    this.snakes = [];
    this.fruits = [];
    this.ctx = ctx; 
  },

  Pos : function(x, y, last){
    this.x = x;
    this.y = y;
    this.last = last;
  },

  Fruit : function(x, y, val){
    this.x = x;
    this.y = y;
    this.val = val;
  }
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

        var new_x = new_tail_start.x - (Math.sin(angle) * need_len);
        var new_y = new_tail_start.y - (Math.cos(angle) * need_len);
        var new_tail_end = new HipsterSnake.Pos(new_x, new_y, null);
        new_tail_start.last = new_tail_end;
        new_poses.push(new_tail_start);
        new_poses.push(new_tail_end);
        this.poses = new_poses.reverse();
        break;
      }
    }
  }
};

HipsterSnake.Snake.eat = function(fruit){
    this.len+=fruit.val;
    this.fruit.destroy();
    this.board.newFruit();
}

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
  this.snakes.push(new snake(name,100,100, this));
};

HipsterSnake.Board.prototype.moveAll = function(){
    this.snakes.forEach(function(snake){
    var place = snake.move(1);
    //this.checkCollision(place);

  }); 
}


HipsterSnake.Board.prototype.checkCollision = function(snake){
    //with snakes
    var x = snake.getHead().x;
    var y = snake.getHead().y;
    var in_x = false;
    var in_y = false;
    this.snakes.foreach(function(c_snake){
        c_snake.poses.foreach(function(pos){
            if(pos.x <= pos.last.x){
                in_x = (pos.x < x < pos.last.x);
            } else {
                in_x = (pos.last.x < x < pos.x); 
            }

            if(pos.y <= pos.last.y){
                in_y = (pos.y < y < pos.last.y);
            } else {
                in_y = (pos.last.y < y < pos.y); 
            }

            if(in_x && in_y){
                var a = (pos.x - pos.last.x) / (pos.y - pos.last.y);
            } else {
                return false;
            }
        });
    });
}

