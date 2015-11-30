
exports.up = function(knex, Promise) {
  return knex.schema
      .createTableIfNotExists('User', function (tbl){
          "use strict";
          tbl.increments().primary();
          tbl.string('Username', 50).unique().notNullable();
          tbl.string('PasswordHash', 255).notNullable();
          tbl.string('Email', 100);
          tbl.date('JoinDate');
          tbl.dateTime('LastLogin');

      })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('User');
};
