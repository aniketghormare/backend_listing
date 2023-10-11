const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
var corOptions = {
  origin: "https://localhost:8081",
};
// middlewares
// app.use(cors(corOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

const buyrouter = require("./routes/BuyRoute.js");
app.use("/api/buy", buyrouter);

const rentrouter = require("./routes/RentRoute.js");
app.use("/api/rent", rentrouter);

const auctionrouter = require("./routes/AuctionRoute.js");
app.use("/api/auction", auctionrouter);

const tenderrouter = require("./routes/TenderRoute.js");
app.use("/api/tender", tenderrouter);

const jobrouter = require("./routes/JobRoute.js");
app.use("/api/job", jobrouter);

const registerrouter = require("./routes/RegisterRoute.js");
app.use("/api/register", registerrouter);

const buycartrouter = require("./routes/BuyCart.js");
app.use("/api/buycart", buycartrouter);

const rentcartrouter = require("./routes/RentCart.js");
app.use("/api/rentcart", rentcartrouter);

app.get("/", (req, res) => {
  res.json({ msg: "getting data" });
});

app.listen(PORT, (req, res) => {
  console.log(`server is connected at port ${PORT}`);
});
