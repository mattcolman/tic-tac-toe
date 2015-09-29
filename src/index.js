import {Game} from './game';

var init = function() {
  let gameTypes = {

    tictactoe: {
      numRows: 3,
      numColumns: 3,
      matches: 3,
      gravity: false
    },

    connect4: {
      numRows: 6,
      numColumns: 7,
      matches: 4,
      gravity: true
    }
  }

  var game;

  $('#buttons a').click((e)=> {
    $('h1').text(e.currentTarget.innerHTML)
    if (game) game.destroy()
    game = new Game(gameTypes[e.currentTarget.id])
  })

}

init()


