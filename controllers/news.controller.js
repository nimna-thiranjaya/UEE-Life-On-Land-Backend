const News = require("../models/news.model");

//Get time Difference for news published
const timeDifference = (current, previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " sec ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " min ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return +Math.round(elapsed / msPerYear) + " years ago";
  }
};

//Create and Save a new News
const CreateNews = async (req, res) => {
  try {
    const LogedUser = req.logedUser;
    const { newsTittle, newsContent, newsImage } = req.body;

    const userObject = {
      _id: LogedUser._id,
      fullName: LogedUser.fullName,
      profileImage: LogedUser.profileImage,
      email: LogedUser.email,
    };
    const news = new News({
      newsTittle: newsTittle,
      newsContent: newsContent,
      newsImage: newsImage,
      newsAuthor: userObject,
      createdUser: LogedUser._id,
    });
    const result = await news.save();

    if (!result) {
      return res
        .status(400)
        .send({ status: false, message: "News not created" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "News created successfully" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Retrieve and return all news from the database.
const GetAllNewsForUsers = async (req, res) => {
  try {
    const news = await News.find();
    const LogedUserID = req.logedUser._id;

    if (news) {
      const approvedNews = news.filter((news) => {
        return (
          news.adminStatus === "Approved" ||
          (news.createdUser == LogedUserID && news.adminStatus === "Pending") ||
          (news.createdUser == LogedUserID && news.adminStatus === "Rejected")
        );
      });

      const newsWithTimeDifference = approvedNews.map((news) => {
        const timeDiff = timeDifference(new Date(), news.updatedAt);
        return { ...news._doc, timeDiff: timeDiff };
      });

      return res.status(200).send({
        status: true,
        message: "News fetched successfully",
        news: newsWithTimeDifference,
      });
    } else {
      return res.status(400).send({ status: false, message: "No news found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Find a single news with a newsId
const GetNewsById = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(400).send({ status: false, message: "News not found" });
    } else {
      return res.status(200).send({
        status: true,
        message: "News fetched successfully",
        news: news,
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Update a news identified by the newsId in the request
const UpdateNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const { newsTittle, newsContent, newsImage } = req.body;

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(400).send({ status: false, message: "News not found" });
    } else {
      const newData = {
        newsTittle,
        newsContent,
        newsImage,
        adminStatus: "Pending",
      };

      const result = await News.findByIdAndUpdate(newsId, newData);

      if (!result) {
        return res
          .status(400)
          .send({ status: false, message: "News not updated" });
      } else {
        return res
          .status(200)
          .send({ status: true, message: "News updated successfully" });
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Delete a news with the specified newsId in the request
const DeleteNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(400).send({ status: false, message: "News not found" });
    } else {
      const result = await News.findByIdAndDelete(newsId);

      if (!result) {
        return res
          .status(400)
          .send({ status: false, message: "News not deleted" });
      } else {
        return res
          .status(200)
          .send({ status: true, message: "News deleted successfully" });
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin get all news
const AdminGetAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ updatedAt: -1 });
    const approvedAndPendingNews = news.filter((news) => {
      return news.adminStatus === "Approved" || news.adminStatus === "Pending";
    });

    const newsWithTimeDifference = approvedAndPendingNews.map((news) => {
      const timeDiff = timeDifference(new Date(), news.updatedAt);
      return { ...news._doc, timeDiff: timeDiff };
    });

    if (news) {
      return res.status(200).send({
        status: true,
        message: "News fetched successfully",
        news: newsWithTimeDifference,
      });
    } else {
      return res.status(400).send({ status: false, message: "No news found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Approve news
const AdminApproveNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(400).send({ status: false, message: "News not found" });
    } else {
      const newData = {
        adminStatus: "Approved",
      };

      const result = await News.findByIdAndUpdate(newsId, newData);

      if (!result) {
        return res
          .status(400)
          .send({ status: false, message: "News not approved" });
      } else {
        return res
          .status(200)
          .send({ status: true, message: "News approved successfully" });
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Reject news
const AdminRejectNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(400).send({ status: false, message: "News not found" });
    } else {
      const newData = {
        adminStatus: "Rejected",
      };

      const result = await News.findByIdAndUpdate(newsId, newData);

      if (!result) {
        return res
          .status(400)
          .send({ status: false, message: "News not rejected" });
      } else {
        return res
          .status(200)
          .send({ status: true, message: "News rejected successfully" });
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  CreateNews,
  GetAllNewsForUsers,
  GetNewsById,
  UpdateNews,
  DeleteNews,
  AdminGetAllNews,
  AdminApproveNews,
  AdminRejectNews,
};
