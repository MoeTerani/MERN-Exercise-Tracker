const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect mongoose

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log(`DB connection established`);
});

app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
