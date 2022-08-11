import React, {useRef, useEffect} from "react";

import "./Map.css";

const Map = props => {

    const mapRef = useRef();
    const {location, zoomLevel} = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: zoomLevel
        });
        
        new window.google.maps.Marker({ position: location, map: map });
      }, [location, zoomLevel]);
    
    return (<div ref={mapRef} className={`map ${props.className}`} style={props.style} ></div>);
};

export default Map;