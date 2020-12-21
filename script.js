var today = moment();
console.log(today);
var cities = [];

$("button").click(function(event) {
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

    var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&appid=808c18e18668dc9d927127d9a72a8fb1";

  $.ajax({
    url: todayQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#currentDay").text(cities[0]+ "  " + today.format("(DD/MM/YYYY)"));
    $("#todayTemp").text("Temperature: " + response.main.temp + " °F");
    $("#todayHum").text("Humidity: " + response.main.humidity + "%");
    $("#todayWS").text("Wind Speed: " + response.wind.speed + " MPH");
    

    var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    console.log(iconURL);
    $("#currentDay").append("<img>");
    $("img").attr("src", iconURL).addClass("currentIcon"); 
    console.log($(".currentIcon"));
  
    var lon = response.coord.lon;
    console.log(lon);
    var lat = response.coord.lat;
    console.log(lat);
    var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=808c18e18668dc9d927127d9a72a8fb1";
    console.log(UVqueryURL);

    $.ajax({
      url: UVqueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var todayUV = $("<span>").text(response.value).addClass("UVcolor");
      $("#todayUV").text("UV Index:  ");
      $("#todayUV").append(todayUV);
      console.log(response.value);

      if (Number(response.value) <= 2)
        todayUV.addClass("green");
      

      if (Number(response.value) > 2 && Number(response.value) <= 5) 
        todayUV.addClass("yellow");
      
      
      if (Number(response.value) > 5 &&  Number(response.value)<= 7) 
        todayUV.addClass("orange");
        

      if (Number(response.value) > 7 && Number(response.value)<= 10) 
        todayUV.addClass("red");
      
      if (Number(response.value) >10)
      todayUV.addClass("purple");  
    })

    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=current,minutely,hourly,alerts&appid=808c18e18668dc9d927127d9a72a8fb1";
    console.log(fiveDayQueryURL);

    $.ajax({
      url: fiveDayQueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var forecastIconURLList = [];
      $(".forecast").empty();

      for (var i=1; i<=5; i++)
        
      $(".today" +[i]).append([
        $("<div>").text(moment.unix(response.daily[i].dt).format("DD/MM/YYYY")).addClass("nextDay"),
        $("<img>").addClass("icon"+[i]),
        $("<div>").text("Temp: "+response.daily[i].temp.day+" °F"),
        $("<div>").text("Humidity: "+response.daily[i].humidity+"%")
      ]);

      for (var i=1; i<=5; i++)
      forecastIconURLList.push("http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
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
