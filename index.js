const connectDB = require("./db");
connectDB.connectDB();

const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
const router = require("./Routes/router");
const userRouter = require("./Routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(router);
app.use(userRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
