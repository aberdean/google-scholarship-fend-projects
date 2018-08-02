# Neighborhood Map Project

This app allows you to see the 20 currently most popular locations in Trieste,
Italy. Every time you run the app, the locations are updated to the most
popular ones at the time the app is run.

This project was bootstrapped with [Create React App](https://github.com/
facebookincubator/create-react-app).

For more info on Create React App, please have a look [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/
README.md).

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Credits](#credits)

## Description

On the main page, you'll be shown a map of Trieste, Italy, with the 20 locations
that are most popular at the time you run the app. Each location is represented
by a marker on the map. On the left side, there is a list of locations. You can
filter the locations to restrict your search to only those you're interested in.

Clicking on a marker or on a location from the list will open up a small window
on the map detailing the type of location and its address.

The list of locations can be hidden to display the map on the entire screen,
which can be particularly useful for smaller devices (e.g., mobile phones).

Once you run the app for the first time, you can run it again without an
Internet connection. In that case, the same list of locations will be shown,
but you won't get an updated list.

## Installation

```
IMPORTANT: Before you can run this project, you need to have a Google Maps API
key and a Foursquare client ID and client secret.
```
* You can get a Google Maps API key [here](https://developers.google.com/maps/
documentation/javascript/get-api-key)
* Insert your Google Maps API key in the Map.js Component, following the
  instructions provided in the code
* You can get your Foursquare credentials [here](https://developer.foursquare.com/
docs/api/getting-started)
* Insert your Foursquare client ID and client secret in the App.js Component,
  following the instructions provided in the code

When you are all set with the credentials, you can follow these steps to run
the project:

* Clone or download this repository
* Navigate to the directory where you have cloned or downloaded this project
* On the terminal or command line, type `npm install` or `yarn` to install all
  dependencies
* On the terminal or command line, type `npm start` or `yarn start` to launch
  the app on your browser

## Folder Structure

After creation, your project should look like this:

```bash
neighborhood-map-react/
  node_modules/
  public/
    favicon.png
    index.html
    manifest.json
    sw.js
  src/
    react-foursquare/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    Location.js
    LocationList.js
    LocationsErrorBoundary.js
    Map.js
    MapErrorBoundary.js
    sw-register.js
  .gitignore
  package.json
  README.md
  yarn.lock
```

## Credits

* The map is provided by [Google Maps](https://www.google.com/maps) using
[React Google Maps](https://github.com/tomchentw/react-google-maps)

* Popular locations are provided by [Foursquare](https://foursquare.com/) using
[react-foursquare](https://github.com/foursquare/react-foursquare)

* Hamburger menu icon courtesy of [Material Design icons](http://google.github.io/material-design-icons/) and [React Icons](https://github.com/react-icons/react-icons)
