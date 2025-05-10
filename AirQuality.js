import React, { useState } from "react";
import axios from "axios";

const AirQuality = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAirQuality = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setData(null);
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/air_quality", {
        params: { city },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h2>Check Air Quality</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        onClick={fetchAirQuality}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Check
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>City: {data.city}</h3>
          <p>AQI: {data.aqi}</p>
          <p>Dominant Pollutant: {data.dominant_pollutant}</p>
        </div>
      )}
    </div>
  );
};

export default AirQuality;
