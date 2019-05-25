const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", require("./routes/api/reglogin"));
app.use("/user", require("./routes/api/user"));
app.use("/product", require("./routes/api/product"));

app.use((req, res) => {
  res.send("you have typed something wrong");
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`server start at ${PORT}`);
  }
});
