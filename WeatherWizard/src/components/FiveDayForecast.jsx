// FiveDayForecast.jsx
import React from "react";

const forecastContainer = {
  display: "flex",
  borderRadius: "15px",
  overflow: "hidden",
  border: "1px solid #ccc",
};

const dayContainer = {
  flex: "1",
  padding: "10px",
  textAlign: "center",
  borderRight: "1px solid #ccc",
  color: "white", // Change font color here
};

const currentDayStyle = {
  backgroundColor: "#4D8BC5",
  color: "white",
};

function FiveDayForecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return <div>Loading forecast...</div>;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div style={forecastContainer}>
      {forecast.map((day, index) => (
        <div key={index} style={{ ...dayContainer, ...(day.day === today ? currentDayStyle : {}) }}>
          <p>
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          <p>{day.main.temp.toFixed()}°F</p>
        </div>
      ))}
    </div>
  );
}

export default FiveDayForecast;
