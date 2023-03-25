// import data from './test2.json' assert { type: 'JSON' };
const response = await fetch('./test2.json');
const data = await response.json();

var myView = new ol.View({
    center: ol.proj.fromLonLat([10.93376479, 50.98380407]),
    zoom: 17
})

var osm = new ol.layer.Tile({
    source: new ol.source.OSM()
})

var layer = [osm];

var map = new ol.Map({
    target: 'map',
    layers: layer,
    view: myView
});


// var geojsonSource = new ol.source.Vector({
//     url: 'test2.json',
//     format: new ol.format.JSON()
// })

var Stylefunction = function(feature){
    var radius = 4;
    var retstyle = new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: "#ffa500",
            }),
            radius: radius
        })
    })

    return retstyle;
}

for(var i=1;i<=2232;i++){
    const lon = data[i].longitude;
    const lat = data[i].latitude;

    const marker = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry:new ol.geom.Point(
                        ol.proj.fromLonLat([lon,lat])
                    )
                })
            ],
            attributions: data[i]
        }),
        style: Stylefunction,
        properties: data[i]
    })

    map.addLayer(marker);
}

map.on('click', function(evt){

    var feature1 = map.forEachFeatureAtPixel(evt.pixel,
        function(feature1){
            return feature1;
        })
    
        console.log(feature1);
})

// var secondLayer = new ol.layer.Vector({
//     source: geojsonSource,
//     style: Stylefunction
// })

// map.addLayer(secondLayer);



const panoImage = document.querySelector('.pano-image');
const miamiPano = './Images/HMTpano_000001_000000.jpg';

const panorama = new PANOLENS.ImagePanorama(miamiPano);
const viewer = new PANOLENS.Viewer({
    container: panoImage
});

viewer.add(panorama);