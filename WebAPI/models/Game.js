/**
 * Created by jbush_000 on 11/21/2015.
 */
"use strict";

var bookshelf = require('../db').bookshelf;
var User = require('./User');
var CardModel = require('./Card');
var async = require('async');
var q = require('q');

var Game =  bookshelf.Model.extend({
    tableName: 'Game',
    Player1: function() {
        return this.belongsTo(User.User, 'Player1')
    },
    Player2: function() {
        return this.belongsTo(User.User, 'Player2')
    },
    GameBoard: function() {
        return this.belongsTo(GameBoard, 'BoardId')
    },
    P1_Deck : function() {
        return this.belongsTo(PlayerGameDeck, 'P1_Deck')
    },
    P2_Deck : function() {
        return this.belongsTo(PlayerGameDeck, 'P2_Deck')
    }
});

var GameBoard = bookshelf.Model.extend({
    tableName: 'GameBoard'
});

var PlayerGameDeck = bookshelf.Model.extend({
    tableName: 'PlayerGameDeck',
    DeckCards: function () {
        return this.belongsToMany(Card, 'PlayerGameDeck_Card', 'PlayerGameDeckId', 'CardId');
    }
});

var TestDeckCreate = function () {
    this.PlayerGameDeck().forge().save()
        .then(function (pgd) {
            RandomSixtyCards().then(function(cards){
                return pgd.attach(cards);
            });
        });
};

var RandomSixtyCards = function () {
    var deferred = q.defer();
    var SixtyCards = [];
    var cards = new CardModel.Cards();
        cards.fetch()
        .then(function(results){
            for (var i = 1; i <= 60; i++){
                var check = results.at([Math.floor(Math.random()*results.length)]);
                SixtyCards.push(check);
            }
        })
        .then(function(){
            deferred.resolve(SixtyCards);
        });
    return deferred.promise;
};

module.exports = {
    Game: Game,
    GameBoard: GameBoard,
    PlayerGameDeck: PlayerGameDeck,
    RandomSixtyCards: RandomSixtyCards
};