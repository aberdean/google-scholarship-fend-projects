# Restaurant Reviews - Stage 1
---
#### _Only Stage 1 is part of the Front-End Web Developer Nanodegree_

## Table of Contents

- [Background](#background)
- [Installation](#install)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Background

In **Stage 1** of this project, a static restaurant reviews website is converted into one that is responsive on different sized displays. In addition, accessibility is implemented, so the site is ready for screen reader and/or keyboard use.
Finally, a service worker is implemented, to allow for a seamless offline experience.

### Installation

After cloning or downloading this project, you will need a local server to run
it. The simplest method is using Python's simple HTTP server.
1. Install Python 2.x or Python 3.x from the [Python website](https://www.python.org/downloads/)
2. In your terminal or command line, navigate to the directory containing this project
3. If you installed Python 2, type `python -m SimpleHTTPServer 3000` or, if you
installed Python 3, type `python3 -m http.server 3000`

Another, more convenient method is the following:
1. Install [Node.js](https://nodejs.org/en/)
2. Install [Browersync](https://browsersync.io/) typing in the terminal or
command line `npm install -g browser-sync`
3. In your terminal or command line, navigate to the directory containing this
project
4. Type `browser-sync -w`

### Usage

To see the Google Maps served by the website, you need to get a [Google Maps API
Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
and substitute the `YOUR_GOOGLE_MAP_API_KEY` text with your own API key in both the index.html and the restaurant.html files.

Then, with your server running, point your browser to `http://localhost:3000`
and enjoy!

You can search restaurants in New York by neighborhood or by cuisine. You can learn each restaurant's address and opening hours, find the restaurant on the
map, and read the reviews other customers wrote.

### Credits
The starter code for the static restaurant reviews website is from [Udacity](https://github.com/udacity/mws-restaurant-stage-1)
