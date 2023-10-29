import { useQuery } from '@/hooks';
import styled from 'styled-components';

const WeatherWrapper = styled.div`
  color: #fff;
  margin-left: 20px;
  font-size: 13px;
`;

function Weather() {
  const { data } = useQuery({ url: '/all/getWeather' });

  if (data?.length) {
    const [{ province, temperature, weather }] = data;
    return (
      <WeatherWrapper>
        {province} {temperature}°C {weather}
      </WeatherWrapper>
    );
  }
  return null;
}

export default Weather;
