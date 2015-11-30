/**
 * Created by jbush_000 on 11/21/2015.
 */
exports.seed = function (knex, Promise) {
    "use strict";
    var _ = require('lodash');
    var qry = require('../queries');
    var pCards =  knex('Card').select('id', 'Title');
    var pAbilities = knex('SpecialAbility').select('id', 'Ability');



    return Promise.all([pCards, pAbilities]).then(function (results) {
        var Cards = results[0];
        var Abilities = results[1];
        return {Cards: Cards, Abilities: Abilities};
    })
        .then(function(Tables){
            var Insert = [{Title: "Big Jonas", Ability: "Cleave"},
                {Title: "Big Jonas", Ability: "Spend 2 Power Gain 1 Armor"},
                {Title: "Crowen Ranger", Ability: "Overhead"},
            ];

            var Card_Abilities = [];
            _.each(Insert, function (item) {
                Card_Abilities.push({CardId: qry.CardIdFinder(Tables.Cards, item.Title), SpecialAbilityId: qry.AbilityIdFinder(Tables.Abilities, item.Ability)});
            });

            return knex.insert(Card_Abilities).into('Card_SpecialAbility');
        });
};
