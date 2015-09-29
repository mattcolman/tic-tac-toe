import {Grid} from './grid';

class Game {

  constructor(config) {
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

    this.createBlocks()
    this.blocks = Array.from($('li')) // convert array-like to array
    this.addGrid()
    this.addClick()
    $('#result').hide()
  }

  destroy() {
    $('ul').off()
    $('ul').empty()
  }

  createBlocks() {
    for (var j = 0; j < this.numRows; j++) {
      for (var i = 0; i < this.numColumns; i++) {
        let form = `<li id="${i},${j}"></li>`
        form = $(form)
        $('#game').append(form)
      };
    };
    let blockWidth = $("li").outerWidth(true)
    $('#game').width(this.numColumns*blockWidth)
    $('#game').height(this.numRows*blockWidth)
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
      let target = e.target
      let a
      let [x, y] = this.getXY(target)

      if (this.gravity) target = this.findNextBlockInColumn(x)
      if (!this.isVacant(target)) return

      let symbol = this.players[this.turn%2].symbol
      target.className = symbol;
      target.innerHTML = symbol;

      [x, y] = this.getXY(target);
      if (this.findMatches(x, y)) {
        this.handleWin()
      } else {
        if (++this.turn >= this.numTurns) {
          this.gameOver()
        }
      }

    })
  }

  getXY(block) {
    let [x, y] = block.id.split(',')
    return [parseInt(x), parseInt(y)]
  }

  findNextBlockInColumn(x) {
    let y = -1
    let block, a
    while (true) {
      a = this.grid.getItem(x, y+1)
      if (this.isVacant(a)) {
        y++
        block = a
      } else {
        return block
      }
    }
  }

  isVacant(block) {
    return (block && block.innerHTML == '')
  }

  findMatches(x, y) {
    return (this.grid.findMatches(x, y, ['n', 's'], this.numMatches) ||
            this.grid.findMatches(x, y, ['e', 'w'], this.numMatches) ||
            this.grid.findMatches(x, y, ['ne', 'sw'], this.numMatches) ||
            this.grid.findMatches(x, y, ['nw', 'se'], this.numMatches))
  }

  handleWin() {
    $('ul').off()
    let symbol = this.players[this.turn%2].symbol
    $('#result')[0].className = symbol
    $('#result').text(`${symbol.toUpperCase()} WINS!`)
    $('#result').show()
  }

  gameOver() {
    $('ul').off()
    $('#result').text('DRAW!')
    $('#result').show()
  }
}

export {Game};


