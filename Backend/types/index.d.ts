import { Types } from "mongoose";

export type User = {
  userId: string;
  email: string;
  name?: string;
  password: string;
  refreshToken: string;
};

export type Itineraries = {
  userId: String;
  itineraries: Array<{
    itineraryId: string;
    itiInfo: {
      place_Id: string;
      place: string;
      geolocation: {
        lat: string;
        lng: string;
      };
      ItiDetails: Types.ObjectId;
    };
    startDate: string;
    endDate: string;
  }>;
};
//it's for all details model
type itiPic = {
  url: string;
  height: string;
  width: string;
};
type userReviews = {
  author_name: string;
  author_pic_url: string;
  text: string;
  rating: Number;
};

export type AllItiDetails = {
  itineraryId: string;
  ItiDetails: Array<{
    address: string;
    business_status: string;
    name: string;
    geo: {
      lat: string;
      lng: string;
    };
    place_id: string;
    rating: number;

    user_total_rating: number;
  }>;
};

//type for places model
export type Places = {
  placesId: string;
  user: Types.ObjectId;
  places: Array<{
    itineraryId: string;
    itiPlaces: Types.ObjectId;
  }>;
};
