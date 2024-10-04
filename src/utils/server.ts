import express from "express";
import { json, urlencoded } from "body-parser";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import path from "path";

const app = express();
const httpServer = http.createServer(app);
// app.get('/', (req, res) => {
//   res.send('hello world');
// })
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "../../src/views"));
app
  .use(helmet())
  .use(cors())
  .use(
    json({
      limit: "20mb",
    }),
  )
  .use(
    urlencoded({
      extended: true,
      limit: "20mb",
    }),
  )
  .set("trust proxy", true);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log(`Running on port ${port}`));

export default app;