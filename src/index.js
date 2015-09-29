import {Game} from './game';

var init = function() {
  let tictactoe = {
    numRows: 3,
    numColumns: 3,
    matches: 3,
    gravity: false
  }

  let connect4 = {
    numRows: 6,
    numColumns: 7,
    matches: 4,
    gravity: true
  }

  new Game(connect4)
}

init()


