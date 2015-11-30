
exports.up = function(knex, Promise) {
    return Promise.all(knex.schema

        .createTableIfNotExists('PlayerGameDeck', function(tbl) {
            tbl.increments().primary();
        })

        .createTableIfNotExists('PlayerGameDeck_Card', function(tbl){
            tbl.increments().primary();
            tbl.integer('PlayerGameDeckId').references('id').inTable('PlayerGameDeck');
            tbl.integer('CardId').references('id').inTable('Card');
        })

        .createTableIfNotExists('PlayerHand', function(tbl) {
            tbl.increments().primary();
        })

        .createTableIfNotExists('PlayerHand_Card', function(tbl){
            tbl.increments().primary();
            tbl.integer('PlayerHandId').references('id').inTable('PlayerHand');
            tbl.integer('CardId').references('id').inTable('Card');
        })

        .createTableIfNotExists('GameBoard', function(tbl){
            tbl.increments().primary();
            tbl.integer('P1_Card_1_1').references('id').inTable('Card');
            tbl.integer('P1_Card_1_2').references('id').inTable('Card');
            tbl.integer('P1_Card_1_3').references('id').inTable('Card');
            tbl.integer('P1_Card_1_4').references('id').inTable('Card');
            tbl.integer('P1_Card_1_5').references('id').inTable('Card');
            tbl.integer('P1_Card_2_1').references('id').inTable('Card');
            tbl.integer('P1_Card_2_2').references('id').inTable('Card');
            tbl.integer('P1_Card_2_3').references('id').inTable('Card');
            tbl.integer('P1_Card_2_4').references('id').inTable('Card');
            tbl.integer('P1_Card_2_5').references('id').inTable('Card');
            tbl.integer('P1_Card_3_1').references('id').inTable('Card');
            tbl.integer('P1_Card_3_2').references('id').inTable('Card');
            tbl.integer('P1_Card_3_3').references('id').inTable('Card');
            tbl.integer('P1_Card_3_4').references('id').inTable('Card');
            tbl.integer('P1_Card_3_5').references('id').inTable('Card');

            tbl.integer('P2_Card_1_1').references('id').inTable('Card');
            tbl.integer('P2_Card_1_2').references('id').inTable('Card');
            tbl.integer('P2_Card_1_3').references('id').inTable('Card');
            tbl.integer('P2_Card_1_4').references('id').inTable('Card');
            tbl.integer('P2_Card_1_5').references('id').inTable('Card');
            tbl.integer('P2_Card_2_1').references('id').inTable('Card');
            tbl.integer('P2_Card_2_2').references('id').inTable('Card');
            tbl.integer('P2_Card_2_3').references('id').inTable('Card');
            tbl.integer('P2_Card_2_4').references('id').inTable('Card');
            tbl.integer('P2_Card_2_5').references('id').inTable('Card');
            tbl.integer('P2_Card_3_1').references('id').inTable('Card');
            tbl.integer('P2_Card_3_2').references('id').inTable('Card');
            tbl.integer('P2_Card_3_3').references('id').inTable('Card');
            tbl.integer('P2_Card_3_4').references('id').inTable('Card');
            tbl.integer('P2_Card_3_5').references('id').inTable('Card');

            tbl.integer('P1_Card_Hero').references('id').inTable('Card');
            tbl.integer('P2_Card_Hero').references('id').inTable('Card');

            tbl.integer('P1_Card_Item').references('id').inTable('Card');
            tbl.integer('P2_Card_Item').references('id').inTable('Card');

            tbl.integer('P1_Card_Rank2_Special').references('id').inTable('Card');
            tbl.integer('P1_Card_Rank3_Special').references('id').inTable('Card');
            tbl.integer('P2_Card_Rank2_Special').references('id').inTable('Card');
            tbl.integer('P2_Card_Rank3_Special').references('id').inTable('Card');
        })

        .createTableIfNotExists('Game', function (tbl) {
            tbl.increments().primary();
            tbl.dateTime('GameStart');
            tbl.integer('Player1').references('id').inTable('User');
            tbl.integer('Player2').references('id').inTable('User');
            tbl.integer('BoardId').references('id').inTable('GameBoard');
            tbl.integer('P1_Deck').references('id').inTable('PlayerGameDeck');
            tbl.integer('P2_Deck').references('id').inTable('PlayerGameDeck');
        })
    );
};

exports.down = function(knex, Promise) {
    return Promise.all(knex.schema
        .dropTable('PlayerGameDeck_Card')
        .dropTable('PlayerHand_Card')
        .dropTable('Game')
        .dropTable('GameBoard')
        .dropTable('PlayerGameDeck')
        .dropTable('PlayerHand'));


};
