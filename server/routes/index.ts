const exercisesRouter = require('./exercise');
const userRouter = require('./users');

// module.exports = require('./users');
// module.exports = require('./exercise');

import * as express from 'express';

// import sub-routers
// import * as exercisesRouter from './exercise';
// import * as userRouter from './users';

let router = express.Router();

// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);

router.use('/exercises', exercisesRouter);
router.use('/users', userRouter);

// Export the router
export = router;
