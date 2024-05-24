// LocationField.jsx
import React from "react";

const cityNameField ={
 borderRadius:"15px",
 borderColor:"#4D8BC5",
 width:"334px",
 height:"42px",
 padding: "0 10px",
 fontSize: "16px",
}

const searchButton = {
  marginLeft: "10px",
  padding: "10px 15px",
  borderRadius: "15px",
  backgroundColor: "#4D8BC5",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
}

function LocationField({ location, setLocation, searchLocation }) {
  return (
    <div className="search">
      <input
        style={cityNameField}
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Enter Location"
        type="text"
      />
      <button style={searchButton} onClick={searchLocation}>Search</button>
    </div>
  );
}

export default LocationField;
