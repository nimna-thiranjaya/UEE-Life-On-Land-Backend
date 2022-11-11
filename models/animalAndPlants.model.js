const mongoose = require("mongoose");

const animalAndPlantsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    details: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    createdUser: {
      type: String,
      trim: true,
      required: true,
    },

    adminStatus: {
      type: String,
      required: true,
    },

    forestID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AnimalAndPlants = mongoose.model(
  "AnimalAndPlants",
  animalAndPlantsSchema
);
module.exports = AnimalAndPlants;
