// Show local weather status
// Using Wunderground API with JQuery

var locationArray = [];
var apiKey = "removed for Github";

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        locationArray.push(latitude, longitude);
        startLoad(); // does not start until geolocation data is found
    }
    function error() {
        var defaultCoordinates = [40.714269, -74.005973];
        console.log("Error retrieving geolocation position, showing default.")
        locationArray.push(defaultCoordinates[0], defaultCoordinates[1]);
        startLoad();
    }
}
else{
    alert("Geolocation is not supported by your browser.");
}

function startLoad(){
    $.ajax({
            url : "https://api.wunderground.com/api/" + apiKey + "/geolookup/conditions/q/" + locationArray[0] + "," + locationArray[1] + ".json",
            dataType : "jsonp",
            success : function(parsed_json) {
            var location = parsed_json.location.city;
            var country = parsed_json.location.country_name;
            var temp_f = parsed_json.current_observation.temp_f;
            var temp_c = parsed_json.current_observation.temp_c;
            var weather = parsed_json.current_observation.weather;
            var night = "night";
            var findTime = new Date();
            var hour = findTime.getHours();
            var currentDegree = document.getElementById("toggle-temp");

            $(".toggle-temp-button").click(toggleTemp);
            displayConditions();


            function isDaytime(hour){ // determine night or daytime icon
                if (hour >= 7 && hour < 21){
                    return true;
                }
                else {
                    return false;
                }
            }

            function toggleTemp() {
                    if (currentDegree.innerText === "F") {
                        currentDegree.innerText = "C";
                        $(".temp").html(temp_c);
                    }
                    else {
                        currentDegree.innerText = "F";
                        $(".temp").html(temp_f);
                    }
                }
                
            function displayConditions() {
                    $(".message").html("<p>Current weather in " + location + ", " + country + ".</p>");
                    $(".temp").html(temp_f);
                    $(".tempButton").html()
                    $(".conditions").html(weather);

                    if(isDaytime(hour)){
                        $(".icon").html("<img class=img-responsive src=Images/" + weatherTable[weather] + ".png>");
                        $(".img-responsive").addClass("center-block");
                    }
                    else{
                        $(".icon").html("<img class=img-responsive src=Images/" +night + ".png>");
                        $(".img-responsive").addClass("center-block");
                }
            }
        } // end of success

    }); // end of ajax
}
        var weatherTable = {
                'Clear': "clear", // clear
                'Overcast': "cloud",     // cloudy weather
                'Partly Cloudy': "cloud",
                'Mostly Cloudy': "cloud",
                'Scattered Clouds': "cloud",
                'Squalls': "cloud",
                'Funnel Cloud': "cloud",
                'Small Hail': "cloud",
                'Rain': "rain",         // rainy weather
                'Light Rain': "rain",
                'Heavy Rain': "rain",
                'Drizzle': "rain",
                'Light Drizzle': "rain",
                'Heavy Drizzle': "rain",
                'Rain Showers': "rain",
                'Light Rain Showers': "rain",
                'Heavy Rain Showers': "rain",
                'Rain Mist': "rain",
                'Light Rain Mist': "rain",
                'Heavy Rain Mist': "rain",
                'Hail': "rain",
                'Light Hail': "rain",
                'Heavy Hail': "rain",
                'Freezing Rain': "rain",
                'Light Freezing Rain': "rain",
                'Heavy Freezing Rain': "rain",
                'Freezing Drizzle': "rain",
                'Light Freezing Drizzle': "rain",
                'Heavy Freezing Drizzle': "rain",
                'Hail Showers': "rain",
                'Light Hail Showers': "rain",
                'Heavy Hail Showers': "rain",
                'Small Hail Showers': "rain",
                'Light Small Hail Showers': "rain",
                'Heavy Small Hail Showers': "rain",
                'Thunderstorm': "storm", // thunderstorms
                'Light Thunderstorm': "storm",
                'Heavy Thunderstorm': "storm",
                'Thunderstorms and Rain': "storm",
                'Light Thunderstorms and Rain': "storm",
                'Heavy Thunderstorms and Rain': "storm",
                'Thunderstorms and Ice Pellets': "storm",
                'Light Thunderstorms and Ice Pellets': "storm",
                'Heavy Thunderstorms and Ice Pellets': "storm",
                'Thunderstorms with Hail': "storm",
                'Light Thunderstorms with Hail': "storm",
                'Heavy Thunderstorms with Hail': "storm",
                'Thunderstorms with Small Hail': "storm",
                'Light Thunderstorms with Small Hail': "storm",
                'Heavy Thunderstorms with Small Hail': "storm",
                'Snow': "winter",        // winter weather
                'Light Snow': "winter",
                'Heavy Snow': "winter",
                'Snow Grains': "winter",
                'Light Snow Grains': "winter",
                'Heavy Snow Grains': "winter",
                'Ice Crystals': "winter",
                'Light Ice Crystals': "winter",
                'Heavy Ice Crystals': "winter",
                'Ice Pellets': "winter",
                'Light Ice Pellets': "winter",
                'Heavy Ice Pellets': "winter",
                'Low Drifting Snow': "winter",
                'Light Low Drifting Snow': "winter",
                'Heavy Low Drifting Snow': "winter",
                'Blowing Snow': "winter",
                'Light Blowing Snow': "winter",
                'Heavy Blowing Snow': "winter",
                'Snow Showers': "winter",
                'Light Snow Showers': "winter",
                'Heavy Snow Showers': "winter",
                'Ice Pellet Showers': "winter",
                'Light Ice Pellet Showers': "winter",
                'Heavy Ice Pellet Showers': "winter",
                'Snow Blowing Snow Mist': "winter",
                'Snow Blowing Snow Mist': "winter",
                'Snow Blowing Snow Mist': "winter",
                'Thunderstorms and Snow': "winter",
                'Light Thunderstorms and Snow': "winter",
                'Heavy Thunderstorms and Snow': "winter",
                'Patches of Fog': "haze",  // mist/haze/fog
                'Shallow Fog': "haze",
                'Partial Fog': "haze",
                'Mist': "haze",
                'Light Mist': "haze",
                'Heavy Mist': "haze",
                'Fog': "haze",
                'Light Fog': "haze",
                'Heavy Fog': "haze",
                'Fog Patches': "haze",
                'Light Fog Patches': "haze",
                'Heavy Fog Patches': "haze",
                'Haze': "haze",
                'Light Haze': "haze",
                'Heavy Haze': "haze",
                'Freezing Fog': "haze",
                'Light Freezing Fog': "haze",
                'Heavy Freezing Fog': "haze",
                'Spray': "haze",
                'Light Spray': "haze",
                'Heavy Spray': "haze",
                'Smoke': "dust", // sand/smoke/volcano
                'Light Smoke': "dust",
                'Heavy Smoke': "dust",
                'Volcanic Ash': "dust",
                'Light Volcanic Ash': "dust",
                'Heavy Volcanic Ash': "dust",
                'Widespread Dust': "dust",
                'Light Widespread Dust': "dust",
                'Heavy Widespread Dust': "dust",
                'Sand': "dust",
                'Light Sand': "dust",
                'Heavy Sand': "dust",
                'Sandstorm': "dust",
                'Light Sandstorm': "dust",
                'Heavy Sandstorm': "dust",
                'Dust Whirls': "dust",
                'Light Dust Whirls': "dust",
                'Heavy Dust Whirls': "dust",
                'Low Drifting Widespread Dust': "dust",
                'Light Low Drifting Widespread Dust': "dust",
                'Heavy Low Drifting Widespread Dust': "dust",
                'Low Drifting Sand': "dust",
                'Light Low Drifting Sand': "dust",
                'Heavy Low Drifting Sand': "dust",
                'Blowing Widespread Dust': "dust",
                'Light Blowing Widespread Dust': "dust",
                'Heavy Blowing Widespread Dust': "dust",
                'Blowing Sand': "dust",
                'Light Blowing Sand': "dust",
                'Heavy Blowing Sand': "dust",
                'Unknown Precipitation': "unknown", // unknown
                'Unknown': "unknown"    
            };