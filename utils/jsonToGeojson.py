import simplejson as json

# Convert json to geojson

data = json.load(open("data/activities.json"))
data = [x for x in data if len(x['start_latlng']) == 2]

geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [d["start_latlng"][1], d["start_latlng"][0]],
            },
            "properties": d,
        } for d in data]
}


output = open("activities.geojson", 'w')
json.dump(geojson, output)
