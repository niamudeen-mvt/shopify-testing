import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import connectDb from "./utils/db.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/v1", router);

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});
