import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [capital, setCapital] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState(""); 
  const [population, setPopulation] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (country.trim() === "") {
      setCapital("");
      setFlag("");
      setPopulation("");
      setRegion("");
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => {
        if (res.data && res.data[0]) {
          const data = res.data[0];
          setCapital(data.capital ? data.capital[0] : "Not found");
          setFlag(data.flags?.svg || data.flags?.png || "");
          setPopulation(data.population ? data.population.toLocaleString() : "Unknown");
          setRegion(data.region || "Unknown");
        } else {
          setCapital("Not found");
          setFlag("");
          setPopulation("Unknown");
          setRegion("Unknown");
        }
      })
      .catch((err) => {
        console.log(err);
        setCapital("Not found");
        setFlag("");
        setPopulation("Unknown");
        setRegion("Unknown");
      });
  }, [country]);

  return (

    <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1 style={{color:'blue'}}>welcome M jalal</h1>
      <input
        type="text"
        placeholder="Enter your country name"
        style={{
          color: "red",
          background: "white",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "2px solid black",
          width: "300px",
          textAlign: "center",
          backgroundColor: "#333",
          borderColor: "yellow",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      {country && (
        <div style={{ marginTop: "20px", color: "yellow" }}>
          <h2>
            Capital of <span style={{ color: "white" }}>{country}</span> is{" "}
            <span style={{ color: "white" }}>{capital}</span>
          </h2>

          {/* 👇 flag image */}
          {flag && (
            <img
              src={flag}
              alt={`${country} flag`}
              style={{
                width: "500px",
                height: "400px",
                marginTop: "10px",
                border: "2px solid white",
                borderRadius: "8px",
              }}
            />
          )}

          {/* 👇 population and region */}
          <p style={{ color: "gray", marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
            <strong>Population:</strong> {population}
          </p>
          <p style={{ color: "blue", marginTop: "5px" }}>
            <strong>Region:</strong> {region}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;