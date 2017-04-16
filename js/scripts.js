const canvas = document.getElementById('snake-area');
const c = canvas.getContext('2d');
const h = canvas.height;
const w = canvas.width;
const frameRate = 500;
const keys = {
  37 : 'left',
  38 : 'up',
  39 : 'right',
  40 : 'down'
};

const snake = new Snake();
const square = new Square(c);


function Snake() {
  this.direction = 'right';
  this.body = [];
}

//------------------------------------------------------------------------------
//----------add 5 units to the body---------------------------------------------
//------------------------------------------------------------------------------
Snake.prototype.init = function(sq) {
  for (let i = 0; i < 5; i++) {
    sq.draw(240 - (10*i), 240);
    this.body.push([240 - (10*i), 240]);
  }
}


//------------------------------------------------------------------------------
//----------Snake.body.length++ ------------------------------------------------
//------------------------------------------------------------------------------
Snake.prototype.grow = function(sq) {
  //stuff
}


//------------------------------------------------------------------------------
//----------move the snake a single unit----------------------------------------
//------------------------------------------------------------------------------
Snake.prototype.move = function(sq) {
  let dir = this.direction;
  let nextSpot;
  if (dir === 'right') {
    nextSpot = [(this.body[0][0])+10,this.body[0][1]];
  } else if (dir === 'left') {
    nextSpot = [(this.body[0][0])-10,this.body[0][1]];
  } else if (dir === 'up') {
    nextSpot = [this.body[0][0],(this.body[0][1]-10)];
  } else if (dir === 'down') {
    nextSpot = [this.body[0][0],(this.body[0][1]+10)];
  }

  for (let i = this.body.length - 1; i > 0; i--) {
    this.body[i] = this.body[(i-1)];
  }

  this.body[0] = nextSpot;
  console.log(dir);
  c.clearRect(0,0,h,w);
  for(let j = 0; j < this.body.length; j++) {
    sq.draw(this.body[j][0],this.body[j][1]);
  }
  // this.move(sq)
}


//------------------------------------------------------------------------------
//----------insert squares by using Square.draw()-------------------------------
//------------------------------------------------------------------------------
function Square(context) {
  this.context = context;
  this.width = 10;
  this.height = 10;
}
Square.prototype.draw = function(x,y) {
  this.context.fillStyle = 'black';
  this.context.fillRect(x,y,10,10);
}


//------------------------------------------------------------------------------
//----------update Snake.direction on keydown-----------------------------------
//------------------------------------------------------------------------------
function getDirection(snake) {
  window.addEventListener('keydown', function(e) {
    let clickedKey = e.keyCode;
    let keyDirection = keys[String(clickedKey)];
    snake.direction = keyDirection;

    // e.preventDefault();
  });
}


//------------------------------------------------------------------------------
//----------structure the flow of the game--------------------------------------
//------------------------------------------------------------------------------
function game() {
  snake.init(square);
  getDirection(snake);

  setInterval(function() {
    snake.move(square);
  }, frameRate)
}


//------------------------------------------------------------------------------
//----------start a new game----------------------------------------------------
//------------------------------------------------------------------------------
game();
