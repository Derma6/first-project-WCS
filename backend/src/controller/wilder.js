const dataSource = require('../utils').dataSource;
const Wilder = require('../entity/Wilder');
const Skill = require('../entity/Skill');

module.exports = {
    create: async (req, res) => {
        try {
            await dataSource.getRepository(Wilder).save(req.body);

            res.status(201).send('Created wilder');
        } catch (err) {
            res.send('Error while creating wilder', err);
        }
    },
    read: async (req, res) => {
        try {
            const data = await dataSource.getRepository(Wilder).find({
                relations: {
                    grades: {
                        skill: true,
                    },
                },
            });
            res.status(201).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            await dataSource
                .getRepository(Wilder)
                .update(req.query.id, req.body);

            res.send('Wilder updated !');
        } catch (err) {
            res.send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(Wilder)
                .delete({ id: req.query.id });

            console.log(data);
            if (data.affected == 0) {
                res.status(404).send('Wilder not found');
            } else {
                res.send('Wilder deleted!');
            }
        } catch (err) {
            res.send(err);
        }
    },
};
