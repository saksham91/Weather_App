const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if (place == null)  return;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address);
    }).catch(err => console.log(err));
})

const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const windElement = document.querySelector('[data-wind]');
const temperatureElement = document.querySelector('[data-temperature]');
const rainElement = document.querySelector('[data-rain]');
const icon = new Skycons({color: '#234'});
icon.set('icon', 'partly-cloudy-day');

function setWeatherData(data, place){
    let precProb = data.precipProbability.toFixed(2);
    console.log(precProb);
    locationElement.textContent = place;
    statusElement.textContent = data.summary;
    temperatureElement.textContent = data.temperature;
    rainElement.textContent = `${precProb * 100}%`;
    windElement.textContent = data.windSpeed;
    icon.set('icon', data.icon);
    icon.play();
}