/**
 * Created by jbush_000 on 11/18/2015.
 */
"use strict";
var Card = require('../models/Card');

var getCard = function (req, res) {
    var cardId = req.params.id;
    new Card().where('id', cardId)
        .fetch()
        .then(function (card) {
            res.json(card);
        }).catch(function (error) {
        console.log(error);
        res.send('Card get failed');
    });
};

module.exports = {
    getCard: getCard
};