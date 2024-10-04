import express from "express";
import {getAllBikes, searchBike } from './controller/bikesController'
import { ErrorHandle } from "./utils";

export default async function (app) {
  const router = express.Router()
  router.get('/', getAllBikes);
  router.post('/', searchBike);
  app.use("/", router).use(ErrorHandle);
  return app;
}