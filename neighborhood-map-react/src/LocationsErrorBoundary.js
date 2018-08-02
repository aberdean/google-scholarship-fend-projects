import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Catch any errors resulting from the Foursquare API call and display a message
 * in the UI explaining the problem.
 */
class LocationsErrorBoundary extends Component {
  static propTypes = {
    locationsError: PropTypes.bool,
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError || this.props.locationsError) {
      // You can render any custom fallback UI
      return (
        <div className="locations-error">
          <h1>The list of locations is not available.</h1>
          <p> Probable causes:</p>
          <ul>
            <li>There is no Internet connection</li>
            <li>The Foursquare credentials haven't been added to the project.</li>
            <li>Foursquare API service cannot be reached.</li>
          </ul>
        </div>
      );
    }
    return this.props.children;
  }
}

export default LocationsErrorBoundary;
