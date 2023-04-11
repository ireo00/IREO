





        //Red colour palette
        '#fd8d3c',
        '#fc4e2a',
        '#e31a1c',
        '#bd0026',
        '#800026'

        //Pink colour palette
        '#ffe5ec',
        '#ffc2d1',
        '#ffb3c6',
        '#ff8fab',
        '#fb6f92'

        'fill-color': [
            'step', // STEP expression produces stepped results based on value pairs
            ['get', '2010Pop'], // GET expression retrieves property value from 'capacity' data field
            '#ffe5ec', // Colour assigned to any values < first step
            3406, '#ffc2d1', // Colours assigned to values >= each step
            4539, '#ffb3c6',
            5906, '#ff8fab',
            7789, '#fb6f92'
        ],


        //Orange-Pink colour palette
        '#F08080',
        '#F4978E',
        '#F8AD9D',
        '#FBC4AB',
        '#FFDAB9'

        'fill-color': [
            'step', // STEP expression produces stepped results based on value pairs
            ['get', '2010Pop'], // GET expression retrieves property value from 'capacity' data field
            '#F08080', // Colour assigned to any values < first step
            3406, '#F4978E', // Colours assigned to values >= each step
            4539, '#F8AD9D',
            5906, '#FBC4AB',
            7789, '#FFDAB9'
        ],

        //Pastel Green colour palette
        '#DDD5D0',
        '#CFC0BD',
        '#B8B8AA',
        '#7F9183',
        '#586F6B'
        
        'fill-color': [
            'step', // STEP expression produces stepped results based on value pairs
            ['get', '2010Pop'], // GET expression retrieves property value from 'capacity' data field
            '#DDD5D0', // Colour assigned to any values < first step
            3406, '#CFC0BD', // Colours assigned to values >= each step
            4539, '#B8B8AA',
            5906, '#7F9183',
            7789, '#586F6B'
        ],






















// Add data sources and draw layers
map.on('load', () => {
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

