

//Create a variable for today's date
var today = moment();

//Create a array to store the inputs of the user
var cities = [];

//Check for any previously searched cities
if (localStorage.getItem("cities") !== null) {
  var cities = localStorage.getItem("cities").split(",");
}

$("#1").text(cities[0]);
$("#2").text(cities[1]);
$("#3").text(cities[2]);
$("#4").text(cities[3]);
$("#5").text(cities[4]);
$("#6").text(cities[5]);
$("#7").text(cities[6]);
$("#8").text(cities[7]);

//Define the API URL according to the city chosen by the user
var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";

//Call the API to get today's weather data
$.ajax({
  url: todayQueryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);

  //Display today's weather data
  $("#currentDay").text(cities[0] + "  " + today.format("(DD/MM/YYYY)"));
  $("#todayTemp").text("Temperature: " + response.main.temp.toFixed() + " °C");
  $("#todayHum").text("Humidity: " + response.main.humidity + " %");
  $("#todayWS").text("Wind Speed: " + (response.wind.speed * 3.6).toFixed() + " kmph");

  // Display today's weather icon
  var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
  console.log(iconURL);
  $("#currentDay").append("<img>");
  $("img").attr("src", iconURL).addClass("currentIcon");
  console.log($(".currentIcon"));

  // Variables to store the city latitude and longitude 
  var lon = response.coord.lon;
  var lat = response.coord.lat;

  // Define the API URL to get the UV Index
  var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";

  // Call the UV Index API
  $.ajax({
    url: UVqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // Display the UV Index
    var todayUV = $("<span>").text(response.value).addClass("UVcolor");
    $("#todayUV").text("UV Index:  ");
    $("#todayUV").append(todayUV);
    console.log(response.value);

    // Colour code the UV index display according to the intensity
    if (Number(response.value) <= 2)
      todayUV.addClass("green");


    if (Number(response.value) > 2 && Number(response.value) <= 5)
      todayUV.addClass("yellow");


    if (Number(response.value) > 5 && Number(response.value) <= 7)
      todayUV.addClass("orange");


    if (Number(response.value) > 7 && Number(response.value) <= 10)
      todayUV.addClass("red");

    if (Number(response.value) > 10)
      todayUV.addClass("purple");
  })

  // Define the API URL to retrieve the next five days weather data
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";
  console.log(fiveDayQueryURL);

  // Call the next five days weather forecast data
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // Variable to store the five day forecast Icon URLs
    var forecastIconURLList = [];

    //Empty the element to display the new forecast data
    $(".forecast").empty();

    //Display the next five days weather forecast data
    for (var i = 1; i <= 5; i++)

      $(".today" + [i]).append([
        $("<div>").text(moment.unix(response.daily[i].dt).format("DD/MM/YYYY")).addClass("nextDay"),
        $("<img>").addClass("icon" + [i]),
        $("<div>").text("Temp: " + response.daily[i].temp.day.toFixed() + " °C"),
        $("<div>").text("Humidity: " + response.daily[i].humidity + " %")
      ]);

    //Display the weather Icons for the next five days
    for (var i = 1; i <= 5; i++)
      forecastIconURLList.push("https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
    console.log(forecastIconURLList)
    $(".icon1").attr("src", forecastIconURLList[0]);
    $(".icon2").attr("src", forecastIconURLList[1]);
    $(".icon3").attr("src", forecastIconURLList[2]);
    $(".icon4").attr("src", forecastIconURLList[3]);
    $(".icon5").attr("src", forecastIconURLList[4]);
  });
})

//Add a click function to the search button that stores the input
$("button").click(function (event) {
  event.preventDefault();
  var cityInput = $("input").val();
  cities.unshift(cityInput);
  $("input").val('');
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

  localStorage.setItem("cities", cities.slice(0, 8));



  //Define the API URL according to the city chosen by the user
  var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";

  //Call the API to get today's weather data
  $.ajax({
    url: todayQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    //Display today's weather data
    $("#currentDay").text(cities[0] + "  " + today.format("(DD/MM/YYYY)"));
    $("#todayTemp").text("Temperature: " + response.main.temp.toFixed() + " °C");
    $("#todayHum").text("Humidity: " + response.main.humidity + " %");
    $("#todayWS").text("Wind Speed: " + (response.wind.speed * 3.6).toFixed() + " kmph");

    // Display today's weather icon
    var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    console.log(iconURL);
    $("#currentDay").append("<img>");
    $("img").attr("src", iconURL).addClass("currentIcon");
    console.log($(".currentIcon"));

    // Variables to store the city latitude and longitude 
    var lon = response.coord.lon;
    var lat = response.coord.lat;

    // Define the API URL to get the UV Index
    var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";

    // Call the UV Index API
    $.ajax({
      url: UVqueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // Display the UV Index
      var todayUV = $("<span>").text(response.value).addClass("UVcolor");
      $("#todayUV").text("UV Index:  ");
      $("#todayUV").append(todayUV);
      console.log(response.value);

      // Colour code the UV index display according to the intensity
      if (Number(response.value) <= 2)
        todayUV.addClass("green");


      if (Number(response.value) > 2 && Number(response.value) <= 5)
        todayUV.addClass("yellow");


      if (Number(response.value) > 5 && Number(response.value) <= 7)
        todayUV.addClass("orange");


      if (Number(response.value) > 7 && Number(response.value) <= 10)
        todayUV.addClass("red");

      if (Number(response.value) > 10)
        todayUV.addClass("purple");
    })

    // Define the API URL to retrieve the next five days weather data
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";
    console.log(fiveDayQueryURL);

    // Call the next five days weather forecast data
    $.ajax({
      url: fiveDayQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // Variable to store the five day forecast Icon URLs
      var forecastIconURLList = [];

      //Empty the element to display the new forecast data
      $(".forecast").empty();

      //Display the next five days weather forecast data
      for (var i = 1; i <= 5; i++)

        $(".today" + [i]).append([
          $("<div>").text(moment.unix(response.daily[i].dt).format("DD/MM/YYYY")).addClass("nextDay"),
          $("<img>").addClass("icon" + [i]),
          $("<div>").text("Temp: " + response.daily[i].temp.day.toFixed() + " °C"),
          $("<div>").text("Humidity: " + response.daily[i].humidity + " %")
        ]);

      //Display the weather Icons for the next five days
      for (var i = 1; i <= 5; i++)
        forecastIconURLList.push("https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
      console.log(forecastIconURLList)
      $(".icon1").attr("src", forecastIconURLList[0]);
      $(".icon2").attr("src", forecastIconURLList[1]);
      $(".icon3").attr("src", forecastIconURLList[2]);
      $(".icon4").attr("src", forecastIconURLList[3]);
      $(".icon5").attr("src", forecastIconURLList[4]);
    });
  })
})

// Retrive the weather data as above for a city in the History list
$("td").click(function (event) {
  var listedCity = $(this).text()
  console.log(listedCity)

  //Define the API URL according to the city chosen by the user
  var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + listedCity + "&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";

  //Call the API to get today's weather data
  $.ajax({
    url: todayQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    //Display today's weather data
    $("#currentDay").text(listedCity + "  " + today.format("(DD/MM/YYYY)"));
    $("#todayTemp").text("Temperature: " + response.main.temp.toFixed() + " °C");
    $("#todayHum").text("Humidity: " + response.main.humidity + " %");
    $("#todayWS").text("Wind Speed: " + (response.wind.speed * 3.6).toFixed() + " kmph");

    // Display today's weather icon
    var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    console.log(iconURL);
    $("#currentDay").append("<img>");
    $("img").attr("src", iconURL).addClass("currentIcon");
    console.log($(".currentIcon"));

    // Variables to store the city latitude and longitude 
    var lon = response.coord.lon;
    var lat = response.coord.lat;

    // Define the API URL to get the UV Index
    var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=808c18e18668dc9d927127d9a72a8fb1";

    // Call the UV Index API
    $.ajax({
      url: UVqueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // Display the UV Index
      var todayUV = $("<span>").text(response.value).addClass("UVcolor");
      $("#todayUV").text("UV Index:  ");
      $("#todayUV").append(todayUV);
      console.log(response.value);

      // Colour code the UV index display according to the intensity
      if (Number(response.value) <= 2)
        todayUV.addClass("green");


      if (Number(response.value) > 2 && Number(response.value) <= 5)
        todayUV.addClass("yellow");


      if (Number(response.value) > 5 && Number(response.value) <= 7)
        todayUV.addClass("orange");


      if (Number(response.value) > 7 && Number(response.value) <= 10)
        todayUV.addClass("red");

      if (Number(response.value) > 10)
        todayUV.addClass("purple");
    })

    // Define the API URL to retrieve the next five days weather data
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=metric&appid=808c18e18668dc9d927127d9a72a8fb1";
    console.log(fiveDayQueryURL);

    // Call the next five days weather forecast data
    $.ajax({
      url: fiveDayQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // Variable to store the five day forecast Icon URLs
      var forecastIconURLList = [];

      //Empty the element to display the new forecast data
      $(".forecast").empty();

      //Display the next five days weather forecast data
      for (var i = 1; i <= 5; i++)

        $(".today" + [i]).append([
          $("<div>").text(moment.unix(response.daily[i].dt).format("DD/MM/YYYY")).addClass("nextDay"),
          $("<img>").addClass("icon" + [i]),
          $("<div>").text("Temp: " + response.daily[i].temp.day.toFixed() + " °C"),
          $("<div>").text("Humidity: " + response.daily[i].humidity + " %")
        ]);

      //Display the weather Icons for the next five days
      for (var i = 1; i <= 5; i++)
        forecastIconURLList.push("https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
      console.log(forecastIconURLList)
      console.log(forecastIconURLList[i])
      $(".icon1").attr("src", forecastIconURLList[0]);
      $(".icon2").attr("src", forecastIconURLList[1]);
      $(".icon3").attr("src", forecastIconURLList[2]);
      $(".icon4").attr("src", forecastIconURLList[3]);
      $(".icon5").attr("src", forecastIconURLList[4]);
    });
  })
})