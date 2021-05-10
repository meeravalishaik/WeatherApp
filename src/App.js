
 import{useState,useEffect,useRef}  from 'react';
import './App.css';
import Error from './Error';
import Weather  from './Weather';
import Forecast from './Forecast';
import Loader from './Loader';
function App() {
  
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);
  const [location, setLocation] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const searchBar = useRef(null);
  const [load, setLoad] = useState(true);
  const [errorShow,setErrorShow]= useState(false);
const getInitialData =  (lat,long)=>{
 return Promise.all([ fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`),
  fetch(`${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)])
}
const getSearchData =  (search)=>{
  return Promise.all([ fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${search}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`),
   fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=${search}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)])
 }
 const getweatherData =(weatherResponse)=>{
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Nocvember',
    'December',
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
  const sunset = new Date(weatherResponse.sys.sunset * 1000).toLocaleTimeString().slice(0, 12);
  const sunrise = new Date(weatherResponse.sys.sunrise * 1000).toLocaleTimeString().slice(0, 10);

 return {
    city: weatherResponse.name,
    country: weatherResponse.sys.country,
    date,
    description: weatherResponse.weather[0].description,
    main: weatherResponse.weather[0].main,
    temp: weatherResponse.main.temp,
    highestTemp: weatherResponse.main.temp_max,
    lowestTemp: weatherResponse.main.temp_min,
    sunrise,
    sunset,
    clouds: weatherResponse.clouds.all,
    humidity: weatherResponse.main.humidity,
    wind: weatherResponse.wind.speed,
  };
  
 }
  useEffect(() => {
    const detectLocation = new Promise((resolve,reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, (error) => {
          if(error.code === error.PERMISSION_DENIED) {
            setLocation(false);
            console.error("Error detecting location.");
            setLoad(false);
          }
        });
      }
    });
    
    detectLocation.then((location) => {
      setLat(location.latitude);
      setLong(location.longitude);
      if(lat!==null && long !== null){
        getInitialData(lat,long).then(async response=>{
          const weatherResponse = await response[0].json();
          const foreCastResponse = await response[1].json();
          const weatherInfo = getweatherData(weatherResponse);
          setWeatherData(weatherInfo);
          setForecastData(foreCastResponse);
          setCity(weatherResponse.name);
          setLoad(false);
        }).catch((err)=>{
            console.log('error',err);
            setLoad(false);
          });
      //    fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      // .then(res => res.json())
      // .then(result => {
      //   setData(result)
      //   setLoad(false);
      //   console.log(result);
      // }).catch((err)=>{
      //   console.log('error',err);
      //   setLoad(false);
      // });
    }
    }).catch((error) => {
      console.log('error in coordinates',error);
      setLoad(false);
      throw error;
    });
  
  }, [lat,long])
  const onSearch=(event)=>{
//  searchBar.current.value===''?setErrorShow(false):setErrorShow(true);
 if(searchBar.current.value!=='')
{
  getSearchData(searchBar.current.value).then(async response=>{
  const weatherResponse = await response[0].json();
  const foreCastResponse = await response[1].json();
  
  if(response[0].status === 200){
    if(error){
      setError(false);
    }
   const weatherInfo = getweatherData(weatherResponse);
    await setWeatherData(weatherInfo);
    setCity(weatherResponse.name);
  }else{
    setErrorShow(true);
    await setError(true);
    console.log('error',error);
  }
  if(response[1].status === 200){
    setForecastData(foreCastResponse);
    if(!location){
      setLocation(true);
    }
  }else{
    console.log('error1',error);
    setError(true);
  }
  
}).catch((err)=>{
    console.log('error search',err);
    throw err;
  });
}else{
  setErrorShow(false)
  setError(true);
}
  }
  const onChangeSearch=(event)=>{
    setCity(event.target.value);

      }
  return (
    <>
    {!load ? (<> <div className="App"><div className="item-center">WEATHER APP</div>
     <input type="search" placeholder="Search a city"  name="search" id="search" ref={searchBar} value={city} onChange={onChangeSearch}/>
        <div className='search-div'><button className='search'  type="submit" onClick={onSearch}>Search</button></div></div>
        {error ? <Error type={errorShow}/>: location ? <> <Weather data={weatherData}/><Forecast data={forecastData}/></> :''}</>
        ): <Loader/>}
     
    </>
  );
}

export default App;
