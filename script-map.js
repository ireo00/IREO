// Define mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaXJlbyIsImEiOiJjbGRtMTVrbGkwNHh5M3B0Yjd5YnF3cHNvIn0.KNtbmsY84dCZpXiXy91keg'; //Add default public map token from your Mapbox account 

// Create basemap
const map = new mapboxgl.Map({
    container: 'basemap', // container ID in html
    style: 'mapbox://styles/ireo/cle2ej2fv005y01qwbr3uiibc', // Add link to my stylesheet
    center: [-78.259, 44.361], //[-79.374, 43.654], // starting position [longitude, latitude]
    zoom: 7.28 //12, // starting zoom level
});

// Add data sources and draw layers
map.on('load', () => {

    /*ADDING A SOURCE FROM A GEOJSON FILE*/
    map.addSource('easternON', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "Type": "Restaurant",
                        "Name": "Captain George's"
                    },
                    "geometry": {
                        "coordinates": [
                            -78.94302734171454,
                            44.10539238047383
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Type": "Brewery",
                        "Name": "Prince Eddy's Brewing Co"
                    },
                    "geometry": {
                        "coordinates": [
                            -77.14572901197954,
                            44.015409890054315
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Type": "Coffee Shop",
                        "Name": "Equator Coffee"
                    },
                    "geometry": {
                        "coordinates": [
                            -76.18118917314473,
                            45.235149684498225
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Il Buco",
                        "Type": "Restaurant"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.68911712662748,
                            44.389099106657966
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Type": "Restaurant",
                        "Name": "Rocky River Cafe"
                    },
                    "geometry": {
                        "coordinates": [
                            -76.2485929930183,
                            44.897323823789236
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Hong Won Chop",
                        "Type": "Restaurant"
                    },
                    "geometry": {
                        "coordinates": [
                            -76.16174026817437,
                            44.33023820480284
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "1000 Islands Bed and Breakfast the Bulloch House",
                        "Type": "Stay"
                    },
                    "geometry": {
                        "coordinates": [
                            -76.1599031511511,
                            44.3298440540496
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Tammy's Country Kitchen",
                        "Type": "Restaurant"
                    },
                    "geometry": {
                        "coordinates": [
                            -76.96207593836691,
                            44.24077476802768
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Nicky's Doughnuts & Ice Cream",
                        "Type": "Dessert"
                    },
                    "geometry": {
                        "coordinates": [
                            -80.21732485453974,
                            44.49866926665541
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Gibson & Company",
                        "Type": "Coffee Shop & Bar"
                    },
                    "geometry": {
                        "coordinates": [
                            -80.21643118193425,
                            44.49995666551928
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Willow Pond B&B",
                        "Type": "Stay"
                    },
                    "geometry": {
                        "coordinates": [
                            -78.96014270362701,
                            44.107092133935964
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Type": "Coffee Shop",
                        "Name": "French Made"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.3922062387682,
                            43.64544454322905
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "The Lone Wolf Café",
                        "Type": "Coffee Shop"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.41533510502083,
                            44.60969069317241
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "Name": "Apna Pind - Indian Restaurant",
                        "Type": "Restaurant"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.66900888979016,
                            43.678840006823265
                        ],
                        "type": "Point"
                    }
                }
            ]
        }
    })

    //Draw GeoJSON as circles
    map.addLayer({
        'id': 'easternON-pnts',
        'type': 'circle',
        'source': 'easternON',
        'paint': {
            'circle-radius': 7,
            'circle-color': 'blue'//'#B42222'
        }

    });

    //Draw GeoJSON labels using 'Name' property
    map.addLayer({
        'id': 'easternON-att-labels',
        'type': 'symbol',
        'source': 'easternON',
        'layout': {
            'text-field': ['get', 'Name'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.6,
            'text-justify': 'auto',
            'text-font': ['DIN Offc Pro Medium'],
            'text-size': 15
        }
    });

    //GeoJSON must direct to URL 
    /*map.addSource('easternON-att', {
        type: 'geojson',
        data: 'Data/EasternOntario.geojson'
    });
    
    //Draw GeoJSON as circles
    map.addLayer({
        'id': 'easternON-att-pnts',
        'type': 'circle',
        'source': 'easternON-att',
        'paint': {
            'circle-radius': 7,
            'circle-color': 'blue'
        }
    
    });
    
    //Draw GeoJSON labels using 'Name' property
    map.addLayer({
        'id': 'easternON-att-labels',
        'type': 'symbol',
        'source': 'easternON-att',
        'layout': {
            'text-field': ['get', 'Name'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto'
        }
    });
    
        map.addSource('ontario-ct', { //Your source ID
            'type': 'vector',
            'url': 'mapbox://ireo.10igyals' //Your tileset link from mapbox
        });
    
        map.addLayer({
            'id': 'ontarioct',
            'type': 'fill',
            'source': 'ontario-ct', //must match source ID from addSource method
            'paint': {
                'fill-color': '#888888',
                'fill-opacity': 0.4,
                'fill-outline-color': 'white'
            },
            'source-layer': 'torontoct-84r9e1' //name of layer. Get this from mapbox tileset page
        },
            'uoft-buildings' //Drawing order - place below points
        );*/

});