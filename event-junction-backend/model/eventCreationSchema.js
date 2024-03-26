const express = require("express");
const mongoose = require("mongoose");

const eventCreationSchema = mongoose.Schema({
  eventTitle: {
    type: String,
    require: true,
  },
  eventThumbnail: {
    type: String,
    require: true,
  },
  eventType: {
    type: String,
    require: true,
  },
  swagItems: {
    type: [String],
  },
  dates: {
    type: [String],
    require: true,
  },
  times: {
    type: [String],
    require: true,
  },
  venue: {
    type: String,
    require: true,
  },
  speaker: {
    type: [String],
    require: true,
  },
  eventDetails: {
    type: String,
  },

  organizer: {
    type: String,
  },

  // orgThumbnail: {
  //   type: [
  //     {
  //       filename: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  // },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club-Admin",
    required: true,
  },
});

const EndEvent = mongoose.model("EventDetail", eventCreationSchema);
module.exports = { EndEvent };
