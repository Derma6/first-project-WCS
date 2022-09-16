const dataSource = require('../utils').dataSource;
const Skill = require('../entity/Skill');

module.exports = {
    create: async (req, res) => {
        try {
            await dataSource.getRepository(Skill).save(req.body);
            res.status(201).send('Created Skill');
        } catch (err) {
            if (err.errno === 19) {
                res.send(
                    'This skill already exist. The name should be unique.'
                );
                return;
            }

            res.send(err);
        }
    },
    read: async (req, res) => {
        try {
            const data = await dataSource.getRepository(Skill).find();
            res.status(201).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            await dataSource
                .getRepository(Skill)
                .update(req.query.id, req.body);

            res.send('Skill updated !');
        } catch (err) {
            res.send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(Skill)
                .delete(req.query.id);

            if (data.affected == 0) {
                res.status(404).send('Skill not found');
            } else {
                res.send('Skill deleted!');
            }
        } catch (err) {
            res.send(err);
        }
    },
};
