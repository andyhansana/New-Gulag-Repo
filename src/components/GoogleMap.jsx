
import React, {useState, useEffect} from 'react'
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';
import { usePosition } from "use-position";


const containerStyle = {
    width: '600px',
    height: '600px'
  };
  
  const center = {
    lat: 41.8781, lng: -87.6298
  };
  
  function GoogleMapComp() {
    const [oLat, setLat] = useState(center.lat);
    const [oLng, setLng] = useState(center.lng);
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    const { latitude, longitude, error } = usePosition();


    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Inside Get Location")
          setLat(parseFloat(position.coords.latitude))
          setLng(parseFloat(position.coords.longitude))

        })
      }

    // useEffect(() =>{
    //     console.log("Inside Use Effect")
    //     getLocation()
    //   },[])
    useEffect(() => {
        console.log("use eff");
        if (latitude && longitude && !error) {
          // Fetch weather data here.
          setCurrentPosition({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
          
          console.log(currentPosition)

        }
      }, [latitude, longitude, error]);


    return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          
        >
          <MarkerF position={currentPosition}/>
        </GoogleMap>
    )
  }
  
  export default React.memo(GoogleMapComp)