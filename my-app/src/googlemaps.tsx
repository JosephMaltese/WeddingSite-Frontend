import React, { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Location {
    latitude: number;
    longitude: number;
}

const Map = () => {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            console.log("Map init")
            const loader = new Loader({ 
                apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary('maps');
            const { Marker } = await loader.importLibrary('marker');
            const { InfoWindow } = await loader.importLibrary("maps");

            const position = {
                lat: 46.8139, 
                lng: -71.2082,
            }
            

            // map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 15.5,
            }


            const hotelLocations = [
                { lat: 46.814314, lng: -71.209065, name: "Monsieur Jean" },
                { lat: 46.814518271051085, lng: -71.21079646323561, name: "Hôtel Manoir Victoria" },
                { lat: 46.81226062116052, lng: -71.2103559196428, name: "Hôtel Champlain Vieux Québec" },
                { lat: 46.81307881699412, lng: -71.2078235637945, name: "Clarendon Hotel" },
                { lat: 46.81332538866241, lng: -71.21206532727204, name: "Les Lofts 1048" },
                { lat: 46.81455, lng: -71.209065, name: "Pickup/Dropoff Location" },
              ];

            // Setup the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);


            hotelLocations.forEach((hotel) => {
                console.log("Hotel:", hotel);
                const hotelPosition = {
                    lat: hotel.lat,
                    lng: hotel.lng,
                }
                
                const busIcon = '/images/front-of-bus.png'
                const marker = new Marker({
                        map: map,
                        position: hotelPosition,
                        icon: hotel.name === "Pickup/Dropoff Location" ? {
                            url: busIcon,  
                            scaledSize: new google.maps.Size(30, 30),
                        } : undefined
                });



                const infowindow = new InfoWindow({
                    content: `
<div style="
    min-width: 200px;
    width: fit-content;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-center;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: Arial, sans-serif;
    position: relative;
    margin: 0;
    overflow: visible;
    background: transparent;
    margin-right: 10px;
">
    <span style="color: #333; font-size: 1rem; font-weight: bold; overflow: visible; overflow: hidden">
        ${hotel.name}
    </span>
</div>
                    `,
                });

                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });

            });


        }
        initMap();

    }, []);


    return (
        <div style={{width: '900px', maxWidth: '90%', height: '500px', margin: 'auto'}} ref={mapRef} />
  )
}

export default Map;