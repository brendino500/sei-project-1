// TODO ***************************************************************************************
// TODO START BUTTON. 
// TODO   TIMER OF TETROMINOS.
// TODO 
// TODO SCORING SYSTEM
// TODO   FOLLOW ORIGINAL SCORE SYSTEM
// TODO   AS EACH TETROMINO FALLS TO EACH ROW ADD 10 POINTS
// TODO 
//       CLASSES  FOR EACH TETROMINOS
// TODO 
//       GENERATE RANDOM TETROMINOS
// TODO 
// TODO ROTATION OF TETROMINOS
// TODO 
//       NEED TO DO CHECKS IF DIV BELOW HAS A FIXED TETRIMINO IN PLACE   .CONTAINS()
//       POSSIBLY CHECK FOR DIV ON BOTTOM ROW?    .CONTAINS()
// TODO 
// TODO 
//       MAKING THE TETOMINOS FALL DOW IN A STRAIGHT LINE WITH TIMINGS
//         CAN ADD THE 10 POINTS PER LINE ONCE YOU FIGURE THIS OUT
// TODO 
// TODO DIFFERENT FUNCTIONS FOR DIFFERENT LEVELS?   RECURSION?
// TODO   EASIER CONTROL/CODE FOR POINTS AND SPEED OF DESCENDING TETROMINOS
// TODO 
// TODO FIGURE OUT 
//      HOW TO STOP TETROMINO FILLING IN A CLASS     .CONTAINS()
// TODO   STOP ROTATION AT BORDER    
// TODO 
// TODO FIX THE BUG WHICH HIGHLIGHTS A SQUARE AT CELL 0 AND CHANGES COLOUR. THERE IS A FLOATER
// TODO    SQUARE WHICH FOLLOWS THE TETROMINO. --> currentPosition 
// TODO 
// TODO DO A CHECK FOR TOP ROW. AT THE MOMENT THE TETROMINOS WILL JUST FALL ONTOP. NEVER ENDING LOOP.
// TODO    SAME AS BOTTOM ROW.     THIS WILL END THE GAME.     .CONTAINS()
// TODO
// TODO
// TODO
// TODO
// TODO
// TODO *****************************************************************************************


function init() {
  // * DOM ELEMENTS ****************************************************************************************************************************************

  const grid = document.querySelector('.grid')
  const cells = []     // <-- empty array for cells


  // * GRID VARIABLES ********************************************************************************************************************************************

  // ? 10 x 20  dimentions of grid

  const width = 10
  const height = 22
  const numberOfCells = width * height

  // * TETRIMINOS SHAPE  ****************************************************************************************************************************************
  // * 0 = start position.  1 = 90 deg clockwise.   2 = 180 deg.      3 = 270 deg.
  const iTetromino = {
    name: 'iTetromino',
    deg0: [4, 14, 24, 34],
    deg90: [4, 5, 6, 7],
    deg180: [4, 14, 24, 34],
    deg270: [4, 5, 6, 7]
  }

  const tTetromino = {
    name: 'tTetromino',
    deg0: [4, 13, 14, 15],
    deg90: [4, 14, 15, 24],
    deg180: [13, 14, 15, 24],
    deg270: [4, 13, 14, 24]
  }

  const sTetromino = {
    name: 'sTetromino',
    deg0: [4, 5, 13, 14],
    deg90: [4, 14, 15, 25],
    deg180: [4, 5, 13, 14],
    deg270: [4, 14, 15, 25]
  }

  const oTetromino = {
    name: 'oTetromino',
    deg0: [4, 5, 14, 15],
    deg90: [4, 5, 14, 15],
    deg180: [4, 5, 14, 15],
    deg270: [4, 5, 14, 15]
  }

  const zTetromino = {
    name: 'zTetromino',
    deg0: [3, 4, 14, 15],
    deg90: [4, 13, 14, 23],
    deg180: [3, 4, 14, 15],
    deg270: [4, 13, 14, 23]
  }

  const jTetromino = {
    name: 'jTetromino',
    deg0: [5, 15, 25, 24],
    deg90: [13, 14, 15, 25],
    deg180: [4, 5, 14, 24],
    deg270: [3, 13, 14, 15]
  }

  const lTetromino = {
    name: 'lTetromino',
    deg0: [4, 14, 24, 25],
    deg90: [13, 14, 15, 5],
    deg180: [3, 4, 14, 24],
    deg270: [13, 14, 15, 23]
  }


  // * GAME VARIABLES ****************************************************************************************************************************************

  let linesCleared = 0
  let multipleLines = 0   // <-- multiplier for lines cleared
  let currentLevel = 0
  let highScore = 0      // <-- number needs to be saved somewhere?! lol     if else to update highscore
  let playerScore = 0
  const tetrominosArray = [iTetromino, tTetromino, sTetromino, oTetromino, zTetromino, jTetromino, lTetromino]     // <-- different tetrominos
  let currentPosition = null  // <-- Starting position for the top of the grid. Needs to descend. 
  // let dropSpeed = 1000
  let currentTetromino = null
  let timerId = null



  // * FUNCTIONS  ****************************************************************************************************************************************
  // * FUNCTION NAMES SO FAR AND DESCRIPTION OF WHAT THEY DO

  // createGrid() - Creates tetris grid
  // displayTetromino() - gets tetromino on grid
  // removeTetromino() - removes tetromino
  // descendTetromino() - tetromino moves down the grid   STARTS GAME
  // getRandomTetromino() - gets random tetromino
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
  // startTimer() - timer for function and speed. 
  // gameEnd()



  // CREATE GRID **************************************************************************************************************************
  function createGrid() {  // <-- creating cells
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i        // *    <-- label the cells
      grid.appendChild(cell)
    }
  }

  createGrid()

  //  GAME FUNCTIONS    *************************************************************************************************************

  // GENERATE RANDOM TETRIMINO *************************************************************************************
  function getRandomTetromino() {
    currentTetromino = tetrominosArray[Math.floor(Math.random() * tetrominosArray.length)]
  }
  

  // SHOW TETROMINO   ****************************************************************************************************************
  // * THIS FUNCTION DEFINITELY WORKS
  function displayTetromino() {
    currentTetromino.deg0.forEach(value => {
      console.log(value + currentPosition)
      cells[value + currentPosition].classList.add(currentTetromino.name)
    })
  }

  // REMOVE TETROMINO   ***************************************************************************************************************
  // !! BUG - WHEN TETROMINO MOVES, THE PREVIOUS CELLS OF WHERE IT WAS BEFORE IS NOT REMOVED.
  function removeTetromino() {
    currentTetromino.deg0.forEach(value => {
      cells[value + currentPosition].classList.remove(currentTetromino.name)   
    })
  }
  getRandomTetromino()
  displayTetromino()


  // CHECKS FOR TETROMINO   ****************************************************************************************************
  // TODO FINISH CHECKS FOR LEFT AND RIGHT. CURRENTLY THE TETROMINO DOES NOT HAVE A BOARDER
  function checkBottomRow() {
    let isBottomRow = false
    currentTetromino.deg0.forEach(value => {
      if (value + width + currentPosition > cells.length - 1) {
        isBottomRow = true
      }
    })
    return isBottomRow
  }

  function checkObstacle() {
    let isObstacle = false
    currentTetromino.deg0.forEach(value => {
      if (cells[value + width + currentPosition].classList.contains('fixed-tetromino')) {
        isObstacle = true
      }
    })
    return isObstacle
  }

  function checkTopRow() {
    let isTopRow = false
    currentTetromino.deg0.forEach(value => {
      if (value + currentPosition > 0 ) {
        isTopRow = true
      }
    })
    return isTopRow
  }

  function checkRight() {
    if (currentTetromino.deg0.some(value => ((value + 1) % 10 === 0))) {
      return false
    } else 
      return true
  }

  //! ACTUALLY PREVENTING TETROMINO FROM MOVING LEFT.
  //! COLOURED SQUARE APPEARS ON 10's ROW
  function checkLeft() {
    if (currentTetromino.deg0.some(value => (value % 10 === 0))) {
      return false
    } else 
      return true
  }

  function startTimer() {
    timerId = setInterval(descendTetromino, 1000)
  }


  function descendTetromino() {
    if (checkBottomRow() || checkObstacle() && checkTopRow()) {
      currentTetromino.deg0.forEach(value => {
        cells[value + currentPosition].classList.add('fixed-tetromino')
      })
      clearInterval(timerId)                      
      currentPosition = 0
      getRandomTetromino()
      displayTetromino()
      startTimer()
    } else {
      removeTetromino()
      currentPosition += width
      playerScore += 10
      console.log(playerScore)
      displayTetromino()
    }
  }

  startTimer()

  // GAME ENDS FUNCTION. LINKS UP WITH checkTopRow(). IF THAT IS FULFILLED THEN THE SHAPES NEED TO STOP.
  // POSSIBLY A WINDOW ALERT TO TELL PLAYER SCORE?
  //! THIS DOES NOT WORK
  // function gameEnd() {
  //   if (checkTopRow()) {
  //     timerId = clearTimeout()
  //   }
  // }



  // LINK UP ARROW KEYS FOR FUNCTIONALITY   ******************************************************************************************* 
  // For now link up UP, DOWN, LEFT, RIGHT, SPACE (for fast down), ENTER (to play)
  // ARROW DOWN - 40
  // ARROW RIGHT - 39
  // ARROWN LEFT - 37
  // ENTER KEY - 13
  // SPACE KEY - 32


  // * MANIPULATE THIS FUNCTION SO THAT EACH KEY HAS IT'S OWN FUNCTION
  // * SOME() METHOD TESTS WHETER AT LEAST ONE ELEMENT IN THE ARRAY PASSES THE TEST. RETURNS BOOLEAN

  function moveLeft() {  //! <-- move left. If there is a wall, stop it somehow?  KEYCODE 37    NEEDS TO DO LEFT AND RIGHT CHECK
    if (checkLeft()) {
      removeTetromino()        
      currentPosition--
      displayTetromino()
    }
  }

  function moveRight() {
    if (checkRight()) {
      removeTetromino()
      currentPosition++
      displayTetromino()
    }
  }

  // function moveDown() {
  //   if (y < width - 1) {
  //     tetrominoPosition += width
  //   }
  // }

  // function enterKey() {
  //*   STARTS GAME
  //*   WITH THE ENTER KEY IT WILL ENVOKE descendTetromino()
  // }

  // function spacebar() {
  //*  FAST DOWN
  //*   NEEDS TO CHECK IF DIVS WITH 'FIXEDTETROMINO' IN ADVANCED AND THEN PLACE SHAPE ON ROW ABOVE.
  // }


  // KEYS E FUNCTION ****************************************************************************************************************************************
  //! CURRENTLY THE SQUARE HAS A BOUNDRY BUT NOT THE SHAPE.
  function handleKeysUp(e) {
    cells[currentPosition].classList.remove(currentTetromino.name)   // <-- removes tetromino from previous position
    const x = currentPosition % width
    const y = Math.floor(currentPosition / width)
    switch (e.keyCode) {
      case 37:
        moveLeft()
        break
      case 39:
        moveRight()
        break
      case 40:
        if (y < width - 1) {
          currentPosition += width
        }
        break
      default:
        break  
    }
    cells[currentPosition].classList.add(currentTetromino.name)  // <-- adds tetromino to new position
  }

    

  // * EVENT LISTENER  ****************************************************************************************************************************************
  document.addEventListener('keyup', handleKeysUp)




  // * SCORING LOGIC ****************************************************************************************************************************************

  // ?? Level 0-1   1 line = 100  2 lines = 400   3 lines = 900   4 lines = 2000    10 cleared lines
  // ?? Level 2-3   1 line = 200  2 lines = 800   3 lines = 1800  4 lines = 4000    20 cleared lines
  // ?? Level 4-5   1 line = 300  2 lines = 1200  3 lines = 2700  4 lines = 6000    30 cleared lines
  // ?? Level 6-7   1 line = 400  2 lines = 1600  3 lines = 3600  4 lines = 8000    40 cleared lines
  // ?? Level 8+    1 line = 500  2 lines = 2000  3 lines = 4500  4 lines = 10000   50 cleared lines
  // ?? Clear 5 lines to get onto next level


  // CHANGING LEVELS   ***********************************************************************************************************************************
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


  // CHANGE OF SPEED FOR EACH LEVEL **********************************************************************************************************************************
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


  // ROLLING NUMBER OF LINES CLEARED   ***********************************************************************************************************************************


  // POINT SCORING    **********************************************************************************************************************************************
  // !! THIS NEEDS NEATENING UP. LOOK OVER THE CODE AND WORK OUT A MORE SIMPLE VERSION 
  function rowPoints() {
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
  }


  // STORING HIGH SCORE   **********************************************************************************************************************************************
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