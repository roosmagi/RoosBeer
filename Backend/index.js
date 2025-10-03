const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const beerRoutes = require("./routes/beers");
const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("RoosBeer API töötab");
});

app.use(authRoutes);
app.use(beerRoutes);
app.use('/uploads', express.static('uploads'));

sequelize
  .sync()
  .then(() => {
    app.listen(3002, () => {
      console.log("Server töötab pordil 3002");
    });
  })
  .catch((err) => {
    console.error("Viga andmebaasiga ühendamisel:", err);
  });
