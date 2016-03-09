$(document).ready(function() {

  var data = null;
  var latitude;
  var longitude;
  var zeroKelvin = 273.16;

  var weatherImage = [{
    "Clouds": "url('https://dickyw.blob.core.windows.net/image/CloudySky.jpg')"
  }, {
    "Clear": "url('https://dickyw.blob.core.windows.net/image/ClearSky.jpg')"
  }, {
    "Sun": "url('https://dickyw.blob.core.windows.net/image/SunnySky.jpg')"
  }, {
    "Rain": "url('https://dickyw.blob.core.windows.net/image/RainySky.jpg')"
  }, {
    "Snow": "url('https://dickyw.blob.core.windows.net/image/Snow.jpg')"
  }];

  var weatherIcon = [{
    "Clouds": "https://dickyw.blob.core.windows.net/image/sun-and-cloud.svg"
  }, {
    "Clear": "https://dickyw.blob.core.windows.net/image/sun-day-weather-symbol.svg"
  }, {
    "Sun": "https://dickyw.blob.core.windows.net/image/sun-day-weather-symbol.svg"
  }, {
    "Rain": "https://dickyw.blob.core.windows.net/image/cloud.svg"
  }, {
    "Snow": "https://dickyw.blob.core.windows.net/image/snow-cloud.svg"
  }];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $(".coordinates").html("latitude: " + position.coords.latitude.toPrecision(6) + "<br>longitude: " + position.coords.longitude.toPrecision(6));
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // latitude = 45;
      // longitude= 100;
      getWeatherData();
    });
  }

  function displayLocalWeather() {
    if (data) {
      
      setBackgroundImage(data.weather[0].main);
      setWeatherIcon(data.weather[0].main);
      var sunrise = new Date(data.sys.sunrise*1000);
      var sunset = new Date(data.sys.sunset*1000);

      $(".temperature").text((data.main.temp - zeroKelvin).toPrecision(2));
      $(".location").text(data.name + ", " + data.sys.country);
      $(".description").text(data.weather[0].description);
       $(".sunrise").html("Sunrise "+sunrise.getHours() + ":" + sunrise.getMinutes() + " <small>" + "Sunset " + ('0'+sunset.getHours()).slice(-2) + ":" + ('0'+sunset.getMinutes()).slice(-2) + "</small>");
 
      $(".local-weather").css("visibility", "visible");
      $(".loading").css("visibility", "hidden");      
    }
  }

  // Set the page background to match the local weather 
  function setBackgroundImage(weather) {
    var imageIndex;
    for (var i = 0; i < weatherImage.length; i++) {
      if (weatherImage[i].hasOwnProperty(weather)) {
        $("body").css("background-image", weatherImage[i][weather]);
      }
    }
  }
  // Set the icon to match the local weather 
  function setWeatherIcon(weather) {
    var imageIndex;
    for (var i = 0; i < weatherImage.length; i++) {
      if (weatherImage[i].hasOwnProperty(weather)) {
        $(".weather-icon").attr("src", weatherIcon[i][weather]);
      }
    }
  }

  // Event handler for Temp Unit Toggle button
  $(".btn-temp-toggle").click(function() {
    if ($(this).text() == "°C") {
      $(this).text("°F");
      // convert temp to F and update
      if (data) {
        $(".temperature").text(
          ((
            (data.main.temp - zeroKelvin).toPrecision(2) * 1.8
          ) + 32).toPrecision(2)
        );
      }
    } else {
      $(this).text("°C");
      // convert temp to C and update view
      if (data) {
        $(".temperature").text(       
            (data.main.temp - zeroKelvin).toPrecision(2) 
        );
      }
    }
  });

  function getWeatherData() {
    var coords = "lat=" + latitude + "&lon=" + longitude;
    var apiKey = "&appid=bae28f09bf46e155bd227c427486f769";
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?' +
        coords + apiKey,
      contentType: 'text/plain',

      xhrFields: {
        withCredentials: false
      },

      success: function(json) {
        // Here's where you handle a successful response.
        data = json;
        displayLocalWeather();
      },

      error: function() {
        // Here's where you handle an error response.
        window.alert("Something went wrong with Open Weather Map API call.");
      }
    });
  }
});
