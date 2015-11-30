
exports.up = function(knex, Promise) {
    return knex.schema
        .table('SpecialAbility', function (table) {
        table.string('Description');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .table('SpecialAbility', function (table) {
            table.dropColumn('Description');
        })
};
