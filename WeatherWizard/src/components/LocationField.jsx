import React from "react";

const cityNameField ={
 borderRadius:"15px",
 boderColor:"#4D8BC5",
 innerWidth:"334px",
 height:"42px"

}
function LocationField({ location, setLocation, searchLocation }) {
  return (
    <div className="search">
      <input
      style={cityNameField}
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text"
      />
    </div>
  );
}

export default LocationField;