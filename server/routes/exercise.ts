export {};
import * as express from 'express';
// const router: express.Router = express.Router();
const router = express.Router();
const Exercise = require('../models/exercise.model.js');

/* router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
}); */
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

router.delete('/:id', (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  Exercise.findByIdAndDelete(id)
    .then((Exercise: object) =>
      res
        .status(200)
        .json(`Exercise with the id:${id} was seccessfully deleted`)
    )
    .catch((err: Error) => {
      res.status(400).json('Error' + err);
    });
});

router.post('/update/:id', (req: express.Request, res: express.Response) => {
  console.log(req.body);
  const id = req.params.id;
  interface Exercise {
    [x: string]: any;
    userName: string;
    description: string;
    duration: number;
    date: number;
  }
  Exercise.findById(id)
    .then((exercise: Exercise) => {
      exercise.userName = req.body.userName;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() =>
          res.status(200).json(`Exercise with id: ${id} updated successfully`)
        )
        .catch((err: Error) => res.status(400).json('Error' + err.message));
    })
    .catch((err: Error) => res.status(500).json('Error' + err.message));
});

module.exports = router;
