<template>
    <div class="container">
        <div class="location-widget">
            <h1>Your Location</h1>
            <div v-if="latitude && longitude">
                <p>Latitude: {{ latitude }}</p>
                <p>Longitude: {{ longitude }}</p>
            </div>
            <div v-else>
                <p>Finding your location...</p>
            </div>
            <div class="input-container">
                <div class="location-input">
                    <label for="latitude">Latitude:</label>
                    <input type="text" id="latitude" v-model="inputLatitude" />
                </div>
                <div class="location-input">
                    <label for="longitude">Longitude:</label>
                    <input type="text" id="longitude" v-model="inputLongitude" />
                </div>
            </div>

            <button @click="fetchLocationDetails">Find Location Details</button>

            <h3>Location Details</h3>
            <div class="location-result" v-if="foundLocation">
                <p>{{ foundLocation.components.country }}</p>
                <p>{{ foundLocation.components.region }}</p>
                <p>{{ foundLocation.components.city }}</p>
                <p>{{ foundLocation.components.street }}</p>
                <p>Postal Code: {{ foundLocation.components.postcode }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            latitude: null,
            longitude: null,
            inputLatitude: '',
            inputLongitude: '',
            foundLocation: null,
        };
    },
    mounted() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        }
    },
    methods: {
        getPosition(position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
        },
        async fetchLocationDetails() {
            try {
                const apiKey = '92591005a7b94008909d59a64b6d2a49';
                const latitude = this.inputLatitude || this.latitude;
                const longitude = this.inputLongitude || this.longitude;
                const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    latitude + ',' + longitude
                )}&key=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const location = data.results[0];
                    this.foundLocation = location;
                    console.log('Location:', location);
                    // Lakukan sesuatu dengan data lokasi yang ditemukan
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        },
    },
};
</script>
  
<style scoped>
.input-container {
    display: flex;
    justify-content: center;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;

}


.location-widget {
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 800px;
    padding: 100px;
    box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
    -webkit-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
    -moz-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
}

.location-widget h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

.location-widget p {
    color: black;
}

.location-input {
    margin-top: 20px;
}

.location-input label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 16px;
}

.location-input input {
    width: 200px;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.location-input button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.location-input button:hover {
    background-color: #45a049;
}

.location-input button:disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
}

.location-details {
    margin-top: 20px;
    text-align: left;
}

.location-details h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 18px;
}

.location-details p {
    margin: 5px 0;
    color: #666;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
  
  