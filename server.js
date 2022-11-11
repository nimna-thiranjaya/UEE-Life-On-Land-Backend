const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { connection } = require("./utils/dbConnection");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//@import Routes
const UserRouter = require("./routes/user.routes");
const OrganizationRouter = require("./routes/organization.routes");
const BlogRouter = require("./routes/blog.routes");
const NewsRouter = require("./routes/news.routes");
const PaymentRouter = require("./routes/payment.routes");
const ForestRouter = require("./routes/forest.routes");

//@Use Routes
app.use("/api/user/", UserRouter);
app.use("/api/organization/", OrganizationRouter);
app.use("/api/blog/", BlogRouter);
app.use("/api/news/", NewsRouter);
app.use("/api/payment/", PaymentRouter);
app.use("/api/forest/", ForestRouter);

//Create MongoDB connection and server configuration
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  try {
    return res.status(200).send({
      message:
        "Server is running on : https://life-on-land-backend.azurewebsites.net/",
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
  connection();
});
