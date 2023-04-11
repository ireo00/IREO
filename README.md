# IREO My Mapping Journey
 
This repository contains code for my webpage which includes three web maps. 
One map is about Eastern Ontario road trip attractions, the another is showing TTC subway lines & bakeries in Toronto, and the last one is showing attractions I visited in Seattle & 2010 total population by census tracts (categorized using natural breaks).

My webpage: https://ireo00.github.io/IREO/

2023-March-07 UPDATES:
- there is new pop-up for 'Bakeries in Toronto' map, showing the name of the bakery and website.
- pop-up for 'Seattle Trip', showing census tract number and population when click on the census tract. When you click on the attraction point, the pop-up will show the type, address, name, phone number, website, store hours, the neighbourhood and personal notes (if any).


Data Sources:
I created the Toronto bakeries and Seattle Day-4 geoJSON files via geojson.io.
I used the subway stations data from http://ttcdata.s3-website-us-east-1.amazonaws.com/; 
the subway lines data from https://open.toronto.ca/dataset/ttc-subway-shapefiles/; 
and boundaries of Toronto neighbourhoods from https://open.toronto.ca/dataset/neighbourhoods/ (ended up not showing this layer).
I used 2010 Seattle census tracts from https://data-seattlecitygis.opendata.arcgis.com/datasets/SeattleCityGIS::census-tracts-2010/explore?location=47.607728%2C-122.342050%2C12.00.
I used the 2010 Seattle total population data from https://data.seattle.gov/dataset/2010-Census-Tract-Seattle-Population-Statistics/huxa-86yc.



Other mapbox style library:
- 'mapbox://styles/ireo/clexqtn2a004c01pg6pxpytk7' //blueprint - A map inspired by blueprint schematics.
- 'mapbox://styles/ireo/clexqqd3x002a01tjnp0lcvml' //mapbox basic overcast
- 'mapbox://styles/ireo/clexqueuk000901leh4mabgp8' //minimo - A style with clean, uniform transit networks, stippling patterns and building icons; it’s good for data overlay or exploring the world while holding the hand of Italian, minimalistic beauty.
- 'mapbox://styles/ireo/clexqtt7g000401nq4snj99do' //Frank