
<script>
export default {
  data() {
    return {
      startTime: null,
      elapsedTime: 0,
      isRunning: false,
    };
  },
  computed: {
    formatTime() {
      const milliseconds = this.elapsedTime % 1000;
      const seconds = Math.floor((this.elapsedTime / 1000) % 60);
      const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
      const hours = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24);

      return `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}.${this.formatNumber(milliseconds, 3)}`;
    },
  },
  methods: {
    startStopwatch() {
      if (!this.isRunning) {
        this.startTime = Date.now() - this.elapsedTime;
        this.isRunning = true;
        this.updateTime();
      }
    },
    stopStopwatch() {
      if (this.isRunning) {
        this.isRunning = false;
        clearTimeout(this.timer);
      }
    },
    resetStopwatch() {
      this.startTime = null;
      this.elapsedTime = 0;
      this.isRunning = false;
      clearTimeout(this.timer);
    },
    updateTime() {
      this.elapsedTime = Date.now() - this.startTime;
      this.timer = setTimeout(this.updateTime, 10);
    },
    formatNumber(value, digits = 2) {
      return value.toString().padStart(digits, '0');
    },
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
};
</script>


<template>
  <div class="container">
    <div class="stopwatch-widget">
      <h1>Timer</h1>
      <div class="time">{{ formatTime }}</div>
      <div class="buttons">
        <button @click="startStopwatch" :disabled="isRunning">Start</button>
        <button @click="stopStopwatch" :disabled="!isRunning">Stop</button>
        <button @click="resetStopwatch" :disabled="isRunning">Reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.stopwatch-widget {
  text-align: center;
  padding: 100px;
  width: 800px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
  -webkit-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
}

.time {
  font-size: 3rem;
  margin-bottom: 20px;
}
</style>
