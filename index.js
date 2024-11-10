let express = require("express");
require("dotenv").config();
let cors = require("cors");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let mongoose = require("mongoose");


let helmet = require("helmet");
let toobusy = require("toobusy-js");
let rateLimit = require("express-rate-limit");


let app = express();
//app.use(fileUpload()); 
//import Routes
let AdmindRouter = require("./routes/Admin.Routes");
let RoleRouter = require("./routes/Role.Routes");
let CategorieRouter = require("./routes/Categorie.Routes");
let ClientRouter = require("./routes/Client.Routes");
let PhotoProfilRouter = require("./routes/uploadPhotoProfil.Routes");
let ArtisonRouter = require("./routes/Artison.Routes");

let AbonnementUrgentRouter = require("./routes/AbonnementUrgent.Routes");
let AbonnementAlbumeRouter = require("./routes/AbonnementAlbume.Routes");
let DemandeUrgentRouter = require("./routes/DemandeUrgent.Routes");
let ImageGallery = require("./routes/uploadGallery.Routes");
let Config = require("./utils/Configuration");
//connection with MongoDB
let URI = Config.mongo_db;

mongoose.set("strictQuery", true);
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  },

  (error) => {
    let db = mongoose.connection;
    if (error) {
      db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } else {
      console.log("Connect to Mongo DB ");
    }
  }
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
    contentSecurityPolicy: false,
    xDownloadOptions: false,
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);
let rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 300000, // maximum number of request inside a window
  message: "You have exceeded the 300000 requests in 24 hrs limit!", // the message when they exceed limit
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, "Server too busy!");
  } else {
    next();
  }
});
app.use(express.json({ limit: "1000kb" }));
app.use(rateLimiter);
app.use(
  cors({
    origin: "*",
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "500kb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(
  "/api/upload/photo_profil",
  express.static(__dirname + "/upload/photo_profil")
);
app.use(express.static("/upload/photo_profil"));

app.use("/api/upload/gallery", express.static(__dirname + "/upload/gallery"));
app.use(express.static("/upload/gallery"));

app.use("/api", AdmindRouter);
app.use("/api", RoleRouter);
app.use("/api", CategorieRouter);
app.use("/api", ClientRouter);
app.use("/api", ArtisonRouter);
app.use("/api", AbonnementUrgentRouter);
app.use("/api", AbonnementAlbumeRouter);
app.use("/api", DemandeUrgentRouter);

//routes images
app.use("/api", PhotoProfilRouter);
app.use("/api", ImageGallery);

module.exports = app;
