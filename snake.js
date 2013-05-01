

var snake = function (name, x, y){
    this.poses = [];
    this.poses.push(new pos(x,y,null)); 
    this.len = 100;
    this.name=name;
    this.angle = 4;
    this.color = '#ff0000';

    this.goTo = function(x, y) {
        var new_pos = new pos(this.getHead().x, this.getHead().y,this.getHead());
        this.poses.push(new_pos); 
    }

    this.look = function (x, y) {
        var dx = x - this.getHead().x;
        var dy = this.getHead().y - y;
        this.angle = Math.atan2(dx,dy);
    }

    this.move = function (steps) {
        var new_x = Math.sin(this.angle) * steps;
        var new_y = Math.cos(this.angle) * steps;
        
        this.getHead().x += new_x;
        this.getHead().y -= new_y;
    }

    this.getHead = function () {
        return this.poses[this.poses.length - 1];
    }
  
    var refreshTail = function () {
        var positions = this.positions.slice();
        var len = 0;
    }

    this.isOut = function (){
        
    }

    this.drawMe = function (ctx) {

        //ctx.stroke();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000000";
        ctx.arc(this.getHead().x, this.getHead().y, 10, this.angle + Math.PI, Math.PI*2 + this.angle, false); 

        //ctx.strokeStyle = "#00FF00"; 
        ctx.stroke(); 
        ctx.lineCap = "round";

        ctx.moveTo(this.getHead().x, this.getHead().y);

        ctx.strokeStyle = this.color; 

        
        ctx.lineWidth = 4;

        for(var i = this.poses.length - 1; i >= 0; i--){
            ctx.lineTo(this.poses[i].x, this.poses[i].y); 
        }

        ctx.stroke();
        
    }

    function pos(x, y, last) {
        this.x = x;
        this.y = y;
        this.last = last;
    
        this.lenTo = function(pos) {
            var dx = Math.abs(this.x - pos.x);
            var dy = Math.abs(this.y - pos.y);
            return Math.sqrt(Math.pow(dx,2)+Math.pow(xy,2)); 
        }
    }
}
//testy


var space = function(ctx) {
    var snakes = [];
    var ctx = ctx;

    function drawBackground(){
        ctx.fillStyle = "#fef";
        ctx.fillRect(0,0,500, 500);
    }

    function drawSnake(snake){
        newLine();
        ctx.lineCap = "round";
        //draw head
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000000";
        ctx.arc(snake.getHead().x, snake.getHead().y, 10, snake.angle + Math.PI, Math.PI*2 + snake.angle, false); 
    
        //draw tail
        ctx.moveTo(snake.getHead().x, snake.getHead().y);
        ctx.strokeStyle = snake.color; 
        ctx.lineWidth = 4;
        for(var i = snake.poses.length - 1; i >= 0; i--){
            ctx.lineTo(snake.poses[i].x, snake.poses[i].y); 
        }
        ctx.stroke();
        newLine();

    } 
    
        /**
         *  hack to draw new path
         **/
    function newLine(){
        ctx.beginPath();
        ctx.closePath();
        }
    
}


var canvas = document.getElementById('drawSpace');
var ctx = canvas.getContext('2d');

var new_snake = new snake('snake1',200,200);
new_snake.goTo(30,30);
new_snake.drawMe(ctx);

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
