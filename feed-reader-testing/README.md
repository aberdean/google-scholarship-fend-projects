# Feed Reader Testing

This project is a demonstration on how to test an RSS Feed Reader JavaScript
application using the [Jasmine](https://jasmine.github.io) framework.

## Table of Contents

- [Background](#background)
- [Installation](#installation)
- [Tests Included](#tests-included)

## Background

The application being tested is an [RSS Feed Reader provided by Udacity]
(https://github.com/udacity/frontend-nanodegree-feedreader). 

## Installation

After downloading this repository, launch the `index.html` file.
It will open up in your predefined browser and automatically run the tests.
When the tests finish running, scroll down to the bottom of the page to
see the results.

## Tests Included

The tests included are the following:

### RSS Feeds

1. Ensure that the RSS feeds are defined.
2. Ensure that each feed has a defined, non-empty URL.
3. Ensure that each feed has a defined, non-empty name.

### Menu

1. Ensure the menu is hidden by default.
2. Ensure that clicking on the menu icon shows the menu.
3. Ensure that clicking on the menu icon again hides the menu.

### Initial Entries

1. Ensure that each feed contains at least one feed entry.

### New Feed Selection

1. Ensure that switching to a new feed actually changes the content.
