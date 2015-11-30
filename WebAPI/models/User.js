/**
 * Created by jbush_000 on 11/27/2015.
 */

"use strict";

var bookshelf = require('../db').bookshelf;

var User = bookshelf.Model.extend({
    tableName: 'User'
});
var Users = bookshelf.Collection.extend({
    model: User
});


module.exports = {
    User: User,
    Users: Users
};