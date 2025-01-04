// import React from 'react'
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const MapComponent = async () => {
//     const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
//     const mapStyles = {
//         height: "400px",
//         width: "80%",
//         margin: "auto",
//     };

//     const center = {
//         lat: 46.8139, // Latitude for the pickup location
//         lng: -71.2082, // Longitude for the pickup location
//       };
    
//     // List of hotel locations with coordinates
//     const hotelLocations = [
//     { lat: 46.8165, lng: -71.2072, name: "Hotel A" },
//     { lat: 46.8123, lng: -71.2051, name: "Hotel B" },
//     { lat: 46.8187, lng: -71.2099, name: "Hotel C" },
//     ];

//     return (
//       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={12}>
//         {hotelLocations.map((hotel) => (
//           <Marker label={hotel.name} position={hotel.position} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   )
// }

// export default MapComponent





import React, { useEffect, useRef } from "react";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      // Wait for the Google Maps script to load
      if (!window.google || !window.google.maps) {
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (window.google && window.google.maps) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }

      // Initialize the map
      const center = {
        lat: 46.8139, // Latitude for the pickup location
        lng: -71.2082, // Longitude for the pickup location
      };

      const hotelLocations = [
        { lat: 46.814314, lng: -71.209065, name: "Monsieur Jean" },
        { lat: 46.814518271051085, lng: -71.21079646323561, name: "Hôtel Manoir Victoria" },
        { lat: 46.81226062116052, lng: -71.2103559196428, name: "Hôtel Champlain Vieux Québec" },
        { lat: 46.81307881699412, lng: -71.2078235637945, name: "Clarendon Hotel" },
        { lat: 46.81332538866241, lng: -71.21206532727204, name: "Les Lofts 1048" },
        { lat: 46.81455, lng: -71.209065, name: "Pickup/Dropoff Location" },
      ];

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        mapId: '7e7631dc4e2f624a'
      });

      // Import and add Advanced Markers
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      hotelLocations.forEach(({ lat, lng, name }) => {

        new AdvancedMarkerElement({
          map,
          position: { lat, lng },
          title: name,
        });
      });
    };

    loadGoogleMaps();
  }, []);

  return <div ref={mapRef} style={{ height: "400px", width: "80%", margin: 'auto' }} />;
};

export default MapComponent;