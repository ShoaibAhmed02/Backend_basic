const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
//** Database Connection **//
mongoose
  .connect("mongodb://0.0.0.0:27017/projet_template")
  .then(() => {
    console.log("Connected to MONGO :-( ");
  })
  .catch((err) => console.log("connection Failed! error is : ", err))



const router = require("./Route/routes");
app.use(router);

//listening the port of
app.listen(3000, () => {
  console.log(`listening on the port :`);
});
