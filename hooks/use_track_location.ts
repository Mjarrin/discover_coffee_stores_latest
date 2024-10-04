"use client";
import { useState } from "react";

type PositionType = {
  coords: { latitude: number; longitude: number };
};

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  function success(position: PositionType) {
    setIsFindingLocation(false);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${longitude},${latitude}`);
    setLocationErrorMessage("");
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMessage("Unable to retrieve your location");
    console.error("Unable to retrieve your location");
  }

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLocationErrorMessage("Geolocation is not supported by your browser");
    } else {
      console.log("Locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    locationErrorMessage,
    longLat,
    isFindingLocation,
    handleTrackLocation, // Return an object with the function
  };
};

export default useTrackLocation;
