const WeatherForecast = (props) =>{
    var hours = new Date().getHours()+ props.count;
    if(hours >= 24) hours = hours%24;
    if(hours == new Date().getHours()){
        return(
            <>
                <div className="hourly_data flex-center"> 
                    <div className="fc_d">NOW</div> 
                    <div className="fc_d">{`${parseInt(props.temp)}°`}</div> 
                </div>
            </>
        )
    }
    else if(hours<10){
        return(
            <>
                <div className="hourly_data flex-center"> 
                    <div className="fc_d">{`0${hours}`}</div> 
                    <div className="fc_d">{`${parseInt(props.temp)}°`}</div> 
                </div>
            </>
        )
    }else{
        return(
            <>
                <div className="hourly_data flex-center"> 
                    <div className="fc_d">{hours}</div> 
                    <div className="fc_d">{`${parseInt(props.temp)}°`}</div> 
                </div>
            </>
        )
    }
}

export default WeatherForecast;