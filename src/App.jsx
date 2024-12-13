import { useEffect, useState } from "react";
import "./App.css";
import styles from "./weather.module.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [input, setInput] = useState(null);
  // const [sityWeather, setSityWeather] = useState({});

  // inputni qiymatini olish
  function handleChange(e) {
    setInput(e.target.value);
  }

  // inputni tozalash
  // const async handleSubmit = (e)=>  {
  //   e.prevetDefault();

  //     if (response.ok) {
  //       setData(data);
  //     } else {
  //       setData(null);
  //     }
  //   }
  // }

  // locatsiyani olish
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  // API manzilini olish

  // const one_API = `https:api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY} `;
  // setSityWeather(one_API);

  // console.log(sityWeather);

  // function API_adress() {
  //   if (sityWeather) {
  //     ` https:api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&units=metric&appid=${API_KEY}`;
  //   } else {
  //     return;
  //   }
  // }

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsloading(true);
      const response = await fetch(
        ` https:api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setData(data);
      } else {
        setData(null);
      }
    };
    if (location?.lat && location?.lon) {
      fetchWeatherData();
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
      <form onSubmit={handleSubmit} className={styles.app_form}>
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
