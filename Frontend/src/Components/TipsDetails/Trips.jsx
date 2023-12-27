import { useNavigate } from "react-router-dom";

import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Trips.css";
import { useTripForm } from "../../Contexts/TripFormContext";

const Trips = () => {
  const { setTripData } = useTripForm();

  const navigate = useNavigate();

  //state for form inputs
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});

  //set of hard coded valid destinations
  const validDestination = ["kathmandu", "pokhara", "lumbini", "mustang"];

  //validate function to validate form data
  const validateDestination = () => {
    const validationErrors = {};

    if (!destination.trim()) {
      validationErrors.destination = "Destination is required";
    } else if (!validDestination.includes(destination.trim())) {
      validationErrors.destination = "Invalid Destination";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  }; // Validation function for dates
  const validateDates = () => {
    const validationErrors = {};

    if (!startDate) {
      validationErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      validationErrors.endDate = "End date is required";
    }

    if (startDate && endDate && startDate > endDate) {
      validationErrors.dateRange = "End date must be after start date";
    } else {
      validationErrors.dateRange = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  };

  //function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hanlde submit implemented");

    //validate the form data
    validateDestination();
    validateDates();

    if (
      !errors.destination &&
      !errors.startDate &&
      !errors.endDate &&
      startDate &&
      endDate &&
      startDate <= endDate
    ) {
      console.log("Form submitted successfully");
      setTripData({ destination, startDate, endDate });
      console.log("Trip Data:", { destination, startDate, endDate });
      navigate("/tripDetails");
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="trips">
      <h2>Plan a New Trip</h2>
      <form onSubmit={handleSubmit} className="trips-form">
        <div className="destination-input">
          <label className="destination-label">Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
            }}
            onBlur={validateDestination}
            placeholder="e.g Kathmandu, Lumbini"
          />
          {errors.destination && (
            <div className="error-message">{errors.destination}</div>
          )}
        </div>
        <br />

        <div className="date-input">
          <label className="date-label">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setErrors((prevErrors) => ({ ...prevErrors, startDate: "" }));
            }}
            onBlur={validateDates}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select Start Date"
            showTimeInput={false}
          />
          {errors.startDate && (
            <div className="error-message">{errors.startDate}</div>
          )}
          <label className="date-label">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }));
            }}
            onBlur={validateDates}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select End Date"
          />
          {errors.endDate && (
            <div className="error-message">{errors.endDate}</div>
          )}
        </div>
        <br />
        {errors.dateRange && (
          <div className="error-message">{errors.dateRange}</div>
        )}

        <button className = "trips-button" type="submit" onClick={() => console.log("Button Clicked")}>
          Plan Trip
        </button>
      </form>
    </div>
  );
};

export default Trips;