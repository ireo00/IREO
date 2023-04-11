// Define mapbox access token
//Add default public map token from my Mapbox account 
mapboxgl.accessToken = 'pk.eyJ1IjoiaXJlbyIsImEiOiJjbGRtMTVrbGkwNHh5M3B0Yjd5YnF3cHNvIn0.KNtbmsY84dCZpXiXy91keg';

// Create basemap, set the starting zoom level and position
const map = new mapboxgl.Map({
    container: 'ttcmap', // container ID in html
    style: 'mapbox://styles/ireo/cle1oxmx8005c01pflmohg567', // Add link to my stylesheet
    center: [-79.389, 43.725], // starting position [longitude, latitude]
    zoom: 11.2, // starting zoom level
    bearing: -15.5, //angle rotation of map
    maxBounds: [
        [-79.8, 43.4], // Southwest coords
        [-78.8, 44]] // Northeast coords
});

/*--------------------------------------------------------------------
ADDING MAPBOX CONTROLS AS ELEMENTS ON MAP
--------------------------------------------------------------------*/
//Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());

/*--------------------------------------------------------------------
mapbox addControl method can also take position parameter 
(e.g., 'top-left') to move from default top right position

To place geocoder elsewhere on page (including outside of the map,
create HTML div tag for geocoder and use css to position
--------------------------------------------------------------------*/

//Create geocoder variable
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca"
});

//Use geocoder div to position geocoder on page
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


/*--------------------------------------------------------------------
ADDING DATA SOURCES AND DRAW LAYERS ON MAP
--------------------------------------------------------------------*/
map.on('load', () => {
    //Add a new source from our GeoJSON data for TTC subway stations
    //ADDING TTC subway stations from a GeoJSON file, GeoJSON must direct to URL 
    /*map.addSource('ttc-subwayStns', {
        type: 'geojson',
        data: 'https://ireo00.github.io/IREO/Data/subwayStations.geojson'
    });

    //Draw GeoJSON as circles
    map.addLayer({
        'id': 'subwayStns',
        'type': 'circle',
        'source': 'ttc-subwayStns',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#a04646'
        }

    });*/

    //Add a new source from our vector data for Toronto neighbourhood boundaries via mapbox
    /*map.addSource('toronto-nrbd', {
        'type': 'vector',
        'url': 'mapbox://ireo.3lw8ikgt'
    });

    //Draw vector as filled polygons
    map.addLayer({
        'id': 'toronto-nrbd-fill',
        'type': 'fill',
        'source': 'toronto-nrbd',
        'paint': {
            'fill-color': '#777777',
            'fill-opacity': 0.5,
            'fill-outline-color': '#E3B5B5',
        },
        'source-layer': 'Neighbourhoods-0an01l' //name of layer in mapbox tileset page
    });*/

    //Add a new source from our vector data for TTC subway lines via mapbox
    map.addSource('ttc-subwaylines', { //Your source ID
        'type': 'vector',
        'url': 'mapbox://ireo.9k0gkaon' //Your tileset link from mapbox
    });

    //Draw vector as lines
    map.addLayer({
        'id': 'subwaylines',
        'type': 'line',
        'source': 'ttc-subwaylines', //must match source ID from addSource method
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            //Colour coding TTC subway lines
            'line-color': [
                'step',
                ['get', 'RID'],
                'black',
                1,
                '#eec62b',
                2,
                '#21a560',
                3,
                '#1595ce',
                4,
                '#ae0671'
            ],
            'line-width': 5
        },
        'source-layer': 'subwayLines-v2-9y4xbd' //name of layer in mapbox tileset page
    });

    //Add a new source from our vector data for TTC subway stations via mapbox
    map.addSource('ttc-subwayStns', { //Your source ID
        'type': 'vector',
        'url': 'mapbox://ireo.32z0s441' //Your tileset link from mapbox
    });

    //Draw vector as circles
    map.addLayer({
        'id': 'subwayStns',
        'type': 'circle',
        'source': 'ttc-subwayStns', //must match source ID from addSource method
        'paint': {
            'circle-color': '#a04646',
            'circle-radius': 5
        },
        'source-layer': 'subwayStations-9ooxz1' //name of layer in mapbox tileset page
    });

    //Draw TTC subway station labels using 'STATION' property
    map.addLayer({
        'id': 'subwayStns-labels',
        'type': 'symbol',
        'source': 'ttc-subwayStns',
        'layout': {
            'text-field': ['get', 'Name'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.6,
            'text-justify': 'auto',
            'text-font': ['DIN Offc Pro Medium'],
            'text-size': 15
        }
    });

    //Add a new source from our GeoJSON data for TTC subway stations
    //ADDING TTC subway stations from a GeoJSON file, GeoJSON must direct to URL 
    map.addSource('to-bakeries', {
        type: 'geojson',
        data: 'https://ireo00.github.io/IREO/Data/TObakeries.geojson'
    });

    //Draw GeoJSON as circles
    map.addLayer({
        'id': 'bakeries',
        'type': 'circle',
        'source': 'to-bakeries',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#1827AC'
        }
    });

    //Draw GeoJSON labels using 'Name' property
    map.addLayer({
        'id': 'toronto-bakeries-labels',
        'type': 'symbol',
        'source': 'to-bakeries',
        'layout': {
            'text-field': ['get', 'Name'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.6,
            'text-justify': 'auto',
            'text-font': ['DIN Offc Pro Medium'],
            'text-size': 13
        }
    });

});

/*--------------------------------------------------------------------
ADD INTERACTIVITY BASED ON HTML EVENT
--------------------------------------------------------------------*/
//Add event listeneer which returns map view to full screen on button click
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.389, 43.725],
        zoom: 11.2,
        essential: true
    });
});

/*--------------------------------------------------------------------
CREATING LEGEND FOR TORONTO SUBWAY LINES
--------------------------------------------------------------------*/
//Declare arrayy variables for labels and colours
const legendlabels = [
    'Line 1',
    'Line 2',
    'Line 3',
    'Line 4'
];

const legendcolours = [
    '#eec62b',
    '#21a560',
    '#1595ce',
    '#ae0671'
];

//Declare legend variable using legend div tag
const legend = document.getElementById('legend');

//For each layer create a block to put the colour and label in
legendlabels.forEach((label, i) => {
    const color = legendcolours[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the color circle

    key.className = 'legend-key2'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = color; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    //add 'key' (color cirlce) to the created section 'item' in the legend row
    item.appendChild(key);
    //add the 'value' to the legend row
    item.appendChild(value);
    //add 'item' to the legend
    legend.appendChild(item);
});

// Create a clicking function, where user can expand or close the legend by clicking the button (HTML element)
document.getElementById('legend-bar').addEventListener('click', (e) => {
    //if the legend is closed, expand it (i.e. change its display) and update the button label to 'close'
    if (document.getElementById('legend-bar').textContent === "Expand") {
        document.getElementById('legend-bar').innerHTML = "Close"
        legend.style.display = 'block';
    }
    //if the legend is expanded, close it (i.e. remove its display) and update the button label to 'expand'
    else if (document.getElementById('legend-bar').textContent === "Close") {
        document.getElementById('legend-bar').innerHTML = "Expand"
        legend.style.display = 'none';
    }
});

/*--------------------------------------------------------------------
ADD POP-UP ON CLICK EVENT
--------------------------------------------------------------------*/
//Creating pop-up for Toronto bakeries
map.on('mouseenter', 'bakeries', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over bakeries layer
});

map.on('mouseleave', 'bakeries', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves bakeries layer
    map.setFilter("to-bakeries", ['==', ['get', 'Name'], '']);
});

map.on('click', 'bakeries', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML("<b>Name:</b> " + e.features[0].properties.Name + "<br>" +
            "<b>Website: </b> " + e.features[0].properties.Website)
        .addTo(map); //Show popup on map
})