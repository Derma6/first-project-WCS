const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Wilder',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'text',
        },
        description: {
            type: 'text',
        },
    },
    relations: {
        grades: {
            type: 'one-to-many',
            target: 'Grade',
            inverseSide: 'wilder',
        },
    },
});
