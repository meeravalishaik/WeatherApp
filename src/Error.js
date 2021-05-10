import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown,faGrinBeamSweat} from '@fortawesome/free-solid-svg-icons';
import './Error.css';
function Error(props){
    console.log('prop',props.type);
       return(
           <>
           <div className='error-holder'>
               <span className='error-icon'>
               <FontAwesomeIcon icon={props.type ? faFrown : faGrinBeamSweat } />
               </span>
               <span>{!props.type?'Please enter a city name..':'Sorry, the specified city was not found...'}</span>
           </div>
           
           </>
       )
   }
   export default Error;