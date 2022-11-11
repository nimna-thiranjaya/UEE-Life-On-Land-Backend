const Blog = require("../models/blog.model");

//Create and Save a new Blog
const CreateBlog = async (req, res) => {
  try {
    const LogedUser = req.logedUser;
    const { blogTittle, blogContent, blogImage } = req.body;

    const userObject = {
      _id: LogedUser._id,
      fullName: LogedUser.fullName,
      profileImage: LogedUser.profileImage,
      email: LogedUser.email,
    };
    const blog = new Blog({
      blogTittle: blogTittle,
      blogContent: blogContent,
      blogImage: blogImage,
      blogAuthor: userObject,
      createdUser: LogedUser._id,
    });
    const result = await blog.save();

    if (!result) {
      return res
        .status(400)
        .send({ status: false, message: "Blog not created" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "Blog created successfully" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Retrieve and return all blogs from the database.
const GetAllBlogsForUsers = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const LogedUserID = req.logedUser._id;

    if (blogs) {
      const approvedBlogs = blogs.filter((blog) => {
        return (
          blog.adminStatus === "Approved" ||
          (blog.createdUser == LogedUserID && blog.adminStatus === "Pending") ||
          (blog.createdUser == LogedUserID && blog.adminStatus === "Rejected")
        );
      });

      return res.status(200).send({
        status: true,
        message: "Blogs fetched successfully",
        blogs: approvedBlogs,
      });
    } else {
      return res.status(400).send({ status: false, message: "No blogs found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Find a single blog with a blogId
const GetBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (blog) {
      return res.status(200).send({
        status: true,
        message: "Blog fetched successfully",
        blog: blog,
      });
    } else {
      return res.status(400).send({ status: false, message: "Blog not found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Update a blog identified by the blogId in the request
const UpdateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { blogTittle, blogContent, blogImage } = req.body;
    const blog = await Blog.findById(blogId);
    if (blog) {
      const newData = {
        blogTittle,
        blogContent,
        blogImage,
        adminStatus: "Pending",
      };
      const result = await Blog.findByIdAndUpdate(blogId, newData);
      if (result) {
        return res
          .status(200)
          .send({ status: true, message: "Blog updated successfully" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Blog not updated" });
      }
    } else {
      return res.status(400).send({ status: false, message: "Blog not found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Delete a blog with the specified blogId in the request
const DeleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (blog) {
      const result = await Blog.findByIdAndDelete(blogId);
      if (result) {
        return res
          .status(200)
          .send({ status: true, message: "Blog deleted successfully" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Blog not deleted" });
      }
    } else {
      return res.status(400).send({ status: false, message: "Blog not found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Get All Blogs
const AdminGetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const approvedAndPendingBlogs = blogs.filter((blog) => {
      return blog.adminStatus === "Approved" || blog.adminStatus === "Pending";
    });
    if (blogs) {
      return res.status(200).send({
        status: true,
        message: "Blogs fetched successfully",
        blogs: approvedAndPendingBlogs,
      });
    } else {
      return res.status(400).send({ status: false, message: "No blogs found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Approve Blog
const AdminApproveBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (blog) {
      const newData = {
        adminStatus: "Approved",
      };
      const result = await Blog.findByIdAndUpdate(blogId, newData);
      if (result) {
        return res
          .status(200)
          .send({ status: true, message: "Blog approved successfully" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Blog not approved" });
      }
    } else {
      return res.status(400).send({ status: false, message: "Blog not found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Reject Blog
const AdminRejectBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (blog) {
      const newData = {
        adminStatus: "Rejected",
      };
      const result = await Blog.findByIdAndUpdate(blogId, newData);
      if (result) {
        return res
          .status(200)
          .send({ status: true, message: "Blog rejected successfully" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Blog rejection failed" });
      }
    } else {
      return res.status(400).send({ status: false, message: "Blog not found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  CreateBlog,
  GetAllBlogsForUsers,
  GetBlogById,
  UpdateBlog,
  DeleteBlog,
  AdminGetAllBlogs,
  AdminApproveBlog,
  AdminRejectBlog,
};
