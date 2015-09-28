import {Grid} from './grid';

class Game {

  constructor(config) {
    this.blocks = Array.from($('li')) // convert array-like to array
    this.turn = 0
    this.numRows    = config.numRows
    this.numColumns = config.numColumns
    this.numMatches = config.matches
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

    for (let li of this.blocks) {
      let [x, y] = li.id.split(',')
      this.grid.setItem(x, y, li)
    }
  }

  addClick() {
    $('ul').click((e)=> {
      console.log('click', e.target.id)
      let target = e.target
      let [x, y] = target.id.split(',')
      let a
      x = parseInt(x)
      y = parseInt(y)
      if (this.gravity) {
        while (true) {
          a = this.grid.getItem(x, y+1)
          if (a && a.innerHTML == '') {
            y++
            target = a
          } else {
            break;
          }
        }
      }
      let symbol = this.players[this.turn%2].symbol
      target.className = symbol
      target.innerHTML = symbol
      if (this.findMatches(x, y)) {
        console.log('WIN!')
        this.handleWin()
      } else {
        console.log('no match!')
        if (++this.turn >= this.numTurns) {
          this.gameOver()
        }
      }

    })
  }

  findMatches(x, y) {
    return (this.grid.findMatches(x, y, ['n', 's'], this.numMatches) ||
            this.grid.findMatches(x, y, ['e', 'w'], this.numMatches) ||
            this.grid.findMatches(x, y, ['ne', 'sw'], this.numMatches) ||
            this.grid.findMatches(x, y, ['nw', 'se'], this.numMatches))
  }

  handleWin() {
    $('ul').off()
  }

  gameOver() {
    console.log('game over man!')
    $('ul').off()
  }
}

export {Game};


