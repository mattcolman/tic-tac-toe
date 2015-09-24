class Game {

  constructor(config) {
    this.blocks = $('li')
    this.turns = 0
    this.numRows    = config.numRows
    this.numColumns = config.numColumns
    this.gravity    = config.gravity

    $('ul').click((e)=> {
      console.log('click', e.target.id)
    })
  }

  init() {

  }
}

export {Game};


