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

  const iTetromino = 0
  const tTetromino = 0
  const sTetromino = 0
  const oTetromino = 0
  const zTetromino = 0
  const jTetromino = 0
  const lTetromino = 0

  // * GAME VARIABLES

  let linesCleared = 0
  let multipleLines = 0   // <-- multiplier for lines cleared
  let currentLevel = 0
  let highScore = 0      // <-- number needs to be saved somewhere?! lol     if else to update highscore
  let playerScore = 0
  // const tetrominos = ['iTetromino', 'tTetromino', 'sTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'lTetromino']     // <-- different tetrominos
  let tetrominoPosition = 0
  let currentTetrominoClass = getRandomClassTetromino()
  let timerId = null
  let timeRemaining = 10
  let totalCount = 0
  const startingPosition = 5    // <-- Starting position for the top of the grid. Needs to descend. 



  // * FUNCTIONS

  function createGrid() {  // <-- creating cells
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i        // <-- label the cells
      grid.appendChild(cell)
    }
  }

  createGrid()

  //GENERATE RANDOM TETROMINOS    *********************************************************
  function getRandomClassTetromino() {
    const tetrominos = ['iTetromino', 'tTetromino', 'sTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'lTetromino'] 
    return tetrominos[Math.floor(Math.random() * tetrominos.length)]
  }
  currentTetrominoClass = getRandomClassTetromino()
  console.log(currentTetrominoClass)



  // GAME TIMINGS    *********************************************************
  // CURRENTLY TETROMINOS APPEAR AT RANDOM.  MAKE THEM FALL ONE CELL AT A TIME
  function startGame() {
    const timerId = setInterval(() => {
      cells[tetrominoPosition].classList.remove(currentTetrominoClass)
      if (totalCount > 9) {
        clearInterval(timerId)
        return
      }
      cells[tetrominoPosition].classList.remove(currentTetrominoClass)
      tetrominoPosition = Math.floor(Math.random() * numberOfCells)
      totalCount++
      currentTetrominoClass = getRandomClassTetromino()
      cells[tetrominoPosition].classList.add(currentTetrominoClass)
    }, 1000)
  }
  startGame()






  // LINK UP ARROW KEYS FOR FUNCTIONALITY   ********************************************************* 
  // For now link up UP, DOWN, LEFT, RIGHT, SPACE (for fast down), ENTER (to play)
  // ARROW DOWN - 40
  // ARROW RIGHT - 39
  // ARROWN LEFT - 37
  // ENTER KEY - 13
  // SPACE KEY - 32

  function handleKeysUp(e) {
    cells[tetrominoPosition].classList.remove(currentTetrominoClass)   // <-- removes tetromino from previous position
    const x = tetrominoPosition % width
    const y = Math.floor(tetrominoPosition / width)
    switch (e.keyCode) {
      case 39:
        if (x < width - 1) {
          tetrominoPosition++
        }
        break
      case 37:
        if (x > 0) {
          tetrominoPosition--
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
  if (playerScore > highScore) {
    highScore = playerScore
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