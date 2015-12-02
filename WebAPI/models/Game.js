/**
 * Created by jbush_000 on 11/21/2015.
 */
"use strict";

var bookshelf = require('../db').bookshelf;
var UserModel = require('./User');
var CardModel = require('./Card');
var db = require('../db').knex;
var async = require('async');
var q = require('q');
var _ = require('lodash');

var Game = bookshelf.Model.extend({
    tableName: 'Game',
    Player1: function () {
        return this.belongsTo(UserModel.User, 'Player1')
    },
    Player2: function () {
        return this.belongsTo(UserModel.User, 'Player2')
    },
    GameBoard: function () {
        return this.belongsTo(GameBoard, 'BoardId')
    },
    P1_Deck: function () {
        return this.belongsTo(PlayerGameDeck, 'P1_Deck')
    },
    P2_Deck: function () {
        return this.belongsTo(PlayerGameDeck, 'P2_Deck')
    }
});

var GameBoard = bookshelf.Model.extend({
    tableName: 'GameBoard',
    Game: function () {
        return this.hasOne(Game, 'BoardId')
    }
});

var PlayerGameDeck = bookshelf.Model.extend({
    tableName: 'PlayerGameDeck',
    GameP1: function () {
        return this.hasOne(Game, 'P1_Deck')
    },
    GameP2: function () {
        return this.hasOne(Game, 'P2_Deck')
    },
    DeckCards: function () {
        return this.hasMany(PlayerGameDeck_Card, "PlayerGameDeckId");
    }
});

var PlayerGameDeck_Card = bookshelf.Model.extend({
    tableName: 'PlayerGameDeck_Card',
    PlayerGameDeck: function () {
        return this.belongsTo(PlayerGameDeck)
    }
});

function TestDeckCreate(PlayerId) {
    var deferred = q.defer();
    var PGDCards = [];
    PlayerGameDeck.forge({PlayerId: PlayerId}).save()
        .then(function (pgd) {
            RandomSixtyCards()
                .then(function (cards) {
                    _.each(cards, function (card, i) {
                        PGDCards.push({
                            PlayerGameDeckId: pgd.id,
                            OriginalCard: card.get('id'),
                            CPowerCost: card.get('PowerCost'),
                            CPowerProvided: card.get('PowerProvided'),
                            CMovement: card.get('Movement'),
                            CAttack: card.get('Attack'),
                            CLife: card.get('Life'),
                            CArmor: card.get('Armor'),
                            Status: 'Deck',
                            SIndex: i
                        })
                    });
                })
                .then(function () {
                    return db.insert(PGDCards).into('PlayerGameDeck_Card')
                        .then (function () {
                            deferred.resolve(pgd.get('id'));
                        })
                });
        });
    return deferred.promise;
}

var RandomSixtyCards = function () {
    var deferred = q.defer();
    var SixtyCards = [];
    var cards = new CardModel.Cards();
    cards.fetch()
        .then(function (results) {
            for (var i = 1; i <= 60; i++) {
                var check = results.at([Math.floor(Math.random() * results.length)]);
                SixtyCards.push(check);
            }
        })
        .then(function () {
            deferred.resolve(SixtyCards);
        });
    return deferred.promise;
};

module.exports = {
    Game: Game,
    GameBoard: GameBoard,
    PlayerGameDeck: PlayerGameDeck,
    TestDeckCreate: TestDeckCreate
};