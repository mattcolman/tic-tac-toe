import {Game} from './game';

var init = function() {
  let config = {
    numRows: 3,
    numColumns: 3,
    gravity: false
  }
  new Game(config)
}

init()


