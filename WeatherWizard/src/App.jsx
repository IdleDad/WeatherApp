// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationField from "./components/LocationField";
import CityDateDisplay from "./components/CityDateDisplay";
import FiveDayForecast from "./components/FiveDayForecast";

function App() {
  const API = "2725fb51660ff58bc0dc7b492f74c7eb";
  const [currentData, setCurrentData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const { latitude, longitude } = success.coords;
        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API}`
          )
          .then((response) => {
            const city = response.data[0].name;
            setLocation(city);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      // Fetch current weather
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API}`
        )
        .then((response) => setCurrentData(response.data))
        .catch((error) => console.log(error));

      // Fetch 5-day forecast
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API}`
        )
        .then((response) => {
          const dailyForecasts = response.data.list
            .filter((f) => f.dt_txt.includes("12:00:00"))
            .slice(0, 5);
          setForecastData(dailyForecasts);
        })
        .catch((error) => console.log(error));
    }
  }, [location]);

  return (
    <div className="app" style={{ textAlign: "center", background: "linear-gradient(45deg, #4D8BC5, #003366)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "#fff", marginBottom: "20px", textShadow: "2px 2px 4px #000" }}>Weather Wiz</h1>
      <CityDateDisplay data={currentData} />
      <div style={{ margin: "20px", padding: "10px", borderRadius: "15px", border: "2px solid #fff", boxShadow: "0 0 10px #fff", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
        <h2 style={{ fontSize: "4em", color: "#fff", textShadow: "2px 2px 4px #000", padding: "5px 10px", borderRadius: "15px" }}>{currentData.main && currentData.main.temp.toFixed()}°F</h2>
      </div>
      <FiveDayForecast forecast={forecastData} />
      <div style={{ marginTop: "20px" }}>
        <LocationField location={location} setLocation={setLocation} searchLocation={() => {}} />
      </div>
    </div>
  );
}

export default App;
