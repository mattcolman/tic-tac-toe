(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Game = (function () {
  function Game(config) {
    _classCallCheck(this, Game);

    this.blocks = $('li');
    this.turns = 0;
    this.numRows = config.numRows;
    this.numColumns = config.numColumns;
    this.gravity = config.gravity;

    $('ul').click(function (e) {
      console.log('click', e.target.id);
    });
  }

  Game.prototype.init = function init() {};

  return Game;
})();

exports.Game = Game;

},{}],2:[function(require,module,exports){
'use strict';

var _game = require('./game');

var init = function init() {
  var config = {
    numRows: 3,
    numColumns: 3,
    gravity: false
  };
  new _game.Game(config);
};

init();

},{"./game":1}]},{},[2]);
