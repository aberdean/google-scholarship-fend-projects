import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represent a single location for the list of locations.
 * When a location is clicked, pass the call to show the InfoWindow.
 *
 * TODO: onKeyPress doesn't work (onKeyDown or onKeyUp don't work either)!
 */
const Location = (props) => (
  <div key={props.location.id}>
    <div className="location-name"
         tabIndex="0"
         onClick={() => props.onToggleInfo(props.location)}
         onKeyPress={() => props.onToggleInfo(props.location)}>
      {props.location.name}
    </div>
  </div>
)

Location.propTypes = {
  location: PropTypes.object.isRequired,
  onToggleInfo: PropTypes.func.isRequired
}

export default Location;
