(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Matt Colman
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _grid = require('./grid');

var Game = (function () {
  function Game(config) {
    _classCallCheck(this, Game);

    this.turn = 0;
    this.numRows = config.numRows;
    this.numColumns = config.numColumns;
    this.numMatches = config.matches;
    this.numTurns = this.numRows * this.numColumns;
    this.gravity = config.gravity;
    this.players = [{ name: 'Player 1', symbol: 'x' }, { name: 'Player 2', symbol: 'o' }];

    this.createBlocks();
    this.blocks = Array.from($('li')); // convert array-like to array
    this.addGrid();
    this.addClick();
    $('#result').hide();
  }

  Game.prototype.destroy = function destroy() {
    $('ul').off();
    $('ul').empty();
  };

  Game.prototype.createBlocks = function createBlocks() {
    for (var j = 0; j < this.numRows; j++) {
      for (var i = 0; i < this.numColumns; i++) {
        var form = '<li id="' + i + ',' + j + '"></li>';
        form = $(form);
        $('#game').append(form);
      };
    };
    var blockWidth = $("li").outerWidth(true);
    $('#game').width(this.numColumns * blockWidth);
    $('#game').height(this.numRows * blockWidth);
  };

  Game.prototype.addGrid = function addGrid() {
    this.grid = new _grid.Grid(this.numColumns, this.numRows);
    this.grid.compare = function (a, b) {
      if (!a || !b) return false;
      return a.innerHTML == b.innerHTML;
    };

    for (var _iterator = this.blocks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var li = _ref;

      var _li$id$split = li.id.split(',');

      var x = _li$id$split[0];
      var y = _li$id$split[1];

      this.grid.setItem(x, y, li);
    }
  };

  Game.prototype.addClick = function addClick() {
    var _this = this;

    $('ul').click(function (e) {
      var target = e.target;
      var a = undefined;

      var _getXY = _this.getXY(target);

      var x = _getXY[0];
      var y = _getXY[1];

      if (_this.gravity) target = _this.findNextBlockInColumn(x);
      if (!_this.isVacant(target)) return;

      var symbol = _this.players[_this.turn % 2].symbol;
      target.className = symbol;
      target.innerHTML = symbol;

      var _getXY2 = _this.getXY(target);

      x = _getXY2[0];
      y = _getXY2[1];

      if (_this.findMatches(x, y)) {
        _this.handleWin();
      } else {
        if (++_this.turn >= _this.numTurns) {
          _this.gameOver();
        }
      }
    });
  };

  Game.prototype.getXY = function getXY(block) {
    var _block$id$split = block.id.split(',');

    var x = _block$id$split[0];
    var y = _block$id$split[1];

    return [parseInt(x), parseInt(y)];
  };

  Game.prototype.findNextBlockInColumn = function findNextBlockInColumn(x) {
    var y = -1;
    var block = undefined,
        a = undefined;
    while (true) {
      a = this.grid.getItem(x, y + 1);
      if (this.isVacant(a)) {
        y++;
        block = a;
      } else {
        return block;
      }
    }
  };

  Game.prototype.isVacant = function isVacant(block) {
    return block && block.innerHTML == '';
  };

  Game.prototype.findMatches = function findMatches(x, y) {
    return this.grid.findMatches(x, y, ['n', 's'], this.numMatches) || this.grid.findMatches(x, y, ['e', 'w'], this.numMatches) || this.grid.findMatches(x, y, ['ne', 'sw'], this.numMatches) || this.grid.findMatches(x, y, ['nw', 'se'], this.numMatches);
  };

  Game.prototype.handleWin = function handleWin() {
    $('ul').off();
    var symbol = this.players[this.turn % 2].symbol;
    $('#result')[0].className = symbol;
    $('#result').text(symbol.toUpperCase() + ' WINS!');
    $('#result').show();
  };

  Game.prototype.gameOver = function gameOver() {
    $('ul').off();
    $('#result').text('DRAW!');
    $('#result').show();
  };

  return Game;
})();

exports.Game = Game;

},{"./grid":2}],2:[function(require,module,exports){
/**
 * @author Matt Colman
 * This is a generic 2d Grid class.
 * It allows you to set an item to a grid position,
 * get an item from a grid position,
 * compare 2 items in the grid and
 * find consecutive matches from a start point in
 * a directional line.
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Grid = (function () {

  /**
   * Constructor
   * @param  {Int} columns   number of columns in the grid
   * @param  {Int} rows      number of rows in the grid
   * @return {Grid}
   */

  function Grid(columns, rows) {
    _classCallCheck(this, Grid);

    this.pos = [];
    for (var i = 0; i < columns; i++) {
      var a = [];
      this.pos.push(a);
      for (var j = 0; j < rows; j++) {
        a.push([]);
      }
    }

    this.directions = {
      'n': [0, -1],
      'e': [1, 0],
      's': [0, 1],
      'w': [-1, 0]
    };
  }

  /**
   * Set an item to the grid
   * @public
   * @param {Int} x    x position in the grid
   * @param {Int} y    y position in the grid
   * @param {Object}   the item stored in the grid
   */

  Grid.prototype.setItem = function setItem(x, y, item) {
    this.pos[x][y] = item;
  };

  /**
   * Get an item from the grid
   * @public
   * @param  {Int} x   x position in the grid
   * @param  {Int} y   y position in the grid
   * @return {*}   GridItem
   */

  Grid.prototype.getItem = function getItem(x, y) {
    if (this.pos[x]) return this.pos[x][y];
    return undefined;
  };

  /**
   * Compare method
   * @public
   * @param  {*} a ItemA
   * @param  {*} b ItemB
   * @return {Boolean}   A boolean to determine if a and b are a match
   * @note - Override me if you need a custom compare method.
   */

  Grid.prototype.compare = function compare(a, b) {
    return a == b;
  };

  /**
   * Finds all matches from an array of directions
   * @public
   * @param  {Int} x            x position in the grid
   * @param  {Int} y            y position in the grid
   * @param  {Array} directions a list of directions to include in the search
   * @param  {Int} min          Minimum allowed matches. If under the minimum will return null.
   * @return {Array}            Array of matches.
   */

  Grid.prototype.findMatches = function findMatches(x, y, directions, min) {
    var a = this.getItem(x, y);
    var matches = [a];
    for (var _iterator = directions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var str = _ref;

      var direction = this._parseDirection(str);
      matches = matches.concat(this.findMatchByDirection(x, y, direction));
    }

    if (matches.length >= min) {
      return matches;
    } else {
      return null;
    }
  };

  /**
   * Recursively returns all consecutive matches from an
   * @public
   * x, y grid position in a direction.
   * @param  {Int} x            x position in the grid
   * @param  {Int} y            y position in the grid
   * @param  {Array} direction  a single direction of the search in Array form e.g [1, 1] goes SE
   * @param  {Array} matches    used for the recursive result
   * @return {Array}            Array of matches
   */

  Grid.prototype.findMatchByDirection = function findMatchByDirection(x, y, direction) {
    var matches = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

    var a = this.getItem(x, y);
    x += direction[0];
    y += direction[1];
    var b = this.getItem(x, y);
    if (this.compare(a, b)) {
      matches.push(b);
      return this.findMatchByDirection(x, y, direction, matches);
    } else {
      return matches;
    }
  };

  /**
   * converts a direction string into an Array
   * @private
   * @param  {String} str  e.g. 'ne'
   * @return {Array}       e.g. [-1, 1]
   */

  Grid.prototype._parseDirection = function _parseDirection(str) {
    var directions = str.split('');
    var result = [0, 0];
    for (var _iterator2 = directions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var d = _ref2;

      result[0] += this.directions[d][0];
      result[1] += this.directions[d][1];
    }
    return result;
  };

  return Grid;
})();

exports.Grid = Grid;

},{}],3:[function(require,module,exports){
/**
 * @author Matt Colman
 */

'use strict';

var _game = require('./game');

var init = function init() {
  var gameTypes = {

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

    // todo
    // match3: {
    // }
  };

  var game;

  $('#buttons a').click(function (e) {
    $('h1').text(e.currentTarget.innerHTML);
    if (game) game.destroy();
    game = new _game.Game(gameTypes[e.currentTarget.id]);
  });
};

init();

},{"./game":1}]},{},[3]);
