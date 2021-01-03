const express = require('express');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: 'us-east-2',
})
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/get-signed-url', async (req, res) => {
  await s3.createPresignedPost({
    Fields: {
      key: uuidv4(),
    },
    Conditions: [
      ["starts-with", "$Content-Type", "image/"],
      ["content-length-range", 0, 1000000],
    ],
    Expires: 30,
    Bucket: 'cody-awesome-bucket',
  }, (err, signed) => {
    res.json(signed);
  });
})

app.listen(8080);