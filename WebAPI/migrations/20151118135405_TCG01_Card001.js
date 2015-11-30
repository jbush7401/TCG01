exports.up = function(knex, Promise) {
    return Promise.all(knex.schema
        // <card>
        .createTableIfNotExists('Card', function (tbl) {
            tbl.increments().primary();
            tbl.string('Title', 50).unique().notNullable();
            tbl.integer('PowerCost');
            tbl.integer('PowerProvided');
            tbl.integer('Movement');
            tbl.integer('Attack');
            tbl.integer('Life');
            tbl.integer('Armor');
            tbl.string('Description', 100);
            tbl.string('CardArtUrl', 255);
        })
        .createTableIfNotExists('SpecialAbility', function(tbl) {
            tbl.increments().primary();
            tbl.string('Ability', 50);
            tbl.integer('PowerCost');
        })

        .createTableIfNotExists('Card_SpecialAbility', function(tbl) {
            tbl.increments().primary();
            tbl.integer('CardId').references('id').inTable('Card');
            tbl.integer('SpecialAbilityId').references('id').inTable('SpecialAbility');
        })
    );
};

exports.down = function(knex, Promise) {
    return Promise.all(knex.schema
        .dropTable('Card_SpecialAbility')
        .dropTable('Card')
        .dropTable('SpecialAbility'));

};
