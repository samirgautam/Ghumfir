import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./InputLocation.css";
import { useMemo } from "react";
import { useAppState } from "../../../utils/Hooks/useAppState";

const InputLocation = ({ destination }) => {
  const { state, dispatch } = useAppState();
  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();
  //caching google map
  usePlacesAutocomplete({
    // Provide the cache time in seconds, the default is 24 hours
    cache: 24 * 60 * 60,
  });

  useMemo(() => {
    setValue(destination);
  }, [destination]);

  //selecting the location to get it's geo-code
  const handleSelect =
    ({ description, place_id }) =>
    () => {
      setValue(description, false);
      const placeValueAction = {
        type: "ADD_PLACE_VALUE",
        payload: description,
      };
      dispatch(placeValueAction);
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        const info = {
          place_Id: place_id,
          geolocation: { lat, lng },
          place: description,
        };
        const itiInfoAction = {
          type: "ADD_ITI_INFO",
          payload: info,
        };
        dispatch(itiInfoAction);
      });
    };

  // renders bunch of suggestions based on the input
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      {/* Render dropdown location  */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
export default InputLocation;