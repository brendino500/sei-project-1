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

  // ?? Level 0-1   1 line = 100  2 lines = 400   3 lines = 900   4 lines = 2000
  // ?? Level 2-3   1 line = 200  2 lines = 800   3 lines = 1800  4 lines = 4000
  // ?? Level 4-5   1 line = 300  2 lines = 1200  3 lines = 2700  4 lines = 6000
  // ?? Level 6-7   1 line = 400  2 lines = 1600  3 lines = 3600  4 lines = 8000
  // ?? Level 8+    1 line = 500  2 lines = 2000  3 lines = 4500  4 lines = 10000

  







}

window.addEventListener('DOMContentLoaded', init)