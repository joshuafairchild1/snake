//------------------------------------------------------------------------------
//----------init globals--------------------------------------------------------
//------------------------------------------------------------------------------
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


//------------------------------------------------------------------------------
//----------draw 10x10 square at these coords-----------------------------------
//------------------------------------------------------------------------------
function drawSquare(x,y) {
  c.fillStyle = 'black';
  c.fillRect(x,y,10,10);
}

//------------------------------------------------------------------------------
//----------insert a food square------------------------------------------------
//------------------------------------------------------------------------------
function makeFood() {
  let randomSpot = Math.floor(Math.random()*(490-10+1)+10);
  let posX = Math.ceil((randomSpot+1) / 10) * 10;
  let posY = Math.ceil((randomSpot+1) / 10) * 10;
  // drawSquare(posX,posY);
  return [posX, posY];
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
  grow(newX,newY,direction)
}

function grow(fromX, fromY, direction) {
  let growAtX = fromX;
  let growAtY = fromY;
  if (direction === 'right') {
    growAtX = fromX - 10;
  } else if (direction === 'left') {
    growAtX = fromX + 10;
  } else if (direction === 'up') {
    growAtY = fromY + 10;
  } else if (direction === 'down') {
    growAtY = fromY - 10;
  }
  drawSquare(growAtX,growAtY)
}


//------------------------------------------------------------------------------
//----------start the game------------------------------------------------------
//------------------------------------------------------------------------------
function game() {

  let direction = 'right';
  let score = 0;
  let snake = [];
  let gameOver = false;
  let lastX = 240;
  let lastY = 240;
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
    console.log(direction);
  });

  //----------------------------------------------------------------------------
  //-----------loop every 0.4sec------------------------------------------------
  //----------------------------------------------------------------------------
  setInterval(function() {
    // canvas.addEventListener('mousedown', function() {
    //   grow(lastX,lastY,direction);
    // })
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
