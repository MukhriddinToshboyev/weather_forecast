import { useEffect, useState } from "react";
import "./App.css";
import styles from "./weather.module.css";
import { API } from "./services/api";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [city, setCity] = useState(null);

  // inputni qiymatini olish
  function handleChange(e) {
    setCity(e.target.value);
  }

  // locatsiyani olish
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  const fetchLocationWeather = async () => {
    const response = await API.fetchByLocation(location.lat, location.lon);

    console.log(response);
    setData(response);
  };

  const fetchCityWeather = async () => {
    const response = await API.fetchByCityName(city);

    console.log(response);
    setCity(response);
  };

  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchLocationWeather();
    } else if (city) {
      fetchCityWeather();
    }
    setIsloading(false);
  }, [location?.lat, location?.lon]);

  if (isloading || !data?.main) {
    return <h1>Loading...</h1>;
  }

  const feelsLike = Math.round(data?.main?.feels_like);
  const name = data?.name;
  const temp = Math.round(data?.main?.temp);
  const weather = data?.weather?.[0]?.main;
  const sunrise = new Date(data?.sys?.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data?.sys?.sunset * 1000).toLocaleTimeString();
  // const weatherIconUrl = `http://openweathermap.org/img/w/ ${data?.weather?.[0]?.icon}.png`;

  return (
    <div className="app-container">
      <form className={styles.app_form}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Shahar nomini kiriting"
        />
        <button type="submit">Search</button>
      </form>
      <section className={styles.section}>
        <div className={styles.container}>
          <div>
            <h2 className={styles.text}>
              {name}
              {/* <img src={weatherIconUrl} alt="Weather icon" /> */}
            </h2>
          </div>
          <p className={styles.text}> Harorat: {temp}°C</p>
          <p className={styles.text}> Tuyuladi: {feelsLike} °C</p>
          <p className={styles.text}> Holat: {weather} </p>
          <p className={styles.text}> Quyosh chiqishi: {sunrise} </p>
          <p className={styles.text}> Quyosh botishi: {sunset} </p>
        </div>
      </section>
    </div>
  );
}

export default App;
