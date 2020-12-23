import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";
const APIKEY = "94782b26f0f7dd835a8faee04d659260";


function refreshWeather() {
    /* working out the details on when and where to call the 5 minute timer */
      nIntervId = setInterval(Weather, 300000);
    }

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  // const APIKEY = process.env.apiKeyCall;
  
  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Please give me something to work with");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    /* removing special char excluding the dash */
    value = e.target.value.replace(/[/0123456789!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g, "");
    e.target.value = value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    if (name == "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp; &nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;