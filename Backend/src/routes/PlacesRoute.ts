import { createPlaces, getPlaces } from "../Controllers/PlacesController.ts";
import express from "express";

export const placesRoute = express.Router();
//inserting all itiDetails in db

placesRoute.route("/createplaces/:pId").post(createPlaces);
placesRoute.route("/getplaces/:pId").get(getPlaces);
