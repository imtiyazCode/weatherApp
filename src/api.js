import axios from "axios";
export async function fetchWeather(city, setError) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77a97069fcd0d900a1d2c5abc27f4d38`;

  try {
    const response = await axios.get(url);
    setError("");
    console.log(response.data)
    return response.data;
  } catch (error) {
    setError("City Not Found!");
    return error;
  }
}
