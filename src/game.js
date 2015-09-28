import {Grid} from './grid';

class Game {

  constructor(config) {
    this.blocks = $('li')
    this.turn = 0
    this.numRows    = config.numRows
    this.numColumns = config.numColumns
    this.numTurns   = this.numRows * this.numColumns
    this.gravity    = config.gravity
    this.players = [
      {name: 'Player 1', symbol: 'x'},
      {name: 'Player 2', symbol: 'o'}
    ]

    this.addGrid()
    this.addClick()
  }

  addGrid() {
    this.grid = new Grid(this.numColumns, this.numRows)
    this.grid.compare = function(a, b) {
      if (!a || !b) return false
      return a.innerHTML == b.innerHTML
    }

    let lis = $('li')
    lis = Array.from(lis) // convert array-like to array
    for (let li of lis) {
      let [x, y] = li.id.split(',')
      this.grid.setItem(x, y, li)
    }
  }

  addClick() {
    $('ul').click((e)=> {
      console.log('click', e.target.id)
      let symbol = this.players[this.turn%2].symbol
      e.target.className = symbol
      e.target.innerHTML = symbol
      let [x, y] = e.target.id.split(',')
      x = parseInt(x)
      y = parseInt(y)
      if (this.findMatches(x, y)) {
        console.log('match!')
      } else {
        console.log('no match!')
        if (++this.turn >= this.numTurns) {
          this.gameOver()
        }
      }

    })
  }

  findMatches(x, y) {
    return (this.grid.findMatches(x, y, ['n', 's'], 3) ||
            this.grid.findMatches(x, y, ['e', 'w'], 3) ||
            this.grid.findMatches(x, y, ['ne', 'sw'], 3) ||
            this.grid.findMatches(x, y, ['nw', 'se'], 3))
  }

  gameOver() {
    console.log('game over man!')
  }
}

export {Game};


