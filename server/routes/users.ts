export {};
import * as express from 'express';
// const router: express.Router = express.Router();
const router = express.Router();
const User = require('../models/user.model.js');

router.get('/', (req: express.Request, res: express.Response) => {
  User.find()
    .then((users: object) => res.status(200).json(users))
    .catch((err: Error) => {
      res.status(400).json('Error' + err);
    });
});

router.post('/', (req: express.Request, res: express.Response) => {
  const userName: string = req.body.userName;

  const newUser = new User({ userName });

  newUser
    .save()
    .then(() => res.status(200).json('New user added successfully'))
    .catch((err: Error) => res.status(400).json('Error' + err.message));
});

module.exports = router;
