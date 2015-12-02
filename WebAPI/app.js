/**
 * Created by jbush_000 on 11/18/2015.
 */"use strict";

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
var async = require('async');

var jwt = require('jsonwebtoken');
var config = require('./config');
var http = require('http');

app.use(cors());

// application routing
var router = express.Router();

var CardModel = require('./models/Card');
var GameModel = require('./models/Game');
var UserModel = require('./models/User');

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.use(morgan('dev'));

//Routes
router.post('/authenticate', function(req, res) {
    // find the user
    new UserModel.User({Username: req.body.username}).fetch().then(
        function(user) {
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                bcrypt.compare(req.body.password, user.get('PasswordHash'), function(err, res2) {
                    // res == true
                    // check if password matches
                    if (res2 == true) {
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, config.secret, {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    } else {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
});

router.get('/setup', function(req, res) {
    bcrypt.hash('password', 8, function(err, hash){
        if(err)
        {
            console.log(err);
        }
        var user = new UserModel.User({
            Username: 'Testing',
            PasswordHash: hash,
            Email: 'jbush6@gmail.com',
            JoinDate: new Date()
        });

        var user2 = new UserModel.User({
            Username: 'Testing2',
            PasswordHash: hash,
            Email: 'jbush6@gmail.com',
            JoinDate: new Date()
        });

        user.save().then(function(model) {
                res.json({success: true, model:model});
                console.log('User saved successfully');
            }
        ).catch(function(e) {
            console.log(e);
        });

        user2.save().then(function(model) {
                res.json({success: true, model:model});
                console.log('User saved successfully');
            }
        ).catch(function(e) {
            console.log(e);
        });


    });
});


router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


router.get('/users', function(req, res) {
    var users = new UserModel.Users();
        users.fetch().then(function(users) {
        res.json(users);
    });
});

router.get('/', function (req, res) {
    res.json({message: 'Hooray! Welcome to our api'});
});

router.get('/card/:id', function (req, res, next) {
    CardModel.Card.forge({id: req.params.id})
        .fetch({withRelated: ['specialAbilities']})
        .then(function (card) {
            if(!card) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: card.toJSON()});
            }
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/game/:id', function (req, res, next) {
    GameModel.Game.forge({id: req.params.id})
        .fetch({withRelated: ['GameBoard', {'Player1' : function(qb){ qb.column('id', 'Username')}}
        ]})
        .then(function (game){
            if(!game) {
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: game.toJSON()});
            }
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/game', function (req, res, next) {
    async.series([
        function (callback) {
            UserModel.User.forge({Username: 'Testing'})
                .fetch({columns: ['id', 'Username']}).then(function(model){
                    callback(null, model)
            });
        },
        function(callback) {
            UserModel.User.forge({Username: 'Testing2'})
                .fetch().then(function(model){
                callback(null, model)
            });
        },
        function(callback){
            new GameModel.GameBoard().save().then(function(model) {
                callback(null, model)
            });
        }
    ],
    function(err, results){
        var game = new GameModel.Game({Player1: results[0].get('id'), Player2: results[1].get('id'), BoardId: results[2].get('id')});
        game.save().then(function(model){
            res.json(model);
        })
        .catch(function(e){
            console.log(e);
        });
    });
});

router.get('/sixtycards', function (req, res, next) {
        GameModel.TestDeckCreate(1).then(function(id){
            GameModel.PlayerGameDeck.forge({id: id}).fetch({withRelated: ['DeckCards']}).then(function (cards) {
                res.json(cards);
            });
        });
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
    "use strict";
    console.log('Express server listening on port ' + server.address().port);
});






