const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
const upload = require("./routes/api/images");
const routes = require("./routes");
const bodyParser = require("body-parser");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/photocontestdb", { useNewUrlParser: true })
//   .then(() => console.log("Mongo Db successfully connected "))
//   .catch(err => console.log(err));

mongoose.connect(process.env.MONGODB_URI || "mongodb://photosdb:password1@ds041546.mlab.com:41546/heroku_l1n7xq0g", { useNewUrlParser: true })
  .then(() => console.log("Mongo Db successfully connected "))
  .catch(err => console.log(err));

//Passport middleware 
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//passport Config
//require("./config/passport")(passport);

//Routes 
app.use("/api/images",upload);
app.use(routes);
// app.use("/", routes)

// Send every other request to the React app Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
