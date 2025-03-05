# Overview

For this project, I am building a map displaying earthquake data from USGS using ArcGIS. This project called QuakeMap displays earthquake incidents in an area for the past 24 hours. A filter lets the user specify which magnitude to display. If there are incidents, it will be shown by a graphic point on the map. Clicking on a point will give details on magnitude and place.

[Software Demo Video](https://youtu.be/6eg74PduIbo)

# Development Environment

ArcGIS - Mapping tool
HTML, CSS - Frontend Development
JavaScript - Backend Development
VS Code - IDE
Git, GitHub - Version Control

# Useful Websites

* [ArcGIS Maps DSK for JavaScript](https://developers.arcgis.com/javascript/latest/tutorials/display-a-map/)
* [USGS Earthquake API Documentation](https://earthquake.usgs.gov/fdsnws/event/1/)

# Future Work

* Improve Big O notation by refactoring the fitler from inside the generateQuakeMap() to the data fetched from USGS
* Include earthquakes from other dates and allow users to indicate date through a filter
* Develop into a Node.js framework to allow async functions for fetching the USGS data
