/**
 * @author Matt Colman
 *
 * Computer AI player
 */

import {Grid} from './grid';

class Computer {

  constructor(grid) {
    this.grid = grid;
  }

  /**
   * [takeTurn description]
   * Scan board. Look first for a win. Then look for a block. Then choose a random block.
   */
  takeTurn() {
    console.log('computer take turn', this.grid);
  }

}

export {Computer};


