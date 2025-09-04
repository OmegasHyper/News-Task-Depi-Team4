var weatherApiKey = '1fe5c13a8b2194d68b9fef7ddcc69fae';

function getLocation() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            var weatherLongitude = position.coords.longitude;
            var weatherLatitude = position.coords.latitude;
            var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherLatitude}&lon=${weatherLongitude}&appid=${weatherApiKey}&units=metric`;
            
            console.log(weatherApiUrl);
            
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: weatherApiUrl,
                success: function(result) {
                    var content = `
                        <div class="card-body text-center">
                            <h5 class="card-title mb-3">
                                <i class="fas fa-cloud-sun me-2"></i>Weather
                            </h5>
                            <div class="weather-icon">
                                <i><img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png"></i>
                            </div>
                            <p class="weather-location">${result.name}, ${result.sys.country}</p>
                            <p class="weather-temp">${Math.floor(result.main.temp)}°C</p>
                            <small class="d-block mt-2" style="opacity: 0.8;">
                                <i class="fas fa-eye me-1"></i>${result.weather[0].description}
                            </small>
                        </div>
                    `;
                    $('#weather-show').html(content);
                },
                error: function(result) {
                    console.log('Weather API Error:', result);
                    $('#weather-show').html('<p>Unable to load weather data</p>');
                }
            });
        },
        (error) => {
            console.error('Location Error:', error);
            $('#weather-show').html('<p>Unable to get location</p>');
        }
    );
}