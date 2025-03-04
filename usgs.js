// fetch USGS data
window.fetchEarthquakes = function() {
	let date = document.getElementById("dateInput").value;
	if (!date) { alert("Please select a date"); return; }

	let apiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${date}&endtime=${date}`;
	
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			graphicsLayer.removeAll();
			data.features.forEach(quake => {
				let [lon, lat] = quake.geometry.coordinates;
				let mag = quake.properties.mag;
				
				let point = new Graphic({
					geometry: { type: "point", longitude: lon, latitude: lat },
					symbol: { type: "simple-marker", color: "red", size: `${5 + mag * 2}px` },
					popupTemplate: { title: `Magnitude: ${mag}`, content: quake.properties.place }
				});

				graphicsLayer.add(point);
			});
		})
		.catch(error => console.error("Error fetching data:", error));
	};