import React, { useEffect } from "react";
import "./TripPlaces.css";
import GoogleMaps from "../../Components/Map/GoogleMaps/GoogleMaps";
import TripPlaceNav from "../../Components/Navigation/TripPlaceNav/TripPlaceNav";
import NestedLink from "../../lib/ui/NestedLink";
import Softbtn from "../../lib/ui/Softbtn";
import { getPlaces } from "../../lib/Actions/ServerGetActions/getPlaces";
import { useParams, redirect, useNavigate } from "react-router-dom";

const TripPlaces = () => {
  const { pId } = useParams();
  const navigate = useNavigate();
  //center for map
  const tripPlacesCenter = {
    lat: 28.397361,
    lng: 84.125761,
  };

  const getPla = async () => {
    const resGetPlaces = await getPlaces(pId);
    if (!resGetPlaces) {
      navigate("/trips", { replace: true });
    }

    console.log("resGetPlaces ==>>", resGetPlaces);
  };
  useEffect(() => {
    getPla();
  }, []);

  return (
    <div className="tripplaces-container">
      <div className="tripplaces-container2">
        <div className="tripplaces-nav">
          <TripPlaceNav />
        </div>
        <div className="tripplaces-heading">
          <h1>Places You Want To Visit</h1>
        </div>
        <div className="linknewplaces">
          <div className="tripplaces-innerLink">
            <NestedLink />
          </div>
          <div className="tripplaces-addnewplace">
            <div className="tp-line"></div>
            <div className="softbtn">
              <Softbtn />
            </div>
          </div>
        </div>
      </div>

      <div className="tripplaces-map">
        <GoogleMaps zoom={20} center={tripPlacesCenter} />
      </div>
    </div>
  );
};

export default TripPlaces;
