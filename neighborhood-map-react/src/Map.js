import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, 
         withGoogleMap, 
         GoogleMap, 
         Marker, 
         InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

/**
 * Represent the Google map, with markers and info windows.
 * For each location, add and show a marker on the map.
 * When a marker is clicked, pass a call to open the InfoWindow showing
 * additional details for that location.
 */
const Map = compose(
  withProps({
    /**
     * Substitute the YOUR_GOOGLE_MAPS_API_KEY below with your actual Google API key
     */
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=YOUR_GOOGLE_MAPS_API_KEY",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 45.6504, lng: 13.7700 }}>

    {props.isMarkerShown && props.locations.map((item) => {
        return (
          <Marker key={item.id}
                  title={item.name}
                  position={{ lat: Number(item.location.lat), 
                              lng: Number(item.location.lng) }}
                  /** Animate the marker when a location is selected */
                  animation={props.location.id === item.id && props.animation}
                  onClick={() => props.onToggleInfo(item)}>
            {/** When a location is selected, display the InfoWindow */}
            {props.location.id === item.id &&
              <InfoWindow onCloseClick={() => props.onToggleInfo(item)}>
                <div tabIndex="0">
                 <h1>{item.name}</h1>
                 <h2>{item.categories[0].name}</h2>
                 <p>{item.location.address}</p>
                </div>
              </InfoWindow>
            }
          </Marker>     
        )
      })
    }
  </GoogleMap>
)

Map.propTypes = {
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
  isMarkerShown: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object,
  animation: PropTypes.number,
  onToggleInfo: PropTypes.func.isRequired
}

export default Map;
