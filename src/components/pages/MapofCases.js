import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "./MapofContact.css";

const MapOfCases = () => {
 
  const [worldData, setWorldData] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  useEffect(() => {
    // Fetch world data
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        setWorldData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch country data
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMarkerClick = (country) => {
    setSelectedCountryData(country);
  };

  if (!worldData || !countryData) {
    return <h1 className="text-center">Loading data...</h1>;
  }

  const heading = ["heading", "cases"];

  return (
    <div>
      <ul className="data-table">
        <h1>world covid data</h1>
        <table className="table">
          <thead>
            <tr>
              {heading.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(worldData).map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td> {item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>

      <div className="map-container">
        <MapContainer center={[30, 0]} zoom={2} style={{ height: "80vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryData.map((country) => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup
                onClose={() => setSelectedCountryData(null)}
                onOpen={() => handleMarkerClick(country)}
              >
                <h3>{country.country}</h3>
                <h6>Total cases: {country.cases.toLocaleString()}</h6>
                <h6>Active cases: {country.active.toLocaleString()}</h6>
                <h6>Recovered: {country.recovered.toLocaleString()}</h6>
                <h6>Deaths: {country.deaths.toLocaleString()}</h6>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {selectedCountryData && (
          <table className="table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Total Cases</th>
                <th>Active Cases</th>
                <th>Recovered</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCountryData.country}</td>
                <td>{selectedCountryData.cases.toLocaleString()}</td>
                <td>{selectedCountryData.active.toLocaleString()}</td>
                <td>{selectedCountryData.recovered.toLocaleString()}</td>
                <td>{selectedCountryData.deaths.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MapOfCases;
