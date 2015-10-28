/**
 * @author Matt Colman
 *
 * Computer AI player
 */

import {Grid} from './grid';
import {_} from 'lodash';

var Computer = {

  type: 'computer',

  init: function (game, grid) {
    this.game = game;
    this.grid = grid;
    this.opponentSymbol = _.without(['x', 'o'], this.symbol)
    return this;
  },

  listenForClick: function(cb) {
    console.log('computer take turn');
    let block = this.chooseMove()
    // potential here for a delay while computer makes his move
    cb(block)
  },

  // get all empty grid blocks
  // first place your own symbol in each empty block searching for a win
  // then place your opponents symbol in each block searching for a block
  // if nothing, then place in a random block.
  chooseMove: function(cb) {
    if (this.game.gravity) {
      // only add the top row to the list if there's gravity
      this.emptyBlocks = []
      for (let arr of this.grid.pos) {
        this.emptyBlocks.push(arr[0])
      }
    } else {
      this.emptyBlocks = this.grid.pos
    }

    this.emptyBlocks = _.filter(_.flatten(this.emptyBlocks), function (item) {
      return (item.innerHTML == "")
    });

    return this.findWinningMove() || this.findBlockingMove() || this.findRandomMove()
  },

  findWinningMove: function() {
    let match = this.findPotentialMatch(this.symbol)
    if (match) {
      if (this.computerMistake()) {
        console.log("Computer got distracted and missed the WIN!")
        match = null
      } else {
        console.log("Computer WIN!!")
      }
    }
    return match
  },

  findBlockingMove: function() {
    let match = this.findPotentialMatch(this.opponentSymbol)
    if (match) {
      if (this.computerMistake()) {
        console.log("Computer got distracted and missed the block!")
        match = null
      } else {
        console.log("Computer BLOCK!!")
      }
    }
    return match
  },

  findRandomMove: function() {
    console.log("Computer RANDOM move")
    return _.shuffle(this.emptyBlocks)[0]
  },

  findPotentialMatch: function(symbol) {
    for (let block of this.emptyBlocks) {
      if (this.game.gravity) {
        // need to find the affected block so we can change it
        // back to empty after checking
        let [x, y] = this.game.getXY(block)
        block = this.game.findNextBlockInColumn(x)
      }
      if (this.game.placeSymbolInBlock(symbol, block)) {
        $(block).text('');
        return block;
      } else {
        $(block).text('');
      }
    }
    return null
  },

  computerMistake: function() {
    return Math.random() < .1
  }
}

export {Computer};


