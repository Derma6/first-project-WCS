const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Grade',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        level: {
            type: 'int',
        },
    },
    relations: {
        wilder: {
            type: 'many-to-one',
            target: 'Wilder',
        },
        skill: {
            type: 'many-to-one',
            target: 'Skill',
        },
    },
});
