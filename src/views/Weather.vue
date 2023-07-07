<template>
  <div class="container">
    <div class="weather-widget">
      <h1 class="widget-title">Weather Widget</h1>
      <div class="location-input">
        <label for="location">Enter Location:</label>
        <input type="text" required id="location" v-model="location" />
        <button @click="fetchWeatherData">Get Weather</button>
      </div>
      <div v-if="weatherData" class="weather-data">
        <p class="location">Location: {{ weatherData.name }}</p>
        <p v-if="weatherData.main" class="temperature">
          Temperature: {{ weatherData.main.temp }}°K
        </p>
        <p v-if="weatherData.weather" class="description">
          Description: {{ weatherData.weather[0].description }}
        </p>
      </div>
      <p v-else>Loading weather data...</p>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      location: '',
      weatherData: null
    };
  },
  methods: {
    async fetchWeatherData() {
      try {
        const apiKey = 'b7bfca7b27a3485144fea086c50d09dc';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        this.weatherData = data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  }
};
</script>
  
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.weather-widget {
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 800px;
  min-height: 400px;
  padding: 100px;
  box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
  -webkit-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
}

.widget-title {
  margin-top: 0;
  color: #333;
}

.location-input {
  margin-bottom: 10px;
}

.weather-data {
  margin-top: 10px;
}

.location {
  font-size: 18px;
  font-weight: bold;
}

.temperature {
  font-size: 24px;
  color: #ff5722;
}

.description {
  font-size: 16px;
}

label {
  font-size: larger;
  margin-right: 10px;
}

input {
  border: none;
  height: 25px;
  border-radius: 5px;
}

input:focus {
  outline: 1px solid white;
  background-color: #ccc;
}

input {
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #464545;
  height: 38px;
}

button {
  background: #FFE5CC;
}

button:hover {
  background: white;
}
</style>
  
