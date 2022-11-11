const express = require("express");
const BlogRouter = express.Router();

const {
  CreateBlog,
  GetAllBlogsForUsers,
  GetBlogById,
  UpdateBlog,
  DeleteBlog,
  AdminGetAllBlogs,
  AdminApproveBlog,
  AdminRejectBlog,
} = require("../controllers/blog.controller");
const userAuth = require("../middlewares/user.middleware");

BlogRouter.post("/createblog", userAuth, CreateBlog);
BlogRouter.get("/getAllApprovedBlog", userAuth, GetAllBlogsForUsers);
BlogRouter.get("/getOneBlog/:blogId", GetBlogById);
BlogRouter.patch("/updateBlog/:blogId", UpdateBlog);
BlogRouter.delete("/deleteBlog/:blogId", DeleteBlog);
BlogRouter.get("/adminGetAllBlog", AdminGetAllBlogs);
BlogRouter.patch("/adminApproveBlog/:blogId", AdminApproveBlog);
BlogRouter.patch("/adminRejectBlog/:blogId", AdminRejectBlog);

module.exports = BlogRouter;
