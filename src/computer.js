/**
 * @author Matt Colman
 *
 * Computer AI player
 */

import {Grid} from './grid';
import {_} from 'lodash';

class Computer {

  constructor(game, grid) {
    this.game = game;
    this.grid = grid;
  }

  listenForClick(cb) {
    console.log('computer take turn');
    // get all empty grid squares
    // first place your own symbol in each empty square searching for a win
    // then place your opponents symbol in each square searching for a block
    // if nothing, then place in a random square.

    let emptySquares = _.filter(_.flatten(this.grid.pos), function (item) {
      return (item.innerHTML == "")
    });
    for (let square of emptySquares) {
      $(square).text('x');
      let [x, y] = this.game.getXY(square);
      if (this.game.findMatches(x, y)) {
        $(square).text('');
        return cb(square);
      } else {
        $(square).text('');
      }
    }

    return cb(_.shuffle(emptySquares)[0])
  }

  /**
   * [takeTurn description]
   * Scan board. Look first for a win. Then look for a block. Then choose a random block.
   */
  takeTurn() {


  }

}

export {Computer};


