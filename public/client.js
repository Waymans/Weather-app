
const ul1 = document.getElementById('weather1');
const ul2 = document.getElementById('weather2');
const ul3 = document.getElementById('weather3');
function getDay(day) {
  var d = new Date(day);
  var week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return week[d.getDay()+1]
}
  document.getElementById('input').addEventListener("submit", function(e){
    e.preventDefault();
    var q = e.target[0].value;
    var days = e.target[1].value;
    fetch('/api?place='+q+'&value='+days)
    .then((resp) => resp.json())
    .then(function(data) {
      var arr = [];
      var arr2 = [];
      console.log(data)
      ul1.innerHTML = `<li>${data.location.name}, ${data.location.region} ${data.location.country}</li>
        <li>Date: ${data.location.localtime.split(' ')[0]}</li>
        <li>${data.current.temp_f}&#8457; (${data.current.temp_c}&#8451;)</li>
        <li><img src=${data.current.condition.icon} alt=${data.current.condition.text}></img></li>
        <li>Conditions: ${data.current.condition.text}</li>
        <li>Wind: ${data.current.wind_mph} mph</li>
        <li>Wind direction: ${data.current.wind_dir}</li>
        <li>Precipitation: ${data.current.precip_mm} mm</li>
        <li>Humidity: ${data.current.humidity} &#37;</li>
        <li>Feels like: ${data.current.feelslike_f}&#8457;</li>`;
      data.forecast.forecastday.forEach(function(weather) {
        arr.push(         
          `<div class="day">
          <div>${getDay(weather.date)}</div>
          <img src=${weather.day.condition.icon} alt=${weather.day.condition.text}></img>
          <div>Max: ${weather.day.maxtemp_f}&#8457;, Min: ${weather.day.mintemp_f}&#8457;</div>  
          </div>`
        );
      });
      data.areas.forEach(function(weather) {
        arr2.push(`<li>${weather.name.split(",")[0]}</li>`)
      })
      arr2 = arr2.join('')
      ul3.innerHTML = arr2;
      arr = arr.join('')
      ul2.innerHTML = arr;
    })
    .catch(function(error) {
      console.log(error);
    });
  });
