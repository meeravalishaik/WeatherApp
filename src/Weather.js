import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
function Weather({data}){
 console.log('props',data);
 const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
  } = data;
  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }
    return(
        
        <div className='result'>
<div className='location'>
<h2 className='big'>
{city}, {country}
</h2>
<h4 className='small'>
    {date}
</h4>
</div>
<div className="current">
    <div className="weather-icon">
        {weatherIcon}
    </div>
    <div>
        <h3 className='temp'>{Math.floor(temp)}&#176;</h3>
        <h4 className='small'>
    {description}
</h4>
    </div>
</div>
<div className='weather-detail'>
<div className="weather">
<h4 className='small-center'>
{Math.floor(highestTemp)}&#176;
</h4>
<span className="text">High</span>
</div>
<div className="weather">
<h4 className='small-center'>
{wind}mph
</h4>
<span className="text">Wind</span>
</div>
<div className="weather">
<h4 className='small-center'>
{sunrise}
</h4>
<span className="text">Sunrise</span>
</div>
<div className="weather">
<h4 className='small-center'>
{Math.floor(lowestTemp)}&#176;
</h4>
<span className="text">Low</span>
</div>
<div className="weather">
<h4 className='small-center'>
{humidity}%
</h4>
<span className="text">Rain</span>
</div>
<div className="weather">
<h4 className='small-center'>
{sunset}
</h4>
<span className="text">Sunset</span>
</div>
</div>
        </div>
        
    )
}
export default Weather;