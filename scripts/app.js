// TODO ***************************************************************************************
// TODO 
// TODO   STYLING
// TODO 
// TODO *****************************************************************************************

function init() {
  // * DOM ELEMENTS *************************************************************************************************************

  const grid = document.querySelector('.grid')
  const cells = []
  const miniGrid = document.querySelector('.mini-grid')
  const miniCells = []
  const highestScoreResults = document.querySelector('#highest-score')
  const playerCurrentScore = document.querySelector('#player-current-score')
  const playerCurrentLevel = document.querySelector('#current-level')
  const audio = document.querySelector('#tetris-latin-jazz')

  // * GRID VARIABLES *********************************************************************************************************************
  //MAIN GRID
  const width = 10
  const height = 22
  const numberOfCells = width * height

  // MINI GRID
  const miniWidth = 4
  const miniHeight = 4
  const numberOfCellsMini = miniWidth * miniHeight

  // * TETRIMINOS SHAPE  ********************************************************************************************************************
  const iTetromino = {
    name: 'iTetromino', 
    deg0: [0, 1, 2, 3],
    deg90: [2, 12, 22, 32],
    deg180: [20, 21, 22, 23],
    deg270: [1, 11, 21, 31],
    miniGrid: [4, 5, 6, 7]
  }

  const tTetromino = {
    name: 'tTetromino',
    deg0: [1, 10, 11, 12],
    deg90: [1, 11, 12, 21],
    deg180: [10, 11, 12, 21],
    deg270: [1, 10, 11, 21],
    miniGrid: [1, 4, 5, 6]
  }

  const sTetromino = {
    name: 'sTetromino',
    deg0: [1, 2, 10, 11],
    deg90: [1, 11, 12, 22],
    deg180: [1, 2, 10, 11],
    deg270: [1, 11, 12, 22],
    miniGrid: [1, 2, 4, 5]
  }

  const oTetromino = {
    name: 'oTetromino',
    deg0: [1, 2, 11, 12],
    deg90: [1, 2, 11, 12],
    deg180: [1, 2, 11, 12],
    deg270: [1, 2, 11, 12],
    miniGrid: [1, 2, 5, 6]
  }

  const zTetromino = {
    name: 'zTetromino',
    deg0: [0, 1, 11, 12],
    deg90: [2, 11, 12, 21],
    deg180: [0, 1, 11, 12],
    deg270: [2, 11, 12, 21],
    miniGrid: [5, 6, 9, 10]
  }

  const jTetromino = { 
    name: 'jTetromino',
    deg0: [0, 10, 11, 12],
    deg90: [1, 2, 11, 21],
    deg180: [10, 11, 12, 22],
    deg270: [1, 11, 21, 20],
    miniGrid: [2, 6, 9, 10]
  }

  const lTetromino = {      
    name: 'lTetromino',
    deg0: [2, 10, 11, 12],
    deg90: [1, 11, 21, 22],
    deg180: [10, 11, 12, 20],
    deg270: [0, 1, 11, 21],
    miniGrid: [1, 5, 9, 10]
  }

  // * GAME VARIABLES ***************************************************************************************************************
  let linesCleared = 0
  let currentLevel = 0
  let highScore = window.localStorage.getItem('Highscore')      // <-- number needs to be saved somewhere?! lol if else to update highscore
  let playerScore = 0
  const tetrominosArray = [iTetromino, tTetromino, sTetromino, oTetromino, zTetromino, jTetromino, lTetromino]     // <-- different tetrominos
  let currentPosition = 3  // <-- Starting position for the top of the grid. Needs to descend. 
  let currentRotation = 'deg0'
  const defaultDropSpeed = 900
  let dropSpeed = defaultDropSpeed
  let currentTetromino = null
  let timerId = null
  let isGamePlaying = false
  let nextTetromino = getRandomTetromino()


  // * FUNCTIONS  ********************************************************************************************************************
  // * FUNCTION NAMES SO FAR AND DESCRIPTION OF WHAT THEY DO

  // createGrid() - Creates tetris grid
  // displayTetromino() - gets tetromino on grid
  // removeTetromino() - removes tetromino
  // descendTetromino() - tetromino moves down the grid   STARTS GAME
  // displayNextTetromino() - shows next tetromino on grid
  // getRandomTetromino() - gets random tetromino
  // updateCurrentTetromino() - changes current tetromino
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
  // handleKeysUp() - specifies player keyboard events
  // handleKeysDown() - event to detect key HELD down
  // updateHighScore() - updates high score when PLAYER LOSES
  // changeLevel() - checks if level needs to change
  // changeSpeed() - checks if speed needs to increase
  // startTimer() - timer for function and speed. 
  // gameOver()
  // dropDaBeatz() - plays music
  // shh() - stops music
  // updateScores() - DOM scores / Local storage


  // CREATE GRID **************************************************************************************************************************
  function createGrid() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i        // *    <-- label the cells
      grid.appendChild(cell)
    }
  }
  createGrid()

  function createMiniGrid() {
    for (let i = 0; i < numberOfCellsMini; i++) {
      const cell = document.createElement('div')
      miniCells.push(cell)
      cell.innerHTML = i     // label the cells
      miniGrid.appendChild(cell)
    }
  }
  createMiniGrid()


  //  GAME FUNCTIONS    *******************************************************************************************************
  // GENERATE RANDOM TETRIMINO 
  function getRandomTetromino() {
    return tetrominosArray[Math.floor(Math.random() * tetrominosArray.length)]
  }

  function updateCurrentTetromino() {
    currentTetromino = nextTetromino
    nextTetromino = getRandomTetromino()
    displayNextTetromino()
  }

  // SHOW TETROMINO  
  function displayTetromino() {
    currentTetromino[currentRotation].forEach(value => {
      cells[value + currentPosition].classList.add(currentTetromino.name)
    })
  }

  // REMOVE TETROMINO  
  function removeTetromino() {
    currentTetromino[currentRotation].forEach(value => {
      cells[value + currentPosition].classList.remove(currentTetromino.name)   
    })
  }

  // SHOWS UP NEXT TETROMINO ********************************************************************
  function displayNextTetromino() {
    miniCells.forEach(value => {
      value.classList.remove('fixed-tetromino', 'iTetromino', 'lTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'sTetromino', 'tTetromino')
    })
    nextTetromino['miniGrid'].forEach(value => {
      miniCells[value].classList.add(nextTetromino.name)
    })

  }


  // CHECKS FOR TETROMINO   ****************************************************************************************************
  function checkBottomRow(numberOfRowsBelow) {
    let isBottomRow = false
    currentTetromino[currentRotation].forEach(value => {
      if (value + (width * numberOfRowsBelow) + currentPosition > cells.length - 1) {
        isBottomRow = true
      }
    })
    return isBottomRow
  }

  function checkObstacle(numberOfRowsBelow) {
    let isObstacle = false
    currentTetromino[currentRotation].forEach(value => {
      const cellIndex = value + (width * numberOfRowsBelow) + currentPosition    // change to a number which refers to the cell array index
      if (cells[cellIndex] && cells[cellIndex].classList.contains('fixed-tetromino')) {
        isObstacle = true
      }
    })
    return isObstacle
  }

  function checkTopRow() {
    let isTopRow = false
    currentTetromino[currentRotation].forEach(value => {
      if (cells[value + currentPosition].classList.contains('fixed-tetromino')) {
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
    let multipleLinesCount = 0
    for (let i = 0; i <= cells.length - 1; i++) {
      if (i % 10 === 0) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
        if (row.every(value => (cells[value].classList.contains('fixed-tetromino')))) {
          multipleLinesCount++
          clearRow(row)
        }
      }
    }
    if (multipleLinesCount > 0) {
      rowPoints(multipleLinesCount)
    }
  } 
  
  function clearRow(rowToClear) {
    rowToClear.forEach(value => {
      cells[value].classList.remove('fixed-tetromino', 'iTetromino', 'lTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'sTetromino', 'tTetromino')
    })
    linesCleared++
    shiftGridDown(rowToClear[0])
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
    if (checkBottomRow(1) || checkObstacle(1)) {
      currentTetromino[currentRotation].forEach(value => {
        cells[value + currentPosition].classList.remove('fixed-tetromino', 'iTetromino', 'lTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'sTetromino', 'tTetromino')
        cells[value + currentPosition].classList.add('fixed-tetromino')
        updateScores()
      })
      clearInterval(timerId)                      
      currentPosition = 3
      updateCurrentTetromino()
      if (checkTopRow()) {
        gameOver()
      } else {
        displayTetromino()
        startTimer()
      }
    } else {
      moveDown()
    }
    isRowFull()
    changeLevel()
    changeSpeed()
  }

  // END GAME FUNCTIONS *******************************************************************************************************
  function gameOver() {
    window.alert('GAME OVER, LOSER!')
    updateHighScore()
    window.localStorage.setItem('Highscore', highScore)
    cells.forEach(value => {
      value.classList.remove('fixed-tetromino', 'iTetromino', 'lTetromino', 'oTetromino', 'zTetromino', 'jTetromino', 'sTetromino', 'tTetromino')
    })
    isGamePlaying = false
    playerScore = 0
    currentPosition = 3
    linesCleared = 0
    currentLevel = 0
    currentRotation = 'deg0'
    dropSpeed = defaultDropSpeed
    currentTetromino = null
    updateScores()  // DOM
    audio.pause()
  }

  // GAME KEYS  **********************************************************************************************************************
  function moveLeft() { 
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

  function moveDown() {
    if (!checkObstacle(1) && !checkBottomRow(1)) {
      removeTetromino()
      currentPosition += width
      playerScore++
      displayTetromino()
      updateScores()      // Update the browser
    }
  }

  function rotate() {
    removeTetromino()
    if (currentRotation === 'deg0' && canRotate()) {
      currentRotation = 'deg90'
    } else if (currentRotation === 'deg90' && canRotate()) {
      currentRotation = 'deg180'
    } else if (currentRotation === 'deg180' && canRotate()) {
      currentRotation = 'deg270'
    } else if (currentRotation === 'deg270' && canRotate()) {
      currentRotation = 'deg0'
    }
    displayTetromino()
  }

  function fastDown() {
    let numberOfRows = 0          // Will be the multiplier and number for scores by row
    while (!checkBottomRow(numberOfRows) && !checkObstacle(numberOfRows)) {      //  Multiplying by width
      numberOfRows++
    }
    numberOfRows--
    removeTetromino()
    currentPosition += (width * numberOfRows)
    playerScore += numberOfRows
    displayTetromino()
    updateScores()  
  }

  function startGame() {
    if (!isGamePlaying) {
      isGamePlaying = true
      updateCurrentTetromino()
      displayTetromino()
      startTimer()
      dropDaBeatz()
    }
  }

  function shhh() {
    audio.muted = !audio.muted
  } 

  function dropDaBeatz() {
    audio.src = '../music/Tetris-Latin-Jazz.wav'
    audio.loop = true
    audio.play()
  }

  // KEYS E FUNCTION ****************************************************************************************************************************************
  function handleKeysUp(e) {
    switch (e.keyCode) {
      case 37:            // LEFT ARROW
        moveLeft()
        break
      case 39:          // RIGHT ARROW
        moveRight()
        break
      case 40:          // DOWN ARROW
        moveDown()
        break
      case 38:        // UP ARROW
        rotate()
        break
      case 13:        // ENTER KEY   START GAME
        startGame()
        break
      case 32: 
        fastDown()     // fast down.  SPACE BAR
        break
      case 77:    //      KEY   M FOR MUTE/MUSIC
        shhh()
        break
      default:
        console.log('invalid key')
        break  
    }
  }

  function handleKeysDown(e) {
    if (e.repeat) {
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
        default:
          console.log('invalid key')
          break
      }
    }
  }

  function updateScores() {
    playerCurrentScore.innerHTML = playerScore 
    playerCurrentLevel.innerHTML = currentLevel
    highestScoreResults.innerHTML = highScore === null ? 0 : highScore
    console.log(`speed ${dropSpeed}`)
  }

  
  // * SCORING LOGIC **************************************************************************************************************************
  // CHANGING LEVELS   ******************************************************************************************************
  function changeLevel() {
    currentLevel = Math.floor(linesCleared / 5)
  }

  // CHANGE OF SPEED FOR EACH LEVEL **********************************************************************************************
  function changeSpeed() {
    const currentSpeed = dropSpeed
    if (currentLevel === 0) {
      dropSpeed = defaultDropSpeed
    } else if (currentLevel === 1) {
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
      dropSpeed = 160
    }
    if (dropSpeed !== currentSpeed) {
      clearInterval(timerId)
      startTimer()
    }
  }

  // POINT SCORING    **********************************************************************************************************************************************
  function rowPoints(multipleLines) {
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
    updateScores()
  }

  // STORING HIGH SCORE *********************************************************************************************************************
  // * LOCAL STORAGE
  function updateHighScore() {
    if (playerScore > highScore) {
      highScore = playerScore
    } 
  }

  // * EVENT LISTENER  *******************************************************************************************************************************
  document.addEventListener('keyup', handleKeysUp, updateScores())
  document.addEventListener('keydown', handleKeysDown)
  
}
window.addEventListener('DOMContentLoaded', init)
