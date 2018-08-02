import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Catch any errors resulting from the Google Maps API call and display a
 * message in the UI explaining the problem.
 */
class MapErrorBoundary extends Component {
  static propTypes = {
    mapError: PropTypes.bool,
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
    if (this.state.hasError || this.props.mapError) {
      // You can render any custom fallback UI
      return (
        <div className="map-error">
          <h1>The map is not available.</h1>
          <p> Probable causes:</p>
          <ul>
            <li>There is no Internet connection</li>
            <li>The Google Maps API key has not been added to the project.</li>
            <li>Google Maps API service cannot be reached.</li>
          </ul>
        </div>
      );
    }
    return this.props.children;
  }
}

export default MapErrorBoundary;
