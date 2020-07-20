"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var exercisesRouter = require('./exercise');
var userRouter = require('./users');
// module.exports = require('./users');
// module.exports = require('./exercise');
var express = __importStar(require("express"));
// import sub-routers
// import * as exercisesRouter from './exercise';
// import * as userRouter from './users';
var router = express.Router();
// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);
router.use('/exercises', exercisesRouter);
router.use('/users', userRouter);
module.exports = router;
