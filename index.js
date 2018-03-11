const express = require("express"),
  session = require("cookie-session"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  Sequelize = require("sequelize"),
  sqlite = require("sqlite3");
  const handlebars = require("express-handlebars").create({
    defaultLayout: "main"
  });

const models = require("./models");

const app = express();

app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

const users = require("./routes/users");
const posts = require("./routes/posts");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "NoOneInTheWorldEverGetsWhatTheyWantAndThatIsBeautiful"
  })
);

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/posts", posts);

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("Running on port " + port);
  });
});
