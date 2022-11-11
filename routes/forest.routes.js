const express = require("express");
const ForestRouter = express.Router();

const {
  CreateForest,
  CreateAnimalAndPlants,
  GetAllPlantsInForest,
  GetAllAnimalsInForest,
  UpdateAnimalAndPlants,
  DeleteForest,
  UpdateForest,
  GetForestByID,
  GetAllForests,
  DeleteAnimalPlans,
  GetAnimalAndPlantsByID,
  AdminGetAllPlants,
  AdminGetAllAnimals,
  AdminApprove,
  AdminReject,
} = require("../controllers/forest.controller");
const userAuth = require("../middlewares/user.middleware");

//Forest Routes
ForestRouter.post("/createForest", userAuth, CreateForest);
ForestRouter.delete("/deleteForest/:forestID", DeleteForest);
ForestRouter.patch("/updateForest/:forestID", UpdateForest);
ForestRouter.get("/getAllForests", GetAllForests);
ForestRouter.get("/getForestByID/:forestID", GetForestByID);

//Animal And Plants
ForestRouter.post(
  "/createAnimalAndPlants/:forestID",
  userAuth,
  CreateAnimalAndPlants
);
ForestRouter.get(
  "/getAllPlantsInForest/forestID",
  userAuth,
  GetAllPlantsInForest
);
ForestRouter.get(
  "/getAllAnimalsInForest/forestID",
  userAuth,
  GetAllAnimalsInForest
);

ForestRouter.patch("/updateAnimalPlans/:forestID", UpdateAnimalAndPlants);
ForestRouter.delete("/deleteAnimalPlans/:animalPlantID", DeleteAnimalPlans);
ForestRouter.get(
  "/getAnimalAndPlantsByID/:animalPlantID",
  GetAnimalAndPlantsByID
);
ForestRouter.get("/adminGetAllPlants/:forestID", AdminGetAllPlants);
ForestRouter.get("/adminGetAllAnimals/:forestID", AdminGetAllAnimals);
ForestRouter.patch("/adminApprove/:animalPlantID", AdminApprove);
ForestRouter.patch("/adminReject/:animalPlantID", AdminReject);

module.exports = ForestRouter;
