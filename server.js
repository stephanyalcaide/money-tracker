//server js beging code
const exxpress = require("express");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(exxpress.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI ||
mongoose.connect(MONGODB_URI);



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});