export {};
import * as express from 'express';
// const router: express.Router = express.Router();
const router = express.Router();
const Exercise = require('../models/exercise.model.js');

router.get('/', (req: express.Request, res: express.Response) => {
  Exercise.find()
    .then((Exercise: object) => res.status(200).json(Exercise))
    .catch((err: Error) => {
      res.status(400).json('Error' + err);
    });
});

router.post('/', (req: express.Request, res: express.Response) => {
  const userName: string = req.body.userName;
  const description: string = req.body.description;
  const duration: number = Number(req.body.duration);
  const date: number = Date.parse(req.body.date);

  const newExercise = new Exercise({
    userName,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.status(200).json('New Exercise added successfully'))
    .catch((err: Error) => res.status(400).json('Error' + err.message));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((Exercise: object) => res.status(200).json(Exercise))
    .catch((err: Error) => {
      res.status(400).json('Error' + err);
    });
});

module.exports = router;
