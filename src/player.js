/**
 * @author Matt Colman
 *
 * Human player
 */

import {Grid} from './grid';
import {_} from 'lodash';

var Player = {

  type: 'human',

  listenForClick: function (cb) {
    $('ul').click((e)=> {
      let target = e.target
      cb(target)
    })
  }
}

export {Player};


