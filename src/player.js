/**
 * @author Matt Colman
 *
 * Human player
 */

import {Grid} from './grid';
import {_} from 'lodash';

class Player {

  constructor() {
  }

  listenForClick(cb) {
    $('ul').click((e)=> {
      let target = e.target
      cb(target)
    })
  }
}

export {Player};


