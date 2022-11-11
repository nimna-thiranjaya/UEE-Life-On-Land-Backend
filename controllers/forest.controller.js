const Forest = require("../models/forest.model");
const AnimalAndPlants = require("../models/animalAndPlants.model");

const CreateForest = async (req, res) => {
  try {
    const Loguser = req.logedUser;
    const { forestName, forestDetails, forestImage } = req.body;

    const forestNewData = {
      forestName,
      forestDetails,
      forestImage,
      createdUser: Loguser._id,
    };

    const result = await Forest.create(forestNewData);

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Forest Created Successfully" });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Forest Not Created" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const CreateAnimalAndPlants = async (req, res) => {
  try {
    const Loguser = req.logedUser;
    const forestID = req.params.forestID;
    const { name, details, imageUrl, type } = req.body;

    if (Loguser.role == "Admin") {
      const animalAndPlantsNewData = {
        name,
        details,
        imageUrl,
        type,
        createdUser: Loguser._id,
        forestID: forestID,
        adminStatus: "Approved",
      };

      const result = await AnimalAndPlants.create(animalAndPlantsNewData);

      if (result) {
        return res.status(200).send({
          status: true,
          message: "Animal And Plants Created Successfully",
          result,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Animal And Plants Not Created" });
      }
    } else if (Loguser.role == "User") {
      const animalAndPlantsNewData = {
        name,
        details,
        imageUrl,
        type,
        createdUser: Loguser._id,
        forestID: forestID,
        adminStatus: "Pending",
      };

      const result = await AnimalAndPlants.create(animalAndPlantsNewData);

      if (result) {
        return res.status(200).send({
          status: true,
          message: "Animal And Plants Created Successfully",
          result,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Animal And Plants Not Created" });
      }
    } else {
      return res
        .status(401)
        .send({ status: false, message: "Invalid User Role" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const GetAllPlantsInForest = async (req, res) => {
  try {
    const forestID = req.params.forestID;
    const Loguser = req.logedUser;

    const result = await AnimalAndPlants.find({
      forestID: forestID,
      type: "Plant",
    });

    const filterResult = result.filter((item) => {
      return (
        item.adminStatus === "Approved" ||
        (item.createdUser == Loguser._id && item.adminStatus === "Pending")
      );
    });

    if (result) {
      return res.status(200).send({
        status: true,
        message: "All Plants In Forest",
        plants: filterResult,
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "No Plants In Forest" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const GetAllAnimalsInForest = async (req, res) => {
  try {
    const forestID = req.params.forestID;
    const Loguser = req.logedUser;

    const result = await AnimalAndPlants.find({
      forestID: forestID,
      type: "Animal",
    });

    const filterResult = result.filter((item) => {
      return (
        item.adminStatus === "Approved" ||
        (item.createdUser === Loguser._id && item.adminStatus === "Pending")
      );
    });

    if (result) {
      return res.status(200).send({
        status: true,
        message: "All Animals In Forest",
        animals: filterResult,
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "No Animals In Forest" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Update Animal And Plants
const UpdateAnimalAndPlants = async (req, res) => {
  try {
    const animalAndPlantsID = req.params.animalAndPlantsID;
    const { name, details, imageUrl, type } = req.body;

    const result = await AnimalAndPlants.findByIdAndUpdate(
      { _id: animalAndPlantsID },
      {
        name,
        details,
        imageUrl,
        type,
      },
      { new: true }
    );

    if (result) {
      return res.status(200).send({
        status: true,
        message: "Animal or Plants Updated Successfully",
        result,
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Animal or Plants Not Updated" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Delete Forest
const DeleteForest = async (req, res) => {
  try {
    const forestID = req.params.forestID;

    const result = await Forest.findByIdAndDelete({ _id: forestID });

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Forest Deleted Successfully" });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Forest Not Deleted" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const UpdateForest = async (req, res) => {
  try {
    const forestID = req.params.forestID;
    const { forestName, forestDetails, forestImage } = req.body;

    const result = await Forest.findByIdAndUpdate(
      { _id: forestID },
      {
        forestName,
        forestDetails,
        forestImage,
      },
      { new: true }
    );

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Forest Updated Successfully" });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Forest Not Updated" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Get All Forests
const GetAllForests = async (req, res) => {
  try {
    const result = await Forest.find();

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "All Forests", forests: result });
    } else {
      return res.status(400).send({ status: false, message: "No Forests" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Get Forest By ID
const GetForestByID = async (req, res) => {
  try {
    const forestID = req.params.forestID;

    const result = await Forest.findById({ _id: forestID });

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Forest Fletch", forest: result });
    } else {
      return res.status(400).send({ status: false, message: "No Forest" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const DeleteAnimalPlans = async (req, res) => {
  try {
    const animalAndPlantsID = req.params.animalAndPlantsID;

    const result = await AnimalAndPlants.findByIdAndDelete({
      _id: animalAndPlantsID,
    });

    if (result) {
      return res.status(200).send({
        status: true,
        message: "Animal or Plants Deleted Successfully",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Animal or Plants Not Deleted",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const GetAnimalAndPlantsByID = async (req, res) => {
  try {
    const animalAndPlantsID = req.params.animalAndPlantsID;

    const result = await AnimalAndPlants.findById({ _id: animalAndPlantsID });

    if (result) {
      return res.status(200).send({
        status: true,
        message: "Animal or Plants",
        animalAndPlants: result,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "No Animal or Plants",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const AdminGetAllPlants = async (req, res) => {
  try {
    const forestID = req.params.forestID;
    const result = await AnimalAndPlants.find({
      type: "Plant",
      forestID: forestID,
    });

    if (result) {
      return res.status(200).send({
        status: true,
        message: "All Plants",
        plants: result,
      });
    } else {
      return res.status(400).send({ status: false, message: "No Plants" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const AdminGetAllAnimals = async (req, res) => {
  try {
    const forestID = req.params.forestID;
    const result = await AnimalAndPlants.find({
      type: "Animal",
      forestID: forestID,
    });

    if (result) {
      return res.status(200).send({
        status: true,
        message: "All Animals",
        animals: result,
      });
    } else {
      return res.status(400).send({ status: false, message: "No Animals" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const AdminApprove = async (req, res) => {
  try {
    const animalPlantID = req.params.animalPlantID;

    const result = await AnimalAndPlants.findByIdAndUpdate(
      { _id: animalPlantID },
      { adminStatus: "Approved" },
      { new: true }
    );

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Forest Approved Successfully" });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Forest Not Approved" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const AdminReject = async (req, res) => {
  try {
    const animalPlantID = req.params.animalPlantID;

    const result = await AnimalAndPlants.findByIdAndDelete(animalPlantID);

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Forest Rejected Successfully" });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Forest Not Rejected" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  CreateForest,
  CreateAnimalAndPlants,
  GetAllPlantsInForest,
  GetAllAnimalsInForest,
  UpdateAnimalAndPlants,
  DeleteForest,
  UpdateForest,
  GetAllForests,
  GetForestByID,
  DeleteAnimalPlans,
  GetAnimalAndPlantsByID,
  AdminGetAllPlants,
  AdminGetAllAnimals,
  AdminApprove,
  AdminReject,
};
