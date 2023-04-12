import { useGetData } from "@/hooks";
import { WeatherWrapper } from "./styled";

function Weather() {
  const [data] = useGetData("/all/getWeather");

  if (data?.length) {
    const { province, temperature, weather } = data[0];
    return (
      <WeatherWrapper>
        {province} {temperature}°C {weather}
      </WeatherWrapper>
    );
  }
  return null;
}

export default Weather;
