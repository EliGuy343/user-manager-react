import './userLocation.css'
import useFetch from '../../hooks/useFetch';
import { Spinner } from '../../components/loading/Loading';

export const UserLocation = ({open,closeWindow, user}) => {

    const {
        data,
        loading
    } = useFetch(`http://ip-api.com/json/${user.ip}`);

    if(!open)
        return null
        
    console.log(data);
    
    return (<>
        <div className="overlay">
            {loading ? (<Spinner/>) : <div className='userModal'>
                {data.status !== 'success' ?(<div className='errorDiv'>
                    <h3>Location data couldn't be loaded</h3>
                </div>) : (<div className='locationDiv'>
                        <h3>Country: {data.country}</h3>
                        <h3>ISP: {data.isp}</h3>
                        <h3>Region: {data.region}</h3>
                        <h3>Timezone: {data.timezone}</h3>
                    </div>
                )}
                <button className='closeButton' onClick={closeWindow}>
                    Close
                </button>
            </div>}
        </div>
    </>)
}
