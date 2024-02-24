const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Counter = require("../models/Counter");
const mongoose = require("mongoose");
const validateInput = require("../validator/users");
const isEmpty = require("../validator/is-empty");
const filterId = require("../validator/filterId");

const Model = User;

const seq_key = "user_id";
const ObjectId = mongoose.Types.ObjectId;

router.get("/", (req, res) => {
  Model.find({})
    .then((records) => res.status(200).json(records))
    .catch((err) => res.status(400).json(err));
});

//Sign In using RFID
router.get("/uid/:id", (req, res) => {
  console.log(req.params.id);
  Model.findOne({ uid_key: req.params.id })
    .then((records) => res.status(200).json(records))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((records) => res.status(200).json(records))
    .catch((err) => res.status(400).json(err));
});

//Create Profile
router.put("/", (req, res) => {
  const body = filterId(req);

  Counter.increment(seq_key).then((result) => {
    const newRecord = new Model({
      ...body,
      [seq_key]: result.next,
    });

    newRecord
      .save()
      .then((record) => res.status(200).json(record))
      .catch((err) => res.status(400).json(err));
  });
});

//Edit Profile
router.post("/:id", (req, res) => {
  Model.findById(req.params.id).then((record) => {
    if (record) {
      const body = filterId(req);
      delete body.__v;

      record.set(body);

      record
        .save()
        .then((record) => res.status(200).json(record))
        .catch((err) => console.log(err));
    } else {
      console.log("ID not found");
    }
  });
});

//Delete user
router.delete("/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((record) => res.json({ success: 1 }))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
