const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

app.use(bodyParser.json());

const {
  getScenariosHandlerFactory
} = require('./handlers/getScenariosHandlerFactory');

const {
  getScenariosInteractor
} = require('./interactor/scenarios/getScenariosInteractor.js');

const {
  createScenarioInteractor
} = require('./interactor/scenarios/createScenarioInteractor.js');

const {
  createScenarioHandlerFactory
} = require('./handlers/createScenarioHandlerFactory.js');

const {
  getScenarios
} = require('./persistence/scenarios/getScenarios.js');

const {
  createScenario
} = require('./persistence/scenarios/createScenario.js');

const { index } = require('./views/index');
const { uploads } = require('./views/uploads');

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(index());
});

const thumbnailUploadMiddleware = upload.fields([
  { name: 'thumbnailA', maxCount: 1 },
  { name: 'thumbnailB', maxCount: 1 }
]);

app.post(
  '/upload',
  thumbnailUploadMiddleware,
  (req, res) => {
    const { thumbnailA, thumbnailB } = req.files;
    const { title } = req.body;
    createScenarioInteractor({
      createScenario,
      scenario: {
        title,
        subjects: [
          {
            path: thumbnailA[0].path
          },
          {
            path: thumbnailB[0].path
          }
        ]
      }
    });
    createScenarioHandlerFactory({
      createScenarioInteractor,
      createScenario
    });

    res.set('Content-Type', 'text/html');
    res.send(
      uploads({
        pathA: thumbnailA[0].path,
        pathB: thumbnailB[0].path
      })
    );
  }
);

app.get(
  '/scenarios',
  getScenariosHandlerFactory({
    getScenariosInteractor,
    getScenarios
  })
);

app.post(
  '/scenarios',
  createScenarioHandlerFactory({
    createScenarioInteractor,
    createScenario
  })
);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
