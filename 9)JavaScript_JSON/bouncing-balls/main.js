// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// 움직일 공들
function Ball(x,y, velX, velY, color, size){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 공을 그리는 함수 추가
Ball.prototype.draw = function(){
  ctx.beginPath(),
  ctx.fillStyle=this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();   //원 내부를 fill style로 채움.
}

// 공을 지속적으로 좌표를 업데이트할 함수 추가
Ball.prototype.update = function(){
  if((this.x + this.size) >= width){
    this.velX = -(this.velX);
  }
  if((this.x -this.size) <= 0 ){
    this.velX = -(this.velX);
  }
  if((this.y + this.size) >= height){
    this.velY = -(this.velY)
  }
  if((this.y - this.size) <= 0){
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;


  // 충돌 감지
  Ball.prototype.collisionDetect = function(){
    for(var j=0; j< balls.length; j++){
      if(!(this === balls[j])){
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        
        // 충돌한 공들은 색을 random하게 변화.
        if(distance < this.size + balls[j].size){
          balls[j].color = this.color = 'rgb(' + random(0,255)+','+random(0,255)+','+random(0,255)+')';
        }
      }
    }
  }
}

//공 객체들을 생성하는 함수
var balls = [];
while (balls.length < 25){
  var size = random(10, 20);
  var ball = new Ball(
    random(0 + size, width -size),
    random(0+size, height-size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255)+','+random(0,255)+','+random(0,255)+')',
    size
  );
  balls.push(ball);
}

// 생성된 공들을 draw하고 update하는 함수.
function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for(var i=0; i<balls.length;i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop); //화면 프레임 시작시 animation이 시작될 수 있도록 하는 함수.
                              //loop함수안에서 loop를 다시 불러옴, 반복적으로 실행됨.
}
loop();