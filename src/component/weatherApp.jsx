import { useState, useEffect } from 'react'
import './weather.css'
import cloudsVideo from './clouds_3_6.mp4'

const WeatherFinder = () => {
  const [city, setCity] = useState('')
  const [data, setData] = useState('')
  const [country, setCountry] = useState('')
  const [time, setTime] = useState('')
  const [temp, setTemp] = useState('')
  const [weather, setWeather] = useState('')
  const [image, setImage] = useState('')

  const handleinput = (e) => {
    const value = e.target.value
    setCity(value)
  }

  const fetchWeather = async () => {
    try {
      const api = `http://api.weatherapi.com/v1/current.json?key=4788408d446a4fd19d5114021240411&q=${city}&aqi=yes`
      const resp = await fetch(api)
      const data = await resp.json()
      if (resp.ok) {
        setData(data)
        setCountry(data.location.country)
        setTime(data.location.localtime)
        setTemp(data.current.temp_c)
        setWeather(data.current.condition.text)
        setImage(data.current.condition.icon)
        console.log(data.current.condition.icon)

        console.log(data)
      } else {
        console.log('error in fetching data')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="video-background">
      <video autoPlay muted loop>
        <source src={cloudsVideo} type="video/mp4" />
      </video>

      <div className="main-container">
        <input
          type="text"
          placeholder="enter a city"
          onChange={handleinput}
          className="search-area"
        />
        <button className="btn" onClick={fetchWeather}>
          find
        </button>
        <div className="weather-container" data={data}>
          {data && (
            <div className="weather-data">
              <div className="weather-box">
                <div className="weather">
                  <img src={`http:${image}`} alt="weather icon" />
                  <h3>{weather}</h3>
                </div>
                <h4 className="temp">{temp}°C</h4>
              </div>
              <div className="weather-box city-box">
                <h2>{city}</h2>
              </div>
              <div className="weather-box time-country-box">
                <h5>{time}</h5>
                <h3>{country}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeatherFinder
