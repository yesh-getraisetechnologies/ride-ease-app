import { useState } from "react";

function IndiaTime({ data }) {
  const [currentTime, setCurrentTime] = useState(
    data ? new Date(data) : new Date()
  );

  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${getFormattedDate(currentTime)} | ${formattedTime}`;
}

export default IndiaTime;
