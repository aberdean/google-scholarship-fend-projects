import React from 'react';
import Location from './Location';
import PropTypes from 'prop-types';

/**
 * Represent a list of locations and a search element to filter locations
 * on the list and also markers for those locations on the map.
 */
const LocationList = (props) => (
      <div className="location-list">
        <h2 tabIndex="0">Popular Places</h2>
        <div role="search">
          <label htmlFor="filter">Filter locations</label>
          <input type="text"
                 name="filter"
                 className="filter-box"
                 placeholder="Filter locations"
                 value={props.query}
                 onChange={(event) => props.onUpdateFilter(event.target.value)} />
        </div>
        <ul>
          {props.locations.map((location) => (
            <li key={location.id}>
              <Location location={location}
                        onToggleInfo={props.onToggleInfo} />
            </li>
          ))}
        </ul>
      </div>
)

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleInfo: PropTypes.func.isRequired,
  query: PropTypes.string,
  onUpdateFilter: PropTypes.func.isRequired
}

export default LocationList;
