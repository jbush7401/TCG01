/**
 * Created by jbush_000 on 11/18/2015.
 */
"use strict";

var bookshelf = require('../db').bookshelf;

var Card = bookshelf.Model.extend({
    tableName: 'Card',
    specialAbilities: function() {
        return this.belongsToMany(SpecialAbility, 'Card_SpecialAbility', 'CardId', 'SpecialAbilityId');
    },
    PlayerDecks : function() {
       return this.belongsTo(PlayerGameDeck, 'PlayerGameDeck_Card', 'CardId', 'PlayerGameDeckId')
    }
});

var SpecialAbility = bookshelf.Model.extend({
    tableName: 'SpecialAbility',
    cards: function() {
        return this.belongsToMany(Card, 'Card_SpecialAbility', 'SpecialAbilityId', 'CardId');
    }
});


//collections
var Cards = bookshelf.Collection.extend({
    model: Card
});

var SpecialAbilities = bookshelf.Collection.extend({
    model: SpecialAbility
});

module.exports = {
    Card: Card,
    SpecialAbility: SpecialAbility,
    Cards: Cards,
    SpecialAbilities: SpecialAbilities
};

