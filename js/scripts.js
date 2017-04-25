const canvas = document.getElementById('snake-area');
const c = canvas.getContext('2d');
const h = canvas.height;
const w = canvas.width;
const frameRate = 55;
const directions = ['right','up','down'];
const snake = new Snake(directions);
const square = new Square(c);
const opposites = {
                    right : 'left',
                    down : 'up',
                    left : 'right',
                    up : 'down'
                  };
const keys ={
              37 : 'left',
              38 : 'up',
              39 : 'right',
              40 : 'down'
            };

let newFood = getRandomSpot();
let dir;


                      /*-------------------------------
                   --------Snake object and protos--------
                      -------------------------------*/

function Snake(directions) {
  this.direction = directions[randInt(0,2)];
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
Snake.prototype.grow = function(sq) {
  let bod = this.body;
  let prevLastSquare = bod[bod.length - 2];
  let lastSquare = bod[bod.length - 1];
  let newSquare;
  dir = this.direction;

  //make new square to the left
  if (lastSquare[1] === prevLastSquare[1] && lastSquare[0] > prevLastSquare[0]) {
    newSquare = [lastSquare[0] - 10, lastSquare[1]];

  //make new square to the right
  } else if (lastSquare[1] === prevLastSquare[1] && lastSquare[0] < prevLastSquare[0]) {
    newSquare = [lastSquare[0] + 10, lastSquare[1]];

  //make new square going down
  } else if (lastSquare[0] === prevLastSquare[0] && lastSquare[1] > prevLastSquare[1]) {
    newSquare = [lastSquare[0], lastSquare[1] + 10];

  //make new square going up
  } else if (lastSquare[0] === prevLastSquare[0] && lastSquare[1] < prevLastSquare[1]) {
    newSquare = [lastSquare[0], lastSquare[1] - 10];
  }

  this.body.push(newSquare);
  for(let i = 0; i < this.body.length; i++) {
    sq.draw(this.body[i][0],this.body[i][1]);
  }
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

  //check for contact with wall
  if (nextSpot[0] <= -10 || nextSpot[0] >= 500 || nextSpot[1] <= -10 || nextSpot[1] >= 500) {
    gameOver(this);
  }
  //check for contact with self
  for (let i = 0; i < this.body.length; i++) {
    if (nextSpot[0] === this.body[i][0] && nextSpot[1] === this.body[i][1]) {
      gameOver(this);
    }
  }

  //move all of the Snake.body arrays (squares) forward by one space
  for (let i = this.body.length - 1; i > 0; i--) {
    this.body[i] = this.body[(i-1)];
  }
  this.body[0] = nextSpot;

  //draw the new snake and the current food
  c.clearRect(0,0,h,w);
  sq.drawBlu(food[0],food[1]);
  for (let i = 0; i < this.body.length; i++) {
    sq.draw(this.body[i][0],this.body[i][1]);
  }
}


//----------recognize & handle the snake eating food----------------------------
Snake.prototype.lookForFood = function(sq, food) {
  let head = [this.body[0][0],this.body[0][1]];
  if (head[0] === food[0] && head[1] === food[1]) {
    this.grow(sq);
    newFood = spawnFood(sq);

    //keep food from spawning atop a snake square
    for (let i = 0; i < this.body.length; i++) {
      if (newFood[0] === this.body[i][0] && newFood[1] === this.body[i][1]) {
        newFood = spawnFood(sq);
      }
    }
  }
}


//----------update the score property of the snake------------------------------
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


//---------draw a Square--------------------------------------------------------
Square.prototype.draw = function(x,y) {
  this.context.lineWidth = 2;
  this.context.fillStyle = 'black';
  this.context.strokeStyle = "white";
  this.context.fillRect(x,y,10,10);
  this.context.strokeRect(x, y, 10, 10);
}


//---------draw a blue square---------------------------------------------------
Square.prototype.drawBlu = function(x,y) {
  this.context.lineWidth = 2;
  this.context.fillStyle = 'blue';
  this.context.strokeStyle = "white";
  this.context.fillRect(x,y,10,10);
  this.context.strokeRect(x, y, 10, 10);
}



                      /*-------------------------
                    -------Named functions-------
                      -------------------------*/

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
  let randomSpot = getRandomSpot();
  sq.draw(randomSpot[0],randomSpot[1]);
  return randomSpot;
}


//----------fn to call when the snake hits an invalid spot----------------------
function gameOver(snake) {
  if (localStorage.hiscore === undefined) {
    localStorage.hiscore = 0;
  }
  if (parseInt(snake.score) > parseInt(localStorage.hiscore)) {
    localStorage.hiscore = snake.score;
  }
  location.reload();
}


//----------return a random valid coordinate space------------------------------
function getRandomSpot() {
  let rand1 = Math.floor(Math.random()*(485-0+1)+0);
  let rand2 = Math.floor(Math.random()*(485-0+1)+0);
  let posX = Math.ceil((rand1+1) / 10) * 10;
  let posY = Math.ceil((rand2+1) / 10) * 10;
  return [posX,posY];
}


//----------return random int from min to max (including min and max)-----------
function randInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}


//----------fn to init and and begin looping the game---------------------------
function game() {
  getDirection(snake);
  snake.init(square);
  $('#hiscore-span').text(localStorage.hiscore);

  setInterval(() => {
    snake.move(square, newFood);
    snake.lookForFood(square, newFood);
    snake.getScore();
    $('#score-span').text(snake.score);
  }, frameRate)
}




//--------------------------START NEW GAME--------------------------------------

/*--------------------*/       game();       /*-------------------------------*/

//------------------------------------------------------------------------------
