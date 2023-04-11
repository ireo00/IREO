// Define mapbox access token
//Add default public map token from my Mapbox account 
mapboxgl.accessToken = 'pk.eyJ1IjoiaXJlbyIsImEiOiJjbGRtMTVrbGkwNHh5M3B0Yjd5YnF3cHNvIn0.KNtbmsY84dCZpXiXy91keg';

// Create basemap, set the starting zoom level and position
const map = new mapboxgl.Map({
    container: 'seamap', // container ID in html
    style: 'mapbox://styles/ireo/clexqtt7g000401nq4snj99do', //vintage map style
    //'mapbox://styles/ireo/clexqqd3x002a01tjnp0lcvml', //clean style
    //'mapbox://styles/ireo/clexqueuk000901leh4mabgp8', //minimalistic style
    center: [-122.315, 47.610], // starting position [longitude, latitude]
    zoom: 13, // starting zoom level
    maxBounds: [
        [-130, 30], // Southwest coords
        [-112, 75]  // Northeast coords
    ],
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
    countries: "us"
});

//Use geocoder div to position geocoder on page
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));



/*--------------------------------------------------------------------
ADD DATA AS CHOROPLETH MAP ON MAP LOAD
Use get expression to categorise data based on population values
--------------------------------------------------------------------*/
//Add data source and draw initial visiualization of layer
map.on('load', () => {
    map.addSource('seattle-ct', {
        'type': 'vector',
        'url': 'mapbox://ireo.d9mww7vm'
    });

    map.addLayer({
        'id': 'sea-ct-fill',
        'type': 'fill',
        'source': 'seattle-ct',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'POP2010'], // GET expression retrieves property value from 'capacity' data field
                '#DDD5D0', // Colour assigned to any values < first step
                3406, '#CFC0BD', // Colours assigned to values >= each step
                4539, '#B8B8AA',
                5906, '#7F9183',
                7789, '#586F6B'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        },
        'source-layer': 'SeattleCT-2010-v2-91d8cf'
    });

    /*--------------------------------------------------------------------
    ADD DATA AS POINTS ON MAP LOAD
    --------------------------------------------------------------------*/
    //Add a new source from our GeoJSON data for attractons in Seattle
    //GeoJSON must direct to URL 
    map.addSource('seattle-d4', {
        type: 'geojson',
        data: 'https://ireo00.github.io/IREO/Data/Seattle-D4.geojson'
    });

    //Draw GeoJSON as circles
    map.addLayer({
        'id': 'sea-attractions',
        'type': 'circle',
        'source': 'seattle-d4',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#1827AC'
        }
    });

    //Draw GeoJSON labels using 'Name' property
    map.addLayer({
        'id': 'seattle-day4-labels',
        'type': 'symbol',
        'source': 'seattle-d4',
        'layout': {
            'text-field': ['get', 'Name'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.6,
            'text-justify': 'auto',
            'text-font': ['DIN Offc Pro Medium'],
            'text-size': 13
        }
    });

    //Add another visualization of the polygon of census tracts. Note we do not add the source again
    map.addLayer({
        'id': 'sea-ct-hl', //Update id to represent highlighted layer
        'type': 'fill',
        'source': 'seattle-ct',
        'paint': {
            'fill-color': '#bfdbf7',
            'fill-opacity': 0.7,
            'fill-outline-color': 'white'
        },
        'source-layer': 'SeattleCT-2010-v2-91d8cf',
        'filter': ['==', ['get', 'TRACT'], ''] //Set an initial filter to return nothing
    });

    /*--------------------------------------------------------------------
    CREATE LEGEND IN JAVASCRIPT
    --------------------------------------------------------------------*/
    //Declare arrayy variables for labels and colours
    const legendlabels = [
        '0 - 1,287',
        '1,288 - 3,406',
        '3,407 - 4,539',
        '4,540 - 5,906',
        '> 5,907'
    ];

    const legendcolours = [
        //Pastel Green colour palette
        '#DDD5D0',
        '#CFC0BD',
        '#B8B8AA',
        '#7F9183',
        '#586F6B'
    ];

    //Declare legend variable using legend div tag
    const legend = document.getElementById('legend');

    //For each layer create a block to put the colour and label in
    legendlabels.forEach((label, i) => {
        const color = legendcolours[i];

        const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
        const key = document.createElement('span'); //add a 'key' to the row. A key will be the color circle

        key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
        key.style.backgroundColor = color; // the background color is retreived from teh layers array

        const value = document.createElement('span'); //add a value variable to the 'row' in the legend
        value.innerHTML = `${label}`; //give the value variable text based on the label

        item.appendChild(key); //add the key (color cirlce) to the legend row
        item.appendChild(value); //add the value to the legend row

        legend.appendChild(item); //add row to the legend
    });

    /*--------------------------------------------------------------------
    ADD INTERACTIVITY BASED ON HTML EVENT
    --------------------------------------------------------------------*/

    //Add event listeneer which returns map view to full screen on button click
    document.getElementById('returnbutton').addEventListener('click', () => {
        map.flyTo({
            center: [-122.315, 47.610],
            zoom: 13,
            essential: true
        });
    });

    //Change display of legend based on check box
    let legendcheck = document.getElementById('legendcheck');

    legendcheck.addEventListener('click', () => {
        if (legendcheck.checked) {
            legendcheck.checked = true;
            legend.style.display = 'block';
        }
        else {
            legend.style.display = "none";
            legendcheck.checked = false;
        }
    });

    //Change map layer display based on check box using setlayoutproperty
    document.getElementById('layercheck').addEventListener('change', (e) => {
        map.setLayoutProperty(
            'sea-ct-fill',
            'visibility',
            e.target.checked ? 'visible' : 'none'
        );
    });


});


/*--------------------------------------------------------------------
ADD POP-UP ON CLICK EVENT
--------------------------------------------------------------------*/
//Creating pop-up for Seattle attractions
map.on('mouseenter', 'sea-attractions', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over sea-attractions layer
});

map.on('mouseleave', 'sea-attractions', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves sea-attractions layer
    map.setFilter("sea-atts", ['==', ['get', 'Name'], '']);
});


map.on('click', 'sea-attractions', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML("<b>Type:</b> " + e.features[0].properties.Type + "<br>" +
            "<b>Address: </b> " + e.features[0].properties.Address + "<br>" +
            "<b>Name: </b> " + e.features[0].properties.Name + "<br>" +
            "<b>Phone: </b> " + e.features[0].properties.Phone + "<br>" +
            "<b>Website: </b> " + e.features[0].properties.Website + "<br>" +
            "<b>Operation Hours: </b> " + e.features[0].properties.Hours + "<br>" +
            "<b>Neighbourhood: </b> " + e.features[0].properties.Neighbourhood + "<br>" +
            "<b>Notes: </b> " + e.features[0].properties.Notes)
        .addTo(map); //Show popup on map
})

//Creating pop-up for Seattle total population by census tract
map.on('mouseenter', 'sea-ct-fill', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over sea-ct-fill layer
});

map.on('mouseleave', 'sea-ct-fill', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves sea-ct-fill layer
    map.setFilter("sea-ct-hl", ['==', ['get', 'TRACT'], '']);
});


map.on('click', 'sea-ct-fill', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML("<b>Census Tract:</b> " + e.features[0].properties.TRACT + "<br>" +
            "Population: " + e.features[0].properties.POP2010) //Use click event properties to write text for popup
        .addTo(map); //Show popup on map
})


/*--------------------------------------------------------------------
SIMPLE HOVER EVENT
// --------------------------------------------------------------------*/
map.on('mousemove', 'sea-ct-fill', (e) => {
    if (e.features.length > 0) { //if there are features in the event features array (i.e features under the mouse hover) then go into the conditional
        //set the filter of the sea-ct-hl to display the feature you're hovering over
        //e.features[0] is the first feature in the array and properties.TRACT is the census tract number for that feature
        map.setFilter('sea-ct-hl', ['==', ['get', 'TRACT'], e.features[0].properties.TRACT]);

    }
});


