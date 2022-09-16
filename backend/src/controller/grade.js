const dataSource = require('../utils').dataSource;

const Wilder = require('../entity/Wilder');
const Skill = require('../entity/Skill');
const Grade = require('../entity/Grade');

module.exports = {
    addSkill: async (req, res) => {
        console.log('req', req.body);

        req.body.map(async (data) => {
            try {
                const wilder = await dataSource
                    .getRepository(Wilder)
                    .findOneBy({ name: data.name });

                console.log(wilder);
                const skill = await dataSource
                    .getRepository(Skill)
                    .findOneBy({ name: data.skill });

                await dataSource.getRepository(Grade).save({
                    wilder,
                    skill,
                    level: parseInt(data.grade),
                });
            } catch (err) {
                console.log(err);
                // errorState = true;

                res.send('error while adding to wilder');
            }
        });
        // if (errorState === false) {
        res.send('Skill added to wilder');
        // }
    },
};
