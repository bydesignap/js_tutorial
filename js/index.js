//https://api.weather.gov/points/32.9412,-97.1342


$(document).ready(get_weather_station("32.9412","-97.1342"));

function get_weather_station(lat, long) {
    $.ajax({
        type: "GET",
        url: "https://api.weather.gov/points/" + lat + "," + long,
        dataType: "json",
        success: function (result, status, xhr) {
            //get forcast data
            get_forecast(result.properties.forecast);
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

function get_forecast(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (result, status, xhr) {
            //Update the HTML with the result of web query

            $("#weather")[0].innerHTML = "<h2>SouthLake</h2><h3>" + result.properties.periods[0].name + "</h3><p>Temp:" + result.properties.periods[0].temperature + "</p>"

        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}