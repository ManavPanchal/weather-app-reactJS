import React, {useState, useEffect} from "react";
import "./sass/main.css";
import WeatherData from "./WeatherData";
import { SuggestionFilter } from "./sugestionFilter";

const Weather =() =>{
    
    const [input , setInput] = useState("");
    const [latitude , setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [cityName , setCityName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    const llApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`
    const ApiId = '9e4cdd6c628c4cbdcacc25b6df594009';
    
    const getValue = (event) =>{
        setInput(event.target.value);
        setSuggestions(SuggestionFilter(event.target.value));
        if(event.target.value = "") setSuggestions([]);
    }
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((positions)=>{
            setLatitude(positions.coords.latitude);
            setLongitude(positions.coords.longitude);
        })
    },[])

    useEffect(()=>{
        if(latitude != null){
            getllApi();
        }
    },[latitude,longitude])
    var t_sugg = 0;
    const getllApi = async ()=>{
        const get = await fetch(`${llApiUrl}&appid=${ApiId}`);
        const res = await get.json();
        // const searchcity = (name) =>{
        //     setInput(name)
        // }
        if(res != null){
            setInput("searching for Location...");
            setInput(res.name);
            setCityName(res.name);
        }
    }
    return(
        <>
            <div className="container_wrapper flex">
                <div className="search_wrapper flex">
                    <div className="search_bar_wrapper flex-center">
                        <div className="search_bar">
                            <input 
                                type="text"
                                placeholder="Enter City Name"
                                onChange={getValue}
                                value={input}
                            />
                            <button className="client_location_btn" onClick={()=>{
                                latitude == null ? alert("please enable share location to get current location") : getllApi()
                            }}> <i className="fa-solid fa-location-crosshairs"></i> </button>
                        <div className="suggestion_section">
                            {input != "" && suggestions.map((elem,index) =>{
                                    if(t_sugg < 4){
                                    t_sugg++;
                                    return(
                                        <p className="suggestions" key={index} onClick={()=>{
                                            setInput(`${elem.name}, ${elem.state}`)
                                            setCityName(elem.name);
                                            setSuggestions([]);
                                        }}>{elem.name}, {elem.state}</p>
                                    )
                                    }

                            })}
                        </div>
                        </div>
                    </div>
                        <button className="search_btn flex-center" onClick={()=> setCityName(input)}> <i className="fa-solid fa-magnifying-glass-location"></i> <p className="search_txt">search</p></button>
                </div>
                { cityName !== "" ? (
                    <div className="main_wrapper flex-center">
                        <WeatherData city={cityName} />
                    </div>
                ):(
                    <div className="main_wrapper flex-center">
                        <p className="no_data"> No Data is Available For The City</p>
                    </div>
                )}
            </div>
        </>
    )
}
export default Weather;

