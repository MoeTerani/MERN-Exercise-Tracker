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
var User = require('../models/user.model.js');
router.get('/', function (req, res) {
    User.find()
        .then(function (users) { return res.status(200).json(users); })
        .catch(function (err) {
        res.status(400).json('Error' + err);
    });
});
router.post('/', function (req, res) {
    var userName = req.body.userName;
    var newUser = new User({ userName: userName });
    newUser
        .save()
        .then(function () { return res.status(200).json('New user added successfully'); })
        .catch(function (err) { return res.status(400).json('Error' + err.message); });
});
module.exports = router;
