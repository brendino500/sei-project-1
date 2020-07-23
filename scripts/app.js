// TODO ***************************************************************************************
//       START BUTTON. 
// TODO   TIMER OF TETROMINOS.
// TODO 
// TODO SCORING SYSTEM
// TODO  IMPLEMENT SCORE SYSTEM. ADD IN CORRECT PLACES
//       FOLLOW ORIGINAL SCORE SYSTEM
//        AS EACH TETROMINO FALLS TO EACH ROW ADD 10 POINTS
// TODO 
//       CLASSES  FOR EACH TETROMINOS
// TODO 
//       GENERATE RANDOM TETROMINOS
// TODO 
//       ROTATION OF TETROMINOS
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
//      HOW TO STOP TETROMINO FILLING IN A CLASS     .CONTAINS()
//         STOP ROTATION AT BORDER    
// TODO 
//      FIX THE BUG WHICH HIGHLIGHTS A SQUARE AT CELL 0 AND CHANGES COLOUR. THERE IS A FLOATER
//        SQUARE WHICH FOLLOWS THE TETROMINO. --> currentPosition 
// TODO 
// TODO DO A CHECK FOR TOP ROW. AT THE MOMENT THE TETROMINOS WILL JUST FALL ONTOP. NEVER ENDING LOOP.
// TODO          THIS WILL END THE GAME.     .CONTAINS()
// TODO
//     CHECK IF BOTTOM ROW IS FULL - CHECK IF WHOLE ROW HAS 'fixed-tetromino'.    .every() 
//       REMOVE ROW AND ADD A WHOLE NEW ROW AT THE TOP?
//                 OR
//       REMOVE 'fixed-tetromino' DIVS AND ALL DIVS ABOVE TO + width
// TODO 
// TODO  HOW TO DO A FAST DOWN. CHECK IF LOWER TETROMINOS HAVE A 'fixed-tetromino' AND DROP TO ROW ABOVE.
// TODO 
// TODO 
// TODO *****************************************************************************************


function init() {
  // * DOM ELEMENTS ****************************************************************************************************************************************

  const grid = document.querySelector('.grid')
  const cells = []
  const audio = document.querySelector('#audio')


  // * GRID VARIABLES ***********************************************************************************************************************************

  // ? 10 x 20  dimentions of grid

  const width = 10
  const height = 22
  const numberOfCells = width * height

  // * TETRIMINOS SHAPE  ****************************************************************************************************************************************
  const iTetromino = {
    name: 'iTetromino', 
    deg0: [0, 1, 2, 3],
    deg90: [2, 12, 22, 32],
    deg180: [20, 21, 22, 23],
    deg270: [1, 11, 21, 31]
  }

  const tTetromino = {
    name: 'tTetromino',
    deg0: [1, 10, 11, 12],
    deg90: [1, 11, 12, 21],
    deg180: [10, 11, 12, 21],
    deg270: [1, 10, 11, 21]
  }

  const sTetromino = {
    name: 'sTetromino',
    deg0: [1, 2, 10, 11],
    deg90: [1, 11, 12, 22],
    deg180: [1, 2, 10, 11],
    deg270: [1, 11, 12, 22]
  }

  const oTetromino = {
    name: 'oTetromino',
    deg0: [1, 2, 11, 12],
    deg90: [1, 2, 11, 12],
    deg180: [1, 2, 11, 12],
    deg270: [1, 2, 11, 12]
  }

  const zTetromino = {
    name: 'zTetromino',
    deg0: [0, 1, 11, 12],
    deg90: [2, 11, 12, 21],
    deg180: [0, 1, 11, 12],
    deg270: [2, 11, 12, 21]
  }

  const jTetromino = { 
    name: 'jTetromino',
    deg0: [0, 10, 11, 12],
    deg90: [1, 2, 11, 21],
    deg180: [10, 11, 12, 22],
    deg270: [1, 11, 21, 20]
  }

  const lTetromino = {      
    name: 'lTetromino',
    deg0: [2, 10, 11, 12],
    deg90: [1, 11, 21, 22],
    deg180: [10, 11, 12, 20],
    deg270: [0, 1, 11, 21]
  }


  // * GAME VARIABLES ****************************************************************************************************************************************

  let linesCleared = 0
  let multipleLines = 0   // <-- multiplier for lines cleared
  let currentLevel = 0
  let highScore = 0      // <-- number needs to be saved somewhere?! lol     if else to update highscore
  let playerScore = 0
  const tetrominosArray = [iTetromino, tTetromino, sTetromino, oTetromino, zTetromino, jTetromino, lTetromino]     // <-- different tetrominos
  let currentPosition = 3  // <-- Starting position for the top of the grid. Needs to descend. 
  let currentRotation = 'deg0'
  let dropSpeed = 800
  let currentTetromino = null
  let timerId = null




  // * FUNCTIONS  ****************************************************************************************************************************************
  // * FUNCTION NAMES SO FAR AND DESCRIPTION OF WHAT THEY DO

  // createGrid() - Creates tetris grid
  // displayTetromino() - gets tetromino on grid
  // removeTetromino() - removes tetromino
  // descendTetromino() - tetromino moves down the grid   STARTS GAME
  // getRandomTetromino() - gets random tetromino
  // checkBottomRow() - check for bottom row
  // checkObstacle() - check if next row has class 'fixed'
  // checkRight() - check if tetromino can move right
  // checkLeft() - check if tetromino can move left
  // isRowFull() - 
  // clearRow() -
  // shiftGridDown() - moves the remaining tetrominos down the grid
  // moveLeft() - 
  // moveRight() - 
  // moveDown() - slow down
  // fastDown() - appears right at bottom of grid where it will fit
  // rotate() - rotate tetromino clockwise 90 deg
  // spacebar() - fast down 
  // enterBtn() - starts game from keyboard - player input 
  // handleKeyUp() - specifies player keyboard events
  // updateHighScore() - updates high score when PLAYER LOSES
  // changeLevel() - checks if level needs to change
  // changeSpeed() - checks if speed needs to increase
  // startTimer() - timer for function and speed. 
  // gameEnd()
  // playTheBeats() - plays music



  // CREATE GRID **************************************************************************************************************************
  function createGrid() {  // <-- creating cells
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      // cell.innerHTML = i        // *    <-- label the cells
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
  function displayTetromino() {
    currentTetromino[currentRotation].forEach(value => {
      cells[value + currentPosition].classList.add(currentTetromino.name)
    })
  }

  // REMOVE TETROMINO   ***************************************************************************************************************
  function removeTetromino() {
    currentTetromino[currentRotation].forEach(value => {
      cells[value + currentPosition].classList.remove(currentTetromino.name)   
    })
  }


  // CHECKS FOR TETROMINO   ****************************************************************************************************
  function checkBottomRow() {
    let isBottomRow = false
    currentTetromino[currentRotation].forEach(value => {
      if (value + width + currentPosition > cells.length - 1) {
        isBottomRow = true
      }
    })
    return isBottomRow
  }

  function checkObstacle() {
    let isObstacle = false
    currentTetromino[currentRotation].forEach(value => {
      if (cells[value + width + currentPosition] && cells[value + width + currentPosition].classList.contains('fixed-tetromino')) {
        isObstacle = true
      }
    })
    return isObstacle
  }

  function checkTopRow() {
    let isTopRow = false
    currentTetromino[currentRotation].forEach(value => {
      if (value + currentPosition > 0 ) {
        isTopRow = true
      }
    })
    return isTopRow
  }

  function checkRight() {
    if (currentTetromino[currentRotation].some(value => ((value + currentPosition + 1) % 10 === 0))) {
      return false
    } else if (currentTetromino[currentRotation].some(value => (cells[value + currentPosition + 1].classList.contains('fixed-tetromino')))) {
      return false
    } else {
      return true
    }
  }

  function checkLeft() {
    if (currentTetromino[currentRotation].some(value => ((value + currentPosition) % 10 === 0))) {
      return false
    } else if (currentTetromino[currentRotation].some(value => (cells[value + currentPosition - 1].classList.contains('fixed-tetromino')))) {
      return false
    } else {
      return true
    }
  }

  function canRotate() {
    if (currentTetromino[currentRotation].some(value => ((value + currentPosition + 1) % 10 === 0)) || currentTetromino[currentRotation].some(value => ((value + currentPosition) % 10 === 0)))  {
      return false
    } else {
      return true
    }
  }


  // CHECKS FOR FULL ROW AND CLEAR ROW   ******************************************************************************************
  function isRowFull() {
    for (let i = 0; i <= cells.length - 1; i++) {
      if (i % 10 === 0) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
        if (row.every(value => (cells[value].classList.contains('fixed-tetromino')))) {
          clearRow(row)
        }
      }
    }
  } 
  
  function clearRow(rowToClear) {
    rowToClear.forEach(value => {
      cells[value].classList.remove('fixed-tetromino', 'iTetromino', 'lTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'sTetromino', 'tTetromino')
    })
    linesCleared++
    shiftGridDown(rowToClear[0])
    console.log(`PlayerScore = ${playerScore}`)
  }

  function shiftGridDown(rowStartingIndex) {
    for (let i = rowStartingIndex - 1; i >= 0; i--) {
      if (cells[i].classList.contains('fixed-tetromino')) {
        cells[i].classList.remove('fixed-tetromino')
        cells[i + width].classList.add('fixed-tetromino')
      }
    }
  }


  // GAME FUNCTIONS  *******************************************************************************************************************
  function startTimer() {
    timerId = setInterval(descendTetromino, dropSpeed)
  } 

  // STARTS THE GAME ************************************
  function descendTetromino() {
    if (checkBottomRow() || checkObstacle() && checkTopRow()) {
      currentTetromino[currentRotation].forEach(value => {
        cells[value + currentPosition].classList.remove('fixed-tetromino', 'iTetromino', 'lTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'sTetromino', 'tTetromino')
        cells[value + currentPosition].classList.add('fixed-tetromino')
        console.log(`Player Score = ${playerScore}`)
      })
      clearInterval(timerId)                      
      currentPosition = 3
      getRandomTetromino()
      displayTetromino()
      startTimer()
    } else {
      moveDown()
      playerScore += 1
    }
    isRowFull()

    // console.log(`Current Level = ${currentLevel}`)
    console.log(`MultipleLines = ${multipleLines}`)
  }

  // END GAME FUNCTIONS *******************************************************************************************************

  //* GAME ENDS FUNCTION. LINKS UP WITH checkTopRow(). IF THAT IS FULFILLED THEN THE SHAPES NEED TO STOP.
  //* POSSIBLY A WINDOW ALERT TO TELL PLAYER SCORE?
  //! THIS DOES NOT WORK
  // function gameEnd() {
  //   if (checkTopRow()) {
  //     timerId = clearTimeout()
  //   }
  // }



  // LINK UP ARROW KEYS FOR FUNCTIONALITY   ******************************************************************************************* 
  // TODO      FUNCTIONALITY FOR THESE TWO KEYS
  // SPACE KEY - 32
  // M - 77


  // * MANIPULATE THIS FUNCTION SO THAT EACH KEY HAS IT'S OWN FUNCTION
  // * SOME() METHOD TESTS WHETER AT LEAST ONE ELEMENT IN THE ARRAY PASSES THE TEST. RETURNS BOOLEAN

  // GAME KEYS  **********************************************************************************************************************
  function moveLeft() { 
    if (checkLeft()) {
      console.log(checkLeft())
      removeTetromino()
      currentPosition--
      displayTetromino()
    }
  }

  function moveRight() {
    console.log(checkRight())
    if (checkRight()) {
      removeTetromino()
      currentPosition++
      displayTetromino()
    }
  }

  function moveDown() {
    if (!checkObstacle() && !checkBottomRow()) {
      removeTetromino()
      currentPosition += width
      displayTetromino()
    }
  }

  function rotate() {
    removeTetromino()
    console.log(currentRotation)
    if (currentRotation === 'deg0' && canRotate()) {
      return currentRotation = 'deg90'
    } else if (currentRotation === 'deg90' && canRotate()) {
      return currentRotation = 'deg180'
    } else if (currentRotation === 'deg180' && canRotate()) {
      return currentRotation = 'deg270'
    } else if (currentRotation === 'deg270' && canRotate()) {
      return currentRotation = 'deg0'
    }
    displayTetromino()
  }

  function enterKey() {
    getRandomTetromino()
    displayTetromino()
    startTimer()
  }

  //*  FAST DOWN
  //*   NEEDS TO CHECK IF DIVS WITH 'FIXEDTETROMINO' IN ADVANCED AND THEN PLACE SHAPE ON ROW ABOVE.
  // function fastDown() {
  // }

  // function muteTheBeats() {

  // }

  // function playTheBeats() {

  // }

  // KEYS E FUNCTION ****************************************************************************************************************************************
  function handleKeysUp(e) {
    switch (e.keyCode) {
      case 37:
        moveLeft()
        break
      case 39:
        moveRight()
        break
      case 40:
        moveDown()
        break
      case 38:
        rotate()
        break
      case 13:
        enterKey()
        break
      case 32:      //! <-- fast down.  SPACE BAR
        break
      // case 77:
      //   playTheBeats()
      //   muteTheBeats()
      //   break
      default:
        console.log('invalid key')
        break  
    }
  }

  function handleKeysDown(e) {
    if (e.repeat) {
      moveDown()
    }
  }

  

  // * EVENT LISTENER  ****************************************************************************************************************************************
  document.addEventListener('keyup', handleKeysUp)
  document.addEventListener('keydown', handleKeysDown)
  



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
      dropSpeed = 800
    } else if (currentLevel === 2) {
      dropSpeed = 700
    } else if (currentLevel === 3) {
      dropSpeed = 600
    } else if (currentLevel === 4) {
      dropSpeed = 500
    } else if (currentLevel === 5) {
      dropSpeed = 400
    } else if (currentLevel === 6) {
      dropSpeed = 300
    } else if (currentLevel === 7) {
      dropSpeed = 200
    } else {
      dropSpeed = 100
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

// RECURSION

// function countDownFrom(num) {
//   console.log(num)
//   if (num === 0) {
//     return 
//   }
//   countDownFrom(num - 1)
// }

// countDownFrom(10)