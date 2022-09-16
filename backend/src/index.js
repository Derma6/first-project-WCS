const express = require('express');
var cors = require('cors');

const dataSource = require('./utils').dataSource;
const wilderController = require('./controller/wilder');
const skillController = require('./controller/skill');
const levelController = require('./controller/grade');

const app = express();
const port = 3001;

app.use(express.json(), cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/wilder', wilderController.read);
app.post('/api/wilder', wilderController.create);
app.put('/api/wilder?:id', wilderController.update);
app.delete('/api/wilder?:id', wilderController.delete);

app.post('/api/wilder/add-skill', levelController.addSkill);

app.get('/api/skill', skillController.read);
app.post('/api/skill', skillController.create);
app.put('/api/skill?:id', skillController.update);
app.delete('/api/skill?:id', skillController.delete);

app.use((req, res, next) => res.status(404).send('Sorry cant find that!'));

const start = async () => {
    await dataSource.initialize();
    app.listen(port, () => console.log(`App listening on port ${port}`));
};

start();
