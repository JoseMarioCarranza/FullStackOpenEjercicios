import weatherServices from "../../services/weather"

import { useEffect, useState } from "react"

const Weather = ({ lat, lng, country }) => {

    const [weatherInfo, setWeatherInfo] = useState(null)

    useEffect(() => {
        weatherServices
            .getWeatherInfo(lat, lng)
            .then(r => setWeatherInfo(r))
    }, [lat, lng])

    if (weatherInfo === null) return

    return (
        <>
            <h2>Weather in {country}</h2>
            <p>Temperature {weatherInfo.current.temp} celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`} alt="" />
            <p>Wind {weatherInfo.current.wind_speed} m/s</p>
        </>
    )
}

export default Weather