
export const Background = (para) =>{
    if(para === "haze")
        document.body.style.background = "url('./image/hazy_sun.jpeg') center no-repeat"
    else if(para.includes("clouds")) 
        document.body.style.background = "url('./image/clear_sky.jpg') center no-repeat "
    else document.body.style.background = 'url("./image/cloudy_animated_d.jpeg") no-repeat'
}
