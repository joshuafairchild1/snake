//------------------------------------------------------------------------------
//----------init globals--------------------------------------------------------
//------------------------------------------------------------------------------
const canvas = document.getElementById('snake-area');
const c = canvas.getContext('2d');
const h = canvas.height;
const w = canvas.width;
const frameRate = 100;
const keys = {
            37 : 'left',
            38 : 'up',
            39 : 'right',
            40 : 'down'
            };


//------------------------------------------------------------------------------
//----------draw 10x10 square at these coords-----------------------------------
//------------------------------------------------------------------------------
function drawSquare(x,y) {
  c.fillStyle = 'black';
  c.fillRect(x,y,10,10);
}


//------------------------------------------------------------------------------
//----------move snake one unit-------------------------------------------------
//------------------------------------------------------------------------------
function moveSnake(direction, oldX, oldY, foodPos) {
  let newX = oldX;
  let newY = oldY;
  c.clearRect(0,0,h,w);
  if (direction === 'right') {
    newX = oldX + 10;
  } else if (direction === 'left') {
    newX = oldX - 10;
  } else if (direction === 'up') {
    newY = oldY - 10;
  } else if (direction === 'down') {
    newY = oldY + 10;
  }
  drawSquare(newX, newY);
  drawSquare(foodPos[0],foodPos[1]);
}


//------------------------------------------------------------------------------
//----------insert a food square------------------------------------------------
//------------------------------------------------------------------------------
var makeFood = function() {
  let randomSpot = Math.floor(Math.random()*(490-10+1)+10);
  let posX = Math.ceil((randomSpot+1) / 10) * 10;
  let posY = Math.ceil((randomSpot+1) / 10) * 10;
  // drawSquare(posX,posY);
  return [posX, posY];
}

//------------------------------------------------------------------------------
//----------start the game------------------------------------------------------
//------------------------------------------------------------------------------
function game() {

  let direction = 'right';
  let score = 0;
  let snake = [];
  let gameOver = false;
  let lastX = 10;
  let lastY = 10;
  let foodCoords = makeFood();

  //----------------------------------------------------------------------------
  //----------listen for keydown------------------------------------------------
  //----------------------------------------------------------------------------
  window.addEventListener('keydown', function(e) {
    let clickedKey = e.keyCode;
    let isArrowKey = Object.keys(keys).includes(String(clickedKey));

    if (isArrowKey) {
      let keyDirection = keys[String(clickedKey)];
      direction = keyDirection;
      e.preventDefault();
    }
  });


  //----------------------------------------------------------------------------
  //-----------loop every 0.4sec------------------------------------------------
  //----------------------------------------------------------------------------
  setInterval(function() {
    moveSnake(direction, lastX, lastY, foodCoords);
    if (direction === 'right') {
      lastX += 10;
    } else if (direction === 'left') {
      lastX -= 10;
    } else if (direction === 'up') {
      lastY -= 10;
    } else if (direction === 'down') {
      lastY += 10;
    }
  }, frameRate)

}



//------------------------------------------------------------------------------
//----------user interface logic------------------------------------------------
//------------------------------------------------------------------------------
$(function() {
  game();
});
