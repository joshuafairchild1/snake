const canvas = document.getElementById('snake-area');
const c = canvas.getContext('2d');
const h = canvas.height;
const w = canvas.width;
const frameRate = 200;
const opposites = {
  right : 'left',
  down : 'up',
  left : 'right',
  up : 'down'
};
const keys = {
  37 : 'left',
  38 : 'up',
  39 : 'right',
  40 : 'down'
};


const snake = new Snake();
const square = new Square(c);
let dir;


function Snake() {
  this.direction = 'right';
  this.body = [];
}

//------------------------------------------------------------------------------
//----------add 5 segments to the body------------------------------------------
//------------------------------------------------------------------------------
Snake.prototype.init = function(sq) {
  for (let i = 0; i < 5; i++) {
    sq.draw(240 - (10*i), 240);
    this.body.push([240 - (10*i), 240]);
  }
}


//------------------------------------------------------------------------------
//----------add segment to end of body------------------------------------------
//------------------------------------------------------------------------------
Snake.prototype.grow = function(sq) {
  let bod = this.body;
  let prevLastSquare = bod[bod.length - 2];
  let lastSquare = bod[bod.length - 1];
  let newSquare;
  dir = this.direction;

  //mksqr to the left
  if (lastSquare[1] === prevLastSquare[1] && lastSquare[0] > prevLastSquare[0]) {
    newSquare = [lastSquare[0] - 10, lastSquare[1]];

  //mksqr to the right
  } else if (lastSquare[1] === prevLastSquare[1] && lastSquare[0] < prevLastSquare[0]) {
    newSquare = [lastSquare[0] + 10, lastSquare[1]];

  //mksqr going down
  } else if (lastSquare[0] === prevLastSquare[0] && lastSquare[1] > prevLastSquare[1]) {
    newSquare = [lastSquare[0], lastSquare[1] + 10];

  //mksqr going up
} else if (lastSquare[0] === prevLastSquare[0] && lastSquare[1] < prevLastSquare[1]) {
    newSquare = [lastSquare[0], lastSquare[1] - 10];
  }

  this.body.push(newSquare);
  for(let i = 0; i < this.body.length; i++) {
    sq.draw(this.body[i][0],this.body[i][1]);
  }
}

//------------------------------------------------------------------------------
//----------move the snake a single unit----------------------------------------
//------------------------------------------------------------------------------
Snake.prototype.move = function(sq) {
  let nextSpot;
  dir = this.direction;
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
}


//--------storing the template for a square inside of an object-----------------
function Square(context) {
  this.context = context;
  this.width = 10;
  this.height = 10;
}
//--------draw a Square---------------------------------------------------------
Square.prototype.draw = function(x,y) {
  this.context.fillStyle = 'black';
  this.context.fillRect(x,y,10,10);
}


//------------------------------------------------------------------------------
//----------update Snake.direction on keydown-----------------------------------
//------------------------------------------------------------------------------
function getDirection(snake) {
  window.addEventListener('keydown', e => {
    let lastDir = snake.direction;
    let clickedKey = e.keyCode;
    let isArrowKey = Object.keys(keys).includes(String(clickedKey));

    if (isArrowKey) {
      e.preventDefault();
      let keyDirection = keys[clickedKey];
      if (keyDirection !== opposites[lastDir]) {
        snake.direction = keyDirection;
      }
    }
  });
}


//------------------------------------------------------------------------------
//----------fn to init and begin running the game-------------------------------
//------------------------------------------------------------------------------
function game() {
  getDirection(snake);
  snake.init(square);

  setInterval(function() {
    snake.grow(square);
  },1500);

  setInterval(function() {
    snake.move(square);
    // debugger;
  }, frameRate)
}


//------------------------------------------------------------------------------
//----------start a new game----------------------------------------------------
//------------------------------------------------------------------------------
game();
