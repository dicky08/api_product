const express = require("express");
const aps = express();
const bodyParser = require("body-parser");
const productRoute = require("./src/routes/product");
const categoryRoute = require("./src/routes/category");
const historyRoute = require("./src/routes/history");
const cors = require("cors");
const opt = require("./src/helper/cors");
const { PORT } = require("./src/helper/env");
const { static } = require("express");

aps.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
aps.use(bodyParser.json());
aps.use(cors(opt));

aps.use("/product", productRoute);
aps.use("/category", categoryRoute);
aps.use("/history", historyRoute);
aps.use(express.static("src/img"));

aps.listen(PORT, () => {
  console.log(`run PORT ${PORT}`);
});
