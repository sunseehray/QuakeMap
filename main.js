// JavaScript Dates
// http://www.w3schools.com/Jsref/jsref_obj_date.asp
const today = new Date();

let yesterday = new Date(); // initialize as today
const d = yesterday.getUTCDate(); // get yesterday's date
yesterday.setUTCDate(d - 1); // set yesterday's date

// Convert dates to ISO for USGS use
const todayISO = today.toISOString();
const yesterdayISO = yesterday.toISOString();

// set the api with parameters for dates from past 24 hours, 
// starttime = yesterday, endtime = today
// Reference: https://earthquake.usgs.gov/fdsnws/event/1/
// METHOD: query
// PARAMETERS: format to get geojson, starttime and endtime to get data from past 24 hours
let apiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${yesterdayISO}&endtime=${todayISO}`;


let graphicsLayer;
// creating graphics layer and graphic point are based from arcgis tutorial
function generateQuakeMap(filter) {
    require(["esri/Graphic", "esri/layers/GraphicsLayer"], (Graphic, GraphicsLayer) => {
        const arcgisMap = document.querySelector("arcgis-map");

        if(!graphicsLayer) {
            graphicsLayer = new GraphicsLayer();
            arcgisMap.addLayer(graphicsLayer);
        } else {
            graphicsLayer.removeAll();
        }

        // set template for popup
        const popupTemplate = {
            title: "{Name}",
            content: "{Description}"
        };
    
        // fetch data
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.features.forEach(incidence => {
                    // set longitude and latitude for points
                    let [longitude, latitude] = incidence.geometry.coordinates;
                    
                    // set magnitude of incidence
                    let magnitude = incidence.properties.mag;
                    
                    // create points based on lon, lat, and magnitude
                    let point = new Graphic({
                        geometry: { 
                            type: "point", 
                            longitude: longitude, 
                            latitude: latitude 
                        },
                        symbol: { 
                            type: "simple-marker", 
                            color: "orange", 
                            size: `${3 + magnitude * 2}px`, // modify size based on magnitude
                            width: 1
                        },
                        attributes: {
                            Name: `Magnitude: ${magnitude}`,
                            Description: incidence.properties.place
                        },
                        popupTemplate: popupTemplate,
                    });

                    // filter
                    if (filter == "all") {
                        graphicsLayer.add(point);
                    }
                    else if (filter == "greater" && magnitude >= 3.5) {
                        graphicsLayer.add(point);
                    }
                    else if (filter == "less" && magnitude < 3.5) {
                        graphicsLayer.add(point);
                    }
                });
            })
            .catch(error => console.error("Error fetching data:", error));

        });
    }

document.addEventListener("DOMContentLoaded", () => {
    const quakeFilter = document.getElementById("quakeFilter");
    quakeFilter.addEventListener("change", () => {
        let filter = quakeFilter.value;
        generateQuakeMap(filter);
    });

    generateQuakeMap("all"); //default - View All
});
