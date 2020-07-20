const exercisesRouter = require('./exercise');
const userRouter = require('./users');

import * as express from 'express';

let router = express.Router();

router.use('/exercises', exercisesRouter);
router.use('/users', userRouter);

export = router;
