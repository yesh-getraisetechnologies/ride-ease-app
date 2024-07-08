import axios from "axios";
import { Linking } from "react-native";

const API_KEY = "AIzaSyDcP0oTGD19Zy93-i768Myim9hPQPmwY34";

const geocodeAddress = async (address, apiKey) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address: address,
        key: apiKey,
      },
    }
  );

  const { results } = response.data;
  if (results.length > 0) {
    const { lat, lng } = results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } else {
    throw new Error("Address not found");
  }
};

const openGoogleMaps = async ({
  startAddress,
  destinationAddress,
  waypointAddresses,
}) => {
  try {
    const start = await geocodeAddress(startAddress, API_KEY);
    const destination = await geocodeAddress(destinationAddress, API_KEY);
    const waypoints = await Promise.all(
      waypointAddresses.map((addr) => geocodeAddress(addr, API_KEY))
    );

    const waypointsStr = waypoints
      .map((waypoint) => `${waypoint.latitude},${waypoint.longitude}`)
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypointsStr}`;
    Linking.openURL(url);
  } catch (err) {
    console.error(err.message);
  }
};

export default openGoogleMaps;
