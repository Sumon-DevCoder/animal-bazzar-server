import express from "express";
const app = express();
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

// parser
app.use(express.json());
// app.use(express.urlencoded());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   })
// );

app.use(cors());

// application route
app.use("/api", router);

// route
app.get("/", (req, res) => {
  res.send("meeting room booking server is running...");
});

// global error handler
app.use(globalErrorHandler);
// route not found
app.use(notFound);

export default app;
