import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList';
import MapErrorBoundary from './MapErrorBoundary';
import LocationsErrorBoundary from './LocationsErrorBoundary';
import escapeRegExp from 'escape-string-regexp';
import {MdMenu} from 'react-icons/lib/md'
import './App.css';

/**
 * Foursquare credentials.
 * NB: Make sure to add your Foursquare credentials below!
 */
const foursquare = require('react-foursquare')({
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET'
})

/**
 * Parameters to use in the Foursquare API call.
 * NB: Do not change these!
 */
const params = {
  /** Latitude and longitude */
  'll': '45.6480,13.7768',
  /** Most popular places */
  'section': 'topPicks',
  /** Maximum 20 locations */
  'limit': 20
}

/**
 * Track all changes in the application and updates the components as needed.
 * When this component is mounted, call the Foursquare API to retrieve a list
 * of 20 most popular locations in Trieste, Italy.
 * When the user clicks on a location in the list or on a marker in the map,
 * show the corresponding InfoWindow and animate the marker.
 * Update the filtered locations for the location searchbox.
 * Hide and show the list of locations when the user clicks on the hamburger
 * menu icon.
 */
class App extends Component {
  
  state = {
      /** The 20 locations retrieved from Foursquare */
      locations: [],
      /** The subset of locations matching the text entered in the searchbox */
      filteredLocations: [],
      /** The location selected by the user from the list or from the map */
      location: {},
      /** The query entered in the searchbox */
      query: "",
      /** The animation for the marker in the map */
      animation: null,
      /** Detect an error with the Foursquare API call */
      locationsError: false,
      /** Detect missing API key for Google Maps API call */
      mapError: false,
      /** Track the visibility for the list of locations */
      navVisibility: true
  }

  componentDidMount() {
    /** 
     * Retrieve the 20 most popular locations from Foursquare and update the
     * state of the locations, the filtered locations that initially are equal
     * to all 20 locations, and detect any error during the API call.
     *
     * @param {object} params The params constant defined above
     *
     * @return The new state of locations and filteredLocations, and whether or
     *         not the API call returned an error
     */
    foursquare.venues.explore(params)
      .then(res => {
        res.response.groups[0].items.map(item => {
          return this.setState({ locations: this.state
                                                .locations.concat([item.venue]),
                                 filteredLocations: this.state
                                        .filteredLocations.concat([item.venue]),
                                 locationsError: false })
        })
      }).catch(err => {
        return this.setState({ locationsError: true })
      })

    /**
     * Check errors related to the Google Maps API key (i.e., API key missing,
     * unauthorized, etc.).
     */
    window.gm_authFailure = () => {
      return this.setState({ mapError: true })
    }
  }

  /**
   * Show the InfoWindow when a user clicks on a location from the list or on
   * a marker from the map. Also, animate the corresponding marker. Stop the
   * animation after 2 seconds.
   *
   * @param {object} item The location selected by the user
   */
  toggleInfo = (item) => {
    this.setState({
      location: item,
      animation: 1
    })
    setTimeout(() => {
      this.setState({
        animation: null
      })
    }, 2000)
  }

  /**
   * Filter the list of locations and the markers on the map to match the
   * query entered by the user in the searchbox. When the query is empty,
   * show all 20 locations.
   *
   * @param {string} query The query entered by the user in the searchbox
   */
  updateFilter = (query) => {
    if (query) {
      this.setState({ query: query })
      const nameMatch = new RegExp(escapeRegExp(query), 'i')
      this.setState({
        filteredLocations: this.state.locations
                           .filter((location) => nameMatch.test(location.name))
      })
    } else {
      this.setState({
        query: "",
        filteredLocations: this.state.locations
      })
    }
  }

  /**
   * When the user clicks on the hamburger menu icon, toggle the visibility
   * of the list of locations. When the list is hidden, allow the map to
   * expand to the entire page.
   */
  toggleNavVisibility = () => {
    document.querySelector("section").style.width="100%"
    this.setState({ navVisibility: !this.state.navVisibility })
  }

  render() {
    return (
      <div className="App">
        <header>
          <MdMenu size="30"
                  role="navigation"
                  aria-label="Click to toggle popular places list menu"
                  style={{ float: "left", margin: "0 0 0 10px" }}
                  tabIndex="0"
                  onClick={this.toggleNavVisibility}
                  onKeyPress={this.toggleNavVisibility} />
          <h1 tabIndex="0">
            Visit Trieste, Italy
          </h1>
        </header>
        <main role="main">
          {this.state.navVisibility && 
            <nav>
              <LocationsErrorBoundary locationsError={this.state.locationsError}>
                <LocationList locations={this.state.filteredLocations}
                              onUpdateFilter={this.updateFilter}
                              onToggleInfo={this.toggleInfo} />
              </LocationsErrorBoundary>
            </nav>
          }
          <section>
            <MapErrorBoundary mapError={this.state.mapError}>
              <Map 
                isMarkerShown
                locations={this.state.filteredLocations}
                location={this.state.location}
                animation={this.state.animation}
                onToggleInfo={this.toggleInfo} />
            }
            </MapErrorBoundary>
          </section>

        </main>
        <footer tabIndex="0">
          <h3>Sources: Map by Google Maps, Locations by Foursquare</h3>
        </footer>
      </div>
    );
  }
}

export default App;
