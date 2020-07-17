"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
// const router: express.Router = express.Router();
var router = express.Router();
var Exercise = require('../models/exercise.model.js');
router.get('/', function (req, res) {
    Exercise.find()
        .then(function (Exercise) { return res.status(200).json(Exercise); })
        .catch(function (err) {
        res.status(400).json('Error' + err);
    });
});
router.post('/', function (req, res) {
    var userName = req.body.userName;
    var description = req.body.description;
    var duration = Number(req.body.duration);
    var date = Date.parse(req.body.date);
    var newExercise = new Exercise({
        userName: userName,
        description: description,
        duration: duration,
        date: date,
    });
    newExercise
        .save()
        .then(function () { return res.status(200).json('New Exercise added successfully'); })
        .catch(function (err) { return res.status(400).json('Error' + err.message); });
});
router.get('/:id', function (req, res) {
    var id = req.params.id;
    Exercise.findById(id)
        .then(function (Exercise) { return res.status(200).json(Exercise); })
        .catch(function (err) {
        res.status(400).json('Error' + err);
    });
});
module.exports = router;
