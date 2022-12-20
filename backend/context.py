import geocoder



def get_location(loc_name):
    location = geocoder.osm(loc_name, timeout=5.0)
    result = {
        "latitude":location.latlng[0],
        "longitude":location.latlng[1]
    }
    return result