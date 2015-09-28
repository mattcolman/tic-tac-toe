import {Game} from './game';

var init = function() {
  let tictactoe = {
    numRows: 3,
    numColumns: 3,
    matches: 3,
    gravity: false
  }

  let connect4 = {
    numRows: 3,
    numColumns: 3,
    matches: 3,
    gravity: true
  }

  new Game(connect4)
}

init()


