import React, {Component} from 'react';

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  getData(coords) {
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;

    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  componentDidMount() {
    this.getData(this.props.coords);
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.coords);
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {((weatherData.main.temp - 32) / 1.8).toFixed(1)} °C</p>
        <p>High: {((weatherData.main.temp_max - 32) / 1.8).toFixed(1)} °C</p>
        <p>Low: {((weatherData.main.temp_min - 32) / 1.8).toFixed(1)} °C</p>
        <p>Wind Speed: {(weatherData.wind.speed * 0.44704).toFixed(1)} m/sec</p>
      </div>
    );
  }
}
export default WeatherDisplay;
