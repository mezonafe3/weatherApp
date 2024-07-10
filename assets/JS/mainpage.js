
$(".burger-button").click(function(){
    $(".nav-list-slide").slideToggle(500)
})
$(".nav-list-slide").slideUp()

function getDay(currentDate){
const date = new Date(currentDate);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthIndex = date.getMonth();

const dayIndex = date.getDay();

const monthName = months[monthIndex];
const dayName = days[dayIndex];

    return  { day: dayName, month: monthName ,dayNum:dayIndex};
}
async function weatherApi(country="Egypt"){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6faed5d798e848718a0112050240907&q=${country}&days=3`, {
        method: "POST", 
        mode: 'cors',
        })
    let finalData= await data.json()
    let dayAndMon=getDay(finalData.location.localtime)
    let currentDay=finalData.location.localtime.slice(8,10)
    
    let tempC=finalData.current.temp_c
    let tempIcon=finalData.current.condition.icon
    let tempCond=finalData.current.condition.text
    let windSpeed=finalData.current.wind_kph
    let windDirec=finalData.current.wind_dir
    let humidity=finalData.current.humidity
    let location=finalData.location.country
    let nameCon=finalData.location.region
    $(".cur-day").text(`${dayAndMon.day}`)
    $(".cur-mon").text(`${dayAndMon.month}`)
    $(".cur-day-num").text(`${currentDay}`)
    $(".country").text(`${location +" "+nameCon }`)
    $("#temp-c").text(`${tempC}`)
    $(".temp-icon").attr("src",'https:'+tempIcon)
    $(".card-1-condition").text(`${tempCond}`)
    $(".wind").text(`${windSpeed}`)
    $(".direction").text(`${windDirec}`)
    $(".hum").text(`${humidity}`)
    
    let dayTwo=getDay(finalData.forecast.forecastday[1].date)
    let dayThree=getDay(finalData.forecast.forecastday[2].date)
    
    $(".day-2-head").text(`${dayTwo.day}`)
    $(".day-2-img").attr("src",'https:'+(finalData.forecast.forecastday[1].day.condition.icon))
    $(".day-2-c-max").text(`${finalData.forecast.forecastday[1].day.maxtemp_c}`)
    $(".day-2-c-min").text(`${finalData.forecast.forecastday[1].day.mintemp_c}`)
    $(".day-2-info").text(`${finalData.forecast.forecastday[1].day.condition.text}`)
    $(".day-3-head").text(`${dayThree.day}`)
    $(".day-3-img").attr("src",'https:'+(finalData.forecast.forecastday[2].day.condition.icon))
    $(".day-3-c-max").text(`${finalData.forecast.forecastday[2].day.maxtemp_c}`)
    $(".day-3-c-min").text(`${finalData.forecast.forecastday[2].day.mintemp_c}`)
    $(".day-3-info").text(`${finalData.forecast.forecastday[2].day.condition.text}`)

}


$(".search").keyup(function(){
    let searcchQuery=$(this).val()

    weatherApi(`${searcchQuery}`)
})
weatherApi()


