async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  const loader = document.getElementById('loading');
  resultDiv.innerHTML = "";
  if (!location) {
    resultDiv.innerHTML = "<p>⚠️ Please enter a location.</p>";
    return;
  }
  loader.style.display = "block";

  const apiKey = "cea0c71ecf864211bfa120447250608";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();
    const { temp_c, condition } = data.current;
    const city = data.location.name;
    const country = data.location.country;

    resultDiv.innerHTML = `
      <div class="weather-card">
        <img src="${condition.icon}" alt="Weather icon" class="weather-icon"><br><br>
        <strong>${city}, ${country}</strong><br>
        🌡️ <strong>${temp_c}°C</strong><br>
        ☁️ <em>${condition.text}</em>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = "❌ Could not fetch weather. Please try another location.";
    console.error(error);
  } finally {
    loader.style.display = "none";
  }
}

// Add this to enable Enter key search
document.getElementById('locationInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    getWeather();
  }
});