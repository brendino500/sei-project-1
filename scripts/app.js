function init() {

  // * DOM ELEMENTS

  const grid = document.querySelector('.grid')
  const cells = []     // <-- empty array for cells



  // * GRID VARIABLES

  // ? 10 x 20  dimentions of grid

  const width = 10
  const height = 20
  const numberOfCells = width * height


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



  // * EVENT LISTENER

















  // * SCORING LOGIC

  // ?? Level 0-1   1 line = 100  2 lines = 400   3 lines = 900   4 lines = 2000    10 cleared lines
  // ?? Level 2-3   1 line = 200  2 lines = 800   3 lines = 1800  4 lines = 4000    20 cleared lines
  // ?? Level 4-5   1 line = 300  2 lines = 1200  3 lines = 2700  4 lines = 6000    30 cleared lines
  // ?? Level 6-7   1 line = 400  2 lines = 1600  3 lines = 3600  4 lines = 8000    40 cleared lines
  // ?? Level 8+    1 line = 500  2 lines = 2000  3 lines = 4500  4 lines = 10000   50 cleared lines
  // ?? Clear 5 lines to get onto next level

  let linesCleared = 0
  let currentLevel = 0

  if (linesCleared <= 10) {
    currentLevel++
  } else if (linesCleared > 10 || linesCleared <= 20) {
    currentLevel++
  } else if (linesCleared > 10 || linesCleared <= 20) {
    currentLevel++
  } else if (linesCleared > 20 || linesCleared <= 30) {
    currentLevel++
  } else if (linesCleared > 30 || linesCleared <= 40) {
    currentLevel++
  } else (linesCleared > 40)
  return currentLevel++



}
  









window.addEventListener('DOMContentLoaded', init)




// !! RECURSION 

function countDownFrom(num) {
  console.log(num)
  if (num === 0) {
    return 
  }
  countDownFrom(num - 1)
}

countDownFrom(10)