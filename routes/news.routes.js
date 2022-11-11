const express = require("express");
const NewsRouter = express.Router();

const {
  CreateNews,
  GetAllNewsForUsers,
  GetNewsById,
  UpdateNews,
  DeleteNews,
  AdminGetAllNews,
  AdminApproveNews,
  AdminRejectNews,
} = require("../controllers/news.controller");

const userAuth = require("../middlewares/user.middleware");

NewsRouter.post("/createNews", userAuth, CreateNews);
NewsRouter.get("/getAllApprovedNews", userAuth, GetAllNewsForUsers);
NewsRouter.get("/getOneNews/:newsId", GetNewsById);
NewsRouter.patch("/updateNews/:newsId", UpdateNews);
NewsRouter.delete("/deleteNews/:newsId", DeleteNews);
NewsRouter.get("/adminGetAllNews", AdminGetAllNews);
NewsRouter.patch("/adminApproveNews/:newsId", AdminApproveNews);
NewsRouter.patch("/adminRejectNews/:newsId", AdminRejectNews);

module.exports = NewsRouter;
