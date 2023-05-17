import { useGetData } from "@/hooks";
import styled from "styled-components";

const WeatherWrapper = styled.div`
  color: #fff;
  margin-left: 20px;
  font-size: 13px;
`;

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
