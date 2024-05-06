const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db");

const rootRouter = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin:process.env.URI, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
