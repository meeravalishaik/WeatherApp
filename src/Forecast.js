
 import{useRef,createRef}  from 'react';
 import './Forecast.css';
import DetailedInfo from './DetailedInfo';
function Forecast({data}){
    const { city, list } = data;
    console.log('forecast',city,list); 


   const groupByDays = data => {
        return (data.reduce((list, item) => {
          const forecastDate = item.dt_txt.substr(0,10);
          list[forecastDate] = list[forecastDate] || [];
          list[forecastDate].push(item);
    
          return list;
        }, {}));
      };
      const tiles = Object.values(groupByDays(list));
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;
    console.log('test tiles',forecastTiles);

      // Returns week of the day
      const elementsRef = useRef(forecastTiles.map((item,index) => createRef(`div-${index}`)));
    const   getDayInfo = data => {
        const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const date =new Date();
        let weekday = new Date(data[0].dt * 1000).toLocaleString('en-us', {weekday:'long'});
console.log('Weekday',weekday);
        console.log('date test',date, date.getDay(),daysOfWeek[date.getDay()])
        return weekday;
      };
    
      // Fetches the icon using the icon code available in the forecast data.
      const getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;
    
      // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
      const getInfo = (data, min=[], max=[], humidity=[]) => {
        data.map(item => {
          max.push(item.main.temp_max);
          min.push(item.main.temp_min);
          humidity.push(item.main.humidity);
        });
    
        const minMax = {
          min: Math.round(Math.min(...min)),
          max: Math.round(Math.max(...max)),
        };
    
        // Gets the day's average humdity
        const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);
    
        return (
          <div className="weather-info">
            <div className="min-max">
              <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
            </div>
            <div className="more-info">
              {`Avg. Humidity: ${avgHumdity}%`}
            </div>
          </div>
        );
      };
    
      // Toggles accordion to display hourly weather information
      const showMoreInfo = (index) => {
        const elm = elementsRef.current[index];
        const expandedElment = document.querySelector(".expanded");
    
        elm.current.classList.add("expanded");
        expandedElment !== null && expandedElment.classList.remove("expanded");
      }
return(
    <div className='forecast'>
    <div>
        <h3 className='medium'>Forecast</h3></div>
        <div className="forecast-tiles">
        {forecastTiles.map((item, i) => (
          <div
            className={`forecast-tile tile-${i}`}
            key={i}
            ref={elementsRef.current[i]}
            onClick={() => {showMoreInfo(i)}}
          >
            <div className="primary-info">
              <div className="icon">
                <img alt={'icon'+i }src={getIcon(item)} />
                {getDayInfo(item)}
              </div>
              {getInfo(item)}
            </div>
            <div className="detailed-info" key={i}>
              <DetailedInfo data={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
);
}

export default Forecast;