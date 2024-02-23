import { Request, Response } from "express";
import { AllItiDetails } from "../../types";
import { allItiDetailsModel } from "../Db/Models/itiInfoDetails/allItiDetails.model";
import { UserItineraryModel } from "../Db/Models/itineraries.model";

export async function insertAllItiDetails(req: Request, res: Response) {
  try {
    const xData = req.body;

    const xParams = req.params;
    if (xData.length !== 0) {
      const findUserIti = await UserItineraryModel.findOne({
        userId: "skoekfodkse",
      });
      // check the dupilcate of data.
      const findItiDup = await allItiDetailsModel.findOne({
        itineraryId: xParams.itiId,
      });
      if (findUserIti && !findItiDup) {
        // Save the mapped data to MongoDB
        const result = await allItiDetailsModel.create({
          itineraryId: xParams.itiId,
          ItiDetails: xData,
        });
        if (result) {
          console.log(result._id);
          try {
            const pushAllItiId = await UserItineraryModel.findOneAndUpdate(
              {
                userId: "skoekfodkse",
                "itineraries.itineraryId": xParams.itiId,
              },
              { $set: { "itineraries.$.itiInfo.ItiDetails": result._id } },
              //to get the sepecific data.
              { _id: 0, "itineraries.$": 1 }
            );
            res.send("successfully send");
          } catch (error) {
            console.log(error);
            throw new Error("Error while inserting id to userItinerary model");
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error while inserting many itineraries");
  }
}
