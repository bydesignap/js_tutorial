//https://api.weather.gov/points/32.9412,-97.1342


$(document).ready(function (){
    get_weather_station("32.9412","-97.1342");
});

function get_weather_station(lat, long) {
    $.ajax({
        type: "GET",
        url: "https://api.weather.gov/points/" + lat + "," + long,
        dataType: "json",
        success: function (result, status, xhr) {
            //get forecast data
            get_forecast(result.properties.forecast);
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

// "number": 1,
// "name": "This Afternoon",
// "startTime": "2022-08-07T13:00:00-05:00",
// "endTime": "2022-08-07T18:00:00-05:00",
// "isDaytime": true,
// "temperature": 99,
// "temperatureUnit": "F",
// "temperatureTrend": null,
// "windSpeed": "10 to 15 mph",
// "windDirection": "S",
// "icon": "https://api.weather.gov/icons/land/day/hot?size=medium",
// "shortForecast": "Sunny",
// "detailedForecast": "Sunny, with a high near 99. Heat index values as high as 101. South wind 10 to 15 mph, with gusts as high as 25 mph."

function get_forecast(forecastUrl) {
    $.ajax({
        type: "GET",
        url: forecastUrl,
        dataType: "json",
        success: function (result, status, xhr) {
            //Update the HTML with the result of web query
            let forecastData = [];

            //$("#weather")[0].innerHTML = "<h2>SouthLake</h2><h3>" + result.properties.periods[0].name + "</h3><p>Temp:" + result.properties.periods[0].temperature + "</p>"
            for(var i = 0; i < result.properties.periods.length; i++) {
                forecastData[i] = [result.properties.periods[i].number,
                          result.properties.periods[i].name,
                          result.properties.periods[i].temperature,
                          result.properties.periods[i].shortForecast]
            }

            $('#weatherTable').DataTable({
                data: forecastData,
                columns: [
                    { 'title': "#"},
                    { 'title': "Time of Day"},
                    { 'title': "Temperature"},
                    { 'title': "Short Forecast"}
                ],
            });

        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}