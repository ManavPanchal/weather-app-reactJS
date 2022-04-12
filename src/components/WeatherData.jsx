import React, { useEffect, useState } from "react";
import "./sass/main.css";
import WeatherForecast from "./WeatherForecast";

const WeatherData  = (props) =>
{
    const [searchedCity, setSearchedCity] = useState(props.city);
    const [crntCityLat , setCrntCityLat] = useState(0);
    const [crntCityLon , setCrntCityLon] = useState(0);
    const [temprature, setTemprature] = useState([]);
    const [foreCastData, setForeCastData] = useState([]);
    const [weather , setWeather] = useState();

    // const weath_map = () =>{
    //     console.log(weather);
    //     document.body.style.backgroundImage = "url('/public/image/foggy_d.jpeg');"
    // }

    useEffect(()=>{
        const callApi = async ()=>{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=metric&appid=9e4cdd6c628c4cbdcacc25b6df594009`);
            const result = await response.json();
            setSearchedCity(result.name);
            setTemprature(result.main);
            setCrntCityLat(result.coord.lat);
            setCrntCityLon(result.coord.lon);
            setWeather(result.weather[0].description);
            // Background(result.weather[0].description)
        }
        callApi();
    },[props]);


    useEffect(()=>{
        const callForcastApi = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${crntCityLat}&lon=${crntCityLon}&units=metric&appid=9e4cdd6c628c4cbdcacc25b6df594009`)
            const result = await response.json();
            setForeCastData(result.hourly);
        }
        callForcastApi();
        // weath_map();
    },[crntCityLat,crntCityLon]);


    return(
        <>
            { searchedCity && (<div className="citi_info_wrapper">
                <div className="crnt_city flex-center">
                        <i className="fa-solid fa-location-dot"></i>
                        <h1> {searchedCity} </h1>
                </div>
                <div className="crnt_city_temp flex-center">
                    <p> {parseInt(temprature.temp)}° </p>
                </div>
                <div className="crnt_city_weather">
                    <p> {weather} </p>
                </div>
                <div className="forecast_data flex">
                    {foreCastData !=null && foreCastData.map((elem, index)=>{
                       return <WeatherForecast  key={index} temp = {elem.temp} count={index}/>
                    })}
                    <div className="forecast_footer"> *48 hours forecast </div>
                </div>
            </div>)}
            {!searchedCity && (
                <div className="main_wrapper flex-center">
                    <p className="no_data"> No Data is Available For The City</p>
                </div>
            )}
        </>
    )
}

export default WeatherData;