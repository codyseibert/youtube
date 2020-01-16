const {
  createScenario
} = require('../persistence/createScenario');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const uuid = require('uuid/v4');
const path = require('path');

const cpUpload = upload.fields([
  { name: 'thumbnailA', maxCount: 1 },
  { name: 'thumbnailB', maxCount: 1 }
]);

exports.post = [
  cpUpload,
  async (req, res) => {
    const scenario = {
      id: uuid(),
      user: req.session.username,
      votes: [],
      thumbnailA: req.files.thumbnailA[0].path.replace(
        'public/',
        ''
      ),
      thumbnailB: req.files.thumbnailB[0].path.replace(
        'public/',
        ''
      )
    };

    await createScenario(scenario);

    res.redirect('/vote');
  }
];

exports.get = (req, res) => {
  res.render('layout', {
    locals: {
      title: 'Upload Thumbnails',
      session: req.session
    },
    partials: {
      content: path.join(
        __dirname,
        '../../views/index.html'
      )
    }
  });
};
