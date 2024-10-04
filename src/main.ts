// tslint:disable-next-line: no-var-requires
require("dotenv").config();

import { app } from "./utils";
import router from "./router";

(async function () {
  router(app);
})();