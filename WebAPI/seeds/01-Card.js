
exports.seed = function(knex, Promise) {
    var specialAbilities = [
        {
            Ability: "Cleave", //0
            Description: "Attacks hit adjacent units on same rank as card attacked"
        },
        {
            Ability: "Charge", //1
            Description: "Can attack immediately upon being played"
        },
        {
            Ability: "Burst", //2
            Description: "Attacks through other cards until stopped"
        },
        {
            Ability: "Ranged", //3
            Description: "Can Attack from any rank"
        },
        {
            Ability: "Overhead", //4
            Description: "Can attack any unit in file"
        },
        {
            Ability: "Flying", //5
            Description: "Can ignore friendly units during movement"
        },
        {
            Ability: "Spend 2 Power Gain 1 Armor",
            Description: "Spend 2 Power Gain 1 Armor",
            PowerCost: 2
        }
    ];

    var cards = [ { //0
        Title: 'Big Jonas',
        PowerCost: 3,
        PowerProvided: 2,
        Movement: 1,
        Attack: 2,
        Life: 1,
        Armor: 1,
        Description: 'I stole and ate an apple pie without remorse',
        CardArtUrl: 'BigJonas.png'
    },
    { //1
        Title: 'Sacrificial Lamb',
        PowerCost: 1,
        PowerProvided: 1,
        Movement: 1,
        Attack: 0,
        Life: 1,
        Armor: 0,
        Description: '50% chance to destroy the attacking card',
        CardArtUrl: ''
    },
    { //2
        Title: 'Crowen Ranger',
        PowerCost: 3,
        PowerProvided: 1,
        Movement: 1,
        Attack: 2,
        Life: 2,
        Armor: 0,
        Description: '',
        CardArtUrl: ''
    }];



    return Promise.all([],
        knex('Card_SpecialAbility')
        .del().then(knex('SpecialAbility')
            .del().then(knex('Card')
                .del()
        ))).then(function () {
            return knex.insert(specialAbilities).into('SpecialAbility');
        }).then(function () {
            return knex.insert(cards).into('Card');
        });

};
