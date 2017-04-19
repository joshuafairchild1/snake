const canvas = document.getElementById('snake-area');
const c = canvas.getContext('2d');
const h = canvas.height;
const w = canvas.width;
const frameRate = 100;
const snake = new Snake();
const square = new Square(c);

const opposites =
{
  right : 'left',
  down : 'up',
  left : 'right',
  up : 'down'
};

const keys =
{
  37 : 'left',
  38 : 'up',
  39 : 'right',
  40 : 'down'
};
let newFood = [100,100];
let dir;
let head;


                      /*-------------------------------
                   --------Snake object and protos--------
                      -------------------------------*/

function Snake() {
  this.direction = 'right';
  this.body = [];
  this.score;
}


//----------add 8 segments to the body------------------------------------------
Snake.prototype.init = function(sq) {
  for (let i = 0; i < 8; i++) {
    sq.draw(240 - (10*i), 240);
    this.body.push([240 - (10*i), 240]);
  }
}


//----------add segment to end of body------------------------------------------
Snake.prototype.grow = function(sq, food) {
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
  sq.draw(food[0], food[1])
}


//----------move the snake a single unit----------------------------------------
Snake.prototype.move = function(sq, food) {
  let nextSpot;
  dir = this.direction;

  //based on the direction, determine the coords of what the next spot is to be
  if (dir === 'right') {
    nextSpot = [(this.body[0][0])+10,this.body[0][1]];
  } else if (dir === 'left') {
    nextSpot = [(this.body[0][0])-10,this.body[0][1]];
  } else if (dir === 'up') {
    nextSpot = [this.body[0][0],(this.body[0][1]-10)];
  } else if (dir === 'down') {
    nextSpot = [this.body[0][0],(this.body[0][1]+10)];
  }

  //kill the snake if necessary
  //check for contact with wall
  if (nextSpot[0] <= -10 || nextSpot[0] >= 500 || nextSpot[1] <= -10 || nextSpot[1] >= 500) {
    // debugger;
    gameOver();
  }
  //check for contact with self
  for (let k = 0; k < this.body.length; k++) {
    if (nextSpot[0] === this.body[k][0] && nextSpot[1] === this.body[k][1]) {
      // debugger;
      gameOver();
    }
  }

  //move all of the Snake.body arrays (squares) forward by one space
  for (let i = this.body.length - 1; i > 0; i--) {
    this.body[i] = this.body[(i-1)];
  }
  this.body[0] = nextSpot;

  //draw the new snake and the current food
  c.clearRect(0,0,h,w);
  // c.fillStyle='black';    /* uncommenting these two lines looks pretty cool */
  // c.fillRect(0,0,h,w);
  for (let j = 0; j < this.body.length; j++) {
    sq.draw(this.body[j][0],this.body[j][1]);
  }
  sq.draw(food[0],food[1]);
}


//----------recognize & handle the snake eating food----------------------------
Snake.prototype.lookForFood = function(sq, food) {
  head = [this.body[0][0],this.body[0][1]];
  if (head[0] === food[0] && head[1] === food[1]) {
    this.grow(sq, food);
    newFood = spawnFood(sq);

    for (let i = 0; i < this.body.length; i++) {
      if (newFood[0] === this.body[i][0] && newFood[1] === this.body[i][1]) {
        // debugger;
        newFood = spawnFood(sq);
      }
    }
  }
}


Snake.prototype.getScore = function() {
  let unformattedScore = this.body.length - 8;
  let str = "" + unformattedScore;
  let pad = "000";
  this.score = pad.substring(0, pad.length - str.length) + str;
}



                      /*------------------------------
                   --------Square object & protos--------
                      ------------------------------*/

//--------store the template for a square inside of an object constructor-------
function Square(context) {
  this.context = context;
  this.width = 10;
  this.height = 10;
}


//--------draw a Square---------------------------------------------------------
Square.prototype.draw = function(x,y) {
  this.context.fillStyle = 'black';
  this.context.lineWidth = 2;
  this.context.strokeStyle = "white";
  this.context.fillRect(x,y,10,10);
  this.context.strokeRect(x, y, 10, 10);
}



                      /*-----------------
                   --------Functions--------
                      -----------------*/

//----------update Snake.direction on keydown-----------------------------------
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


//----------draw a square at a random x,y pos-----------------------------------
function spawnFood(sq) {
  let randomSpot = Math.floor(Math.random()*(490-20+1)+10);
  let posX = Math.ceil((randomSpot+1) / 10) * 10;
  let posY = Math.ceil((randomSpot+1) / 10) * 10;
  return [posX,posY];
  sq.draw(posX,posY);
  console.log([posX,posY]);
}


//----------fn to call when the snake hits an invalid spot----------------------
function gameOver() {
  location.reload();
}


//----------fn to init and and begin looping the game---------------------------
function game() {
  getDirection(snake);
  snake.init(square);

  setInterval(function() {
    snake.move(square, newFood);
    snake.lookForFood(square, newFood);
    snake.getScore();
    $('#score-span').text(snake.score);
    // debugger;
  }, frameRate)
}




game();






//------------------------------------------------------------------------------
//----------OBJECTIVES----------------------------------------------------------
//------------------------------------------------------------------------------
// 2. option to swap black and white (looks nice both ways)
// 3. make it so you can't suicide the snake by arrowing too quick
// 4. make it pretty
// 5. make starting direction random
// 6. make starting food random
// 7. integrate hiscore
