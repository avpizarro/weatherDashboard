var today = moment();
console.log(today);
var cities = [];

$("button").click(function(event) {
    event.preventDefault();
    var cityInput = $("input").val();
    cities.unshift(cityInput);
    $("#1").text(cities[0]);
    $("#2").text(cities[1]);
    $("#3").text(cities[2]);
    $("#4").text(cities[3]);
    $("#5").text(cities[4]);
    $("#6").text(cities[5]);
    $("#7").text(cities[6]);
    $("#8").text(cities[7]);

    console.log(cityInput);
    console.log(cities);

    var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&appid=808c18e18668dc9d927127d9a72a8fb1";
console.log(todayQueryURL);
var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q" + cities[0] + "&appid=808c18e18668dc9d927127d9a72a8fb1";

$.ajax({
    url: todayQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#currentDay").text(cities[0]+today.format("DD/MM/YYYY"));
    $("#todayTemp").text("Temperature: " + response.main.temp);
    $("#todayHum").text("Humidity: " + response.main.humidity);
    $("#todayWS").text("Wind Speed: " + response.wind.speed);
    

    var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    console.log(iconURL);
    $("#currentDay").append("<img>");
    $("img").attr("src", iconURL); 
     
});


})
// var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&appid=808c18e18668dc9d927127d9a72a8fb1";
// console.log(todayQueryURL);
// var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q" + cities[0] + "&appid=808c18e18668dc9d927127d9a72a8fb1";

// $.ajax({
//     url: todayQueryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
// });

// response.coord.lon
// response.coord.lat

// var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=28.08&lon=-80.61&appid=808c18e18668dc9d927127d9a72a8fb1"

// response.value