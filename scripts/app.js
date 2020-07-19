// TODO *****************************************************
// TODO START BUTTON. 
// TODO   TIMER OF TETROMINOS.
// TODO 
// TODO SCORING SYSTEM
// TODO   FOLLOW ORIGINAL SCORE SYSTEM
// TODO   AS EACH TETROMINO FALLS TO EACH ROW ADD 10 POINTS
// TODO 
// TODO CLASSES  FOR EACH TETROMINOS
// TODO 
// TODO GENERATE RANDOM TETROMINOS
// TODO 
// TODO ROTATION OF TETROMINOS
// TODO 
// TODO NEED TO DO CHECKS IF DIV BELOW HAS A FIXED TETRIMINO IN PLACE
// TODO 
// TODO MAKING THE TETOMINOS FALL DOW IN A STRAIGHT LINE WITH TIMINGS
// TODO   CAN ADD THE 10 POINTS PER LINE ONCE YOU FIGURE THIS OUT
// TODO 
// TODO DIFFERENT FUNCTIONS FOR DIFFERENT LEVELS?   RECURSION?
// TODO   EASIER CONTROL/CODE FOR POINTSAND SPEED OF DESCENDING TETROMINOS
// TODO 
// TODO FIGURE OUT 
// TODO   HOW TO STOP TETROMINO FILLING IN A CLASS
// TODO   STOP ROTATION AT BORDER
// TODO 
// TODO 
// TODO 



function init() {
  // * DOM ELEMENTS

  const grid = document.querySelector('.grid')
  const cells = []     // <-- empty array for cells


  // * GRID VARIABLES

  // ? 10 x 20  dimentions of grid

  const width = 10
  const height = 20
  const numberOfCells = width * height

  // * TETRIMINOS SHAPE
  // * 0 = start position.  1 = 90 deg clockwise.   2 = 180 deg.      3 = 270 deg.
  const iTetromino = [
    [4, 14, 24, 34],
    [4, 5, 6, 7]
  ]

  const tTetromino = [
    [4, 13, 14, 15],
    [4, 14, 15, 24],
    [13, 14, 15, 24],
    [4, 13, 14, 24]
  ]

  const sTetromino = [
    [4, 5, 13, 14],
    [4, 14, 15, 25]
  ]

  const oTetromino = [
    [4, 5, 14, 15]
  ]

  const zTetromino = [
    [3, 4, 14, 15],
    [4, 13, 14, 23]
  ]

  const jTetromino = [
    [5, 15, 25, 24],
    [13, 14, 15, 25],
    [4, 5, 14, 24],
    [3, 13, 14, 15]
  ]

  
  const lTetromino = [
    [4, 14, 24, 25],
    [13, 14, 15, 5],
    [3, 4, 14, 24],
    [13, 14, 15, 23]
  ]


  // * GAME VARIABLES

  let linesCleared = 0
  let multipleLines = 0   // <-- multiplier for lines cleared
  let currentLevel = 0
  let highScore = 0      // <-- number needs to be saved somewhere?! lol     if else to update highscore
  let playerScore = 0
  const tetrominosArray = [iTetromino, tTetromino, sTetromino, oTetromino, zTetromino, jTetromino, lTetromino]     // <-- different tetrominos
  let currentTetrominoClass = getRandomClassTetromino()
  // const startingPosition = 5    // <-- Starting position for the top of the grid. Needs to descend. 
  let dropSpeed = 1000
  let currentTetromino = getRandomTetromino()
  let tetrominoPosition = 4



  // * FUNCTIONS
  // * FUNCTION NAMES SO FAR AND DESCRIPTION OF WHAT THEY DO

  // createGrid() - Creates tetris grid
  // displayTetromino() - Checks if tetromino arrays are working
  // getRandomTetromino() - gets random tetromino
  // getRandomClassTetromino() - gets random tetromino colour
  // startGame() - starts the game
  // moveLeft() - 
  // moveRight() - 
  // moveDown() - slow down
  // moveUp() - rotate tetromino clockwise 90 deg
  // spacebar() - fast down 
  // enterBtn() - starts game from keyboard - player input 
  // handleKeyUp() - specifies player keyboard events
  // updateHighScore() - updates high score when PLAYER LOSES
  // changeLevel() - checks if level needs to change
  // changeSpeed() - checks if speed needs to increase




  function createGrid() {  // <-- creating cells
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i        // <-- label the cells
      grid.appendChild(cell)
    }
  }

  createGrid()


  // SHOW TETROMINO   ********************************************
  function displayTetromino() {
    currentTetromino = getRandomTetromino()
    currentTetromino[0].forEach(value => {
      cells[value].classList.add('fixedTetromino')
    })
  }
      
  displayTetromino()

  // GENERATE RANDOM TETRIMINO ***************************************************
  function getRandomTetromino() {
    return tetrominosArray[Math.floor(Math.random() * tetrominosArray.length)]
  }

  getRandomTetromino()
  console.log(currentTetromino)


  //GENERATE RANDOM TETROMINOS    *********************************************************
  function getRandomClassTetromino() {
    const tetrominos = ['iTetromino', 'tTetromino', 'sTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'lTetromino'] 
    return tetrominos[Math.floor(Math.random() * tetrominos.length)]
  }
  // currentTetrominoClass = getRandomClassTetromino()
  // console.log(currentTetrominoClass)



  // GAME TIMINGS    *********************************************************
  // CURRENTLY TETROMINOS APPEAR AT RANDOM.  MAKE THEM FALL ONE CELL AT A TIME
  function startGame() {
    const timerId = setInterval(() => {

      cells[tetrominoPosition].classList.remove(currentTetrominoClass)
      tetrominoPosition += 10
      cells[tetrominoPosition].classList.add(currentTetrominoClass)
      if (tetrominoPosition >= numberOfCells || tetrominoPosition > (numberOfCells - width - 1)) {
        clearInterval(timerId)
        cells[tetrominoPosition].classList.add('fixedTetromino')  // ? FIXES IT TO THE BOTTOM (FOR NOW)
        tetrominoPosition = 4 
        startGame()
        currentTetrominoClass = getRandomClassTetromino()
      }
    }, 300)
  }
  startGame()


  // *  RANDOMBLY SELECT ONE TETRIMINO
  // *  MAKE TETRIMINO FALL FROM START POSITION UNTIL LAST ROW  CELL NO. 190-199
  // *  STARTING SPEED INTERVAL AT 1000  
  // *
  // *  ADD 10 POINTS EVERYTIME THE TETRIMINO FALLS INTO NEXT ROW
  // *  
  // *  MAKE TETRIMINO IN FIXED POSITION ON LAST ROW
  // * 



  // LINK UP ARROW KEYS FOR FUNCTIONALITY   ********************************************************* 
  // For now link up UP, DOWN, LEFT, RIGHT, SPACE (for fast down), ENTER (to play)
  // ARROW DOWN - 40
  // ARROW RIGHT - 39
  // ARROWN LEFT - 37
  // ENTER KEY - 13
  // SPACE KEY - 32


  // * MANIPULATE THIS FUNCTION SO THAT EACH KEY HAS IT'S OWN FUNCTION

  // const x = tetrominoPosition % width
  // const y = Math.floor(tetrominoPosition / width)
  // function moveLeft() {
  //   if (x > 0) {
  //     tetrominoPosition--
  //   }
  // }

  // function moveRight() {
  //   if (x < width - 1) {
  //     tetrominoPosition++
  //   }
  // }

  // function moveDown() {
  //   if (y < width - 1) {
  //     tetrominoPosition += width
  //   }
  // }

  // function enterBtn() {
  //   //* STARTS GAME
  // }

  // function spacebar() {
  //   //* FAST DOWN
  // }



  function handleKeysUp(e) {
    cells[tetrominoPosition].classList.remove(currentTetrominoClass)   // <-- removes tetromino from previous position
    const x = tetrominoPosition % width
    const y = Math.floor(tetrominoPosition / width)
    switch (e.keyCode) {
      case 37:
        if (x > 0) {
          tetrominoPosition--
        }
        break
      case 39:
        if (x < width - 1) {
          tetrominoPosition++
        }
        break
      case 40:
        if (y < width - 1) {
          tetrominoPosition += width
        }
        break
      default:
        break  
    }
    cells[tetrominoPosition].classList.add(currentTetrominoClass)  // <-- adds tetromino to new position
  }

    

  // * EVENT LISTENER
  document.addEventListener('keyup', handleKeysUp)




  // * SCORING LOGIC

  // ?? Level 0-1   1 line = 100  2 lines = 400   3 lines = 900   4 lines = 2000    10 cleared lines
  // ?? Level 2-3   1 line = 200  2 lines = 800   3 lines = 1800  4 lines = 4000    20 cleared lines
  // ?? Level 4-5   1 line = 300  2 lines = 1200  3 lines = 2700  4 lines = 6000    30 cleared lines
  // ?? Level 6-7   1 line = 400  2 lines = 1600  3 lines = 3600  4 lines = 8000    40 cleared lines
  // ?? Level 8+    1 line = 500  2 lines = 2000  3 lines = 4500  4 lines = 10000   50 cleared lines
  // ?? Clear 5 lines to get onto next level


  // CHANGING LEVELS   ***************************************************************
  function changeLevel() {
    if (linesCleared <= 10) {
      currentLevel++
    } else if (linesCleared <= 20) {
      currentLevel++
    } else if (linesCleared <= 30) {
      currentLevel++
    } else if (linesCleared <= 40) {
      currentLevel++
    } else {
      currentLevel++
    }
  }


  // CHANGE OF SPEED FOR EACH LEVEL **************************************************************
  // MAKE INTO FUNCTION 
  function changeSpeed() {
    if (currentLevel <= 1) {
      dropSpeed = 1000
    } else if (currentLevel === 2) {
      dropSpeed = 900
    } else if (currentLevel === 3) {
      dropSpeed = 800
    } else if (currentLevel === 4) {
      dropSpeed = 700
    } else if (currentLevel === 5) {
      dropSpeed = 600
    } else if (currentLevel === 6) {
      dropSpeed = 500
    } else if (currentLevel === 7) {
      dropSpeed = 400
    } else {
      dropSpeed = 300
    }
  }


  // ROLLING NUMBER OF LINES CLEARED   ***************************************************************


  // POINT SCORING    ****************************************
  // !! THIS NEEDS NEATENING UP. LOOK OVER THE CODE AND WORK OUT A MORE SIMPLE VERSION 
  if (currentLevel <= 1) {
    if (multipleLines === 1) {
      playerScore += 100
    } else if (multipleLines === 2) {
      playerScore += 200
    } else if (multipleLines === 3) {
      playerScore += 300
    } else {
      playerScore += 400
    }
  } else if (currentLevel > 1 || currentLevel <= 3) {
    if (multipleLines === 1) {
      playerScore += 200
    } else if (multipleLines === 2) {
      playerScore += 800
    } else if (multipleLines === 3) {
      playerScore += 1800
    } else {
      playerScore += 4000
    }
  } else if (currentLevel > 3 || currentLevel <= 5) {
    if (multipleLines === 1) {
      playerScore += 300
    } else if (multipleLines === 2) {
      playerScore += 1200
    } else if (multipleLines === 3) {
      playerScore += 2700
    } else {
      playerScore += 6000
    }
  } else if (currentLevel > 5 || currentLevel <= 7) {
    if (multipleLines === 1) {
      playerScore += 400
    } else if (multipleLines === 2) {
      playerScore += 1600
    } else if (multipleLines === 3) {
      playerScore += 3600
    } else {
      playerScore += 8000
    }
  } else {
    if (multipleLines === 1) {
      playerScore += 500
    } else if (multipleLines === 2) {
      playerScore += 2000
    } else if (multipleLines === 3) {
      playerScore += 4500
    } else {
      playerScore += 10000
    }
  }



  // STORING HIGH SCORE   ****************************************
  function updateHighScore() {
    if (playerScore > highScore) {
      highScore = playerScore
    } 
  }
}



window.addEventListener('DOMContentLoaded', init)




// // !! RECURSION 

// function countDownFrom(num) {
//   console.log(num)
//   if (num === 0) {
//     return 
//   }
//   countDownFrom(num - 1)
// }

// countDownFrom(10)