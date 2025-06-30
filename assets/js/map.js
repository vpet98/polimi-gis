import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, XYZ, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Fill, Stroke } from 'ol/style';


// OpenStreetMap base map
let osm = new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});

// NO2 AAD
let no2aad = new Image({
    title: "NO2 Avg. Dif. 2022 from Prev. 5 Years",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_NO2_2017-2021_AAD_map_2022' }
    }),
    visible: false
});

// PM2.5 AAD
let pm2p5aad = new Image({
    title: "PM2.5 Avg. Dif. 2022 from Prev. 5 Years",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_pm2p5_2017-2021_AAD_map_2022' }
    }),
    visible: false
});

// PM10 AAD
let pm10aad = new Image({
    title: "PM10 Avg. Dif. 2022 from Prev. 5 Years",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_pm10_2017-2021_AAD_map_2022' }
    }),
    visible: false
});

// land cover
let landcover = new Image({
    title: "Land Cover",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_LC_reclassified' }
    }),
    visible: false
});

// NO2 2022
let no2_2022 = new Image({
    title: "NO2 Avg. 2022",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_average_no2_2022' }
    }),
    visible: false
});

// PM2.5 2022
let pm2p5_2022 = new Image({
    title: "PM2.5 Avg. 2022",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_average_pm2p5_2022' }
    }),
    visible: false
});

// PM10 2022
let pm10_2022 = new Image({
    title: "PM10 Avg. 2022",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_average_pm10_2022' }
    }),
    visible: false
});

// NO2 concentration 2020
let no2concentration = new Image({
    title: "NO2 Concentration 2020",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_no2_concentration_map_2020' }
    }),
    visible: false
});

// PM2.5 concentration 2020
let pm2p5concentration = new Image({
    title: "PM2.5 Concentration 2020",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_pm2p5_concentration_map_2020' }
    }),
    visible: false
});

// PM10 concentration 2020
let pm10concentration = new Image({
    title: "PM10 Concentration 2020",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_pm10_concentration_map_2020' }
    }),
    visible: false
});

// NO2 bivariate 2020
let no2bivariate = new Image({
    title: "NO2 Bivariate 2020",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_no2_2020_bivariate' }
    }),
    visible: false
});

// PM2.5 bivariate 2020
let pm2p5bivariate = new Image({
    title: "PM2.5 Bivariate 2020",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_pm2p5_2020_bivariate' }
    }),
    visible: false
});

// PM10 bivariate 2020
let pm10bivariate = new Image({
    title: "PM10 Bivariate 2020",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_22:Poland_pm10_2020_bivariate' }
    }),
    visible: false
});

// Add the layer groups code here:
let basemapLayers = new Group({
    title: 'Base Maps',
    layers: [osm]
});
let overlayLayers = new Group({
    title: 'Computed Layers',
    layers: [
        no2aad,
        pm2p5aad,
        pm10aad,
        landcover,
        no2_2022,
        pm2p5_2022,
        pm10_2022,
        no2concentration,
        pm2p5concentration,
        pm10concentration,
        no2bivariate,
        pm2p5bivariate,
        pm10bivariate
    ]
});


// Map Initialization
let mapOrigin = fromLonLat([19.1451, 51.9194]);
let zoomLevel = 6;
let map = new Map({
    target: document.getElementById('map'),
    //layers: [basemapLayers, overlayLayers],
    layers: [],
    view: new View({
        center: mapOrigin,
        zoom: zoomLevel
    }),
    projection: 'EPSG:3857'
});

// Add the map controls here:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);

// Add the LayerSwitcher control here:
var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

// Add the ESRI XYZ basemaps here:
var esriTopoBasemap = new Tile({
    title: 'ESRI Topographic',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
});
var esriWorldImagery = new Tile({
    title: 'ESRI World Imagery',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
});
basemapLayers.getLayers().extend([
    esriTopoBasemap, esriWorldImagery
]);



// Add the popup code here:
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var popup = new Overlay({
    element: container
}); 

map.addOverlay(popup);

closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur(); 
    return false;
};


// Add the singleclick event code here
map.on('singleclick', function (event) {
    var feature = map.forEachFeatureAtPixel(
        event.pixel, 
        function (feature, layer) {
            if(layer == staticGeoJSONLayer){
                return feature;
            }
        }
    );

    if (feature != null) {
        var pixel = event.pixel;
        var coord = map.getCoordinateFromPixel(pixel);
        popup.setPosition(coord);

        content.innerHTML =
            '<h5>Administrative Level 2</h5><br>' +
            '<span>' +
            feature.get('name_2') + ', ' +
            feature.get('name_1')
            '</span>';
    }
});

// Add the pointermove event code here:
map.on('pointermove', function(event) {
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

var legendHTMLString = '<ul>';
function getLegendElement(title, color){
    return '<li>' + 
        '<span class="legend-color" style="background-color: ' + color + ' ">' + 
        '</span><span>' + 
        title +
        '</span></li>';
}

function getLegendImageElement(title, url){
    return '<li>' + 
        '<span class="legend-image"><img src="' + url + '" alt="legend for ' + title + '" /></span>' +
        '<span>' + title + '</span></li>';
}

async function updateLegend() {
    let legendHTMLString = '<ul>';

    const layersArray = overlayLayers.getLayers().getArray().slice().reverse();
    for (let overlayLayer of layersArray) {
        if (!overlayLayer.getVisible()) continue;

        const layerTitle = overlayLayer.get('title');

        if (overlayLayer.getSource() instanceof ImageWMS) {
            const legendUrlJson = overlayLayer.getSource().getLegendUrl(0, { format: "application/json" });
            const legendUrlImage = overlayLayer.getSource().getLegendUrl(0, { format: "image/png" });

            try {
                const response = await fetch(legendUrlJson);
                const data = await response.json();
                const symbolizer = data["Legend"][0]["rules"][0]["symbolizers"][0];
                let layerColor = null;

                if ("Polygon" in symbolizer) {
                    layerColor = symbolizer["Polygon"]["fill"];
                } else if ("Line" in symbolizer) {
                    layerColor = symbolizer["Line"]["stroke"];
                }

                if (layerColor) {
                    legendHTMLString += getLegendElement(layerTitle, layerColor);
                } else {
                    legendHTMLString += getLegendImageElement(layerTitle, legendUrlImage);
                }
            } catch (err) {
                legendHTMLString += getLegendImageElement(layerTitle, legendUrlImage);
            }
        } else {
            const style = overlayLayer.getStyle?.();
            const fill = style?.getFill?.();
            if (fill) {
                const color = fill.getColor();
                legendHTMLString += getLegendElement(layerTitle, color);
            }
        }

        break; // only show the legend for the first visible layer
    }

    legendHTMLString += '</ul>';
    document.getElementById('legend-content').innerHTML = legendHTMLString;
}

// Watch for visibility changes to update the legend
overlayLayers.getLayers().forEach(layer => {
    layer.on('change:visible', () => updateLegend());
});


legendHTMLString += "</ul>";
document.getElementById('legend-content').innerHTML = legendHTMLString;


// Add the layer groups to the map here, at the end of the script!
map.addLayer(basemapLayers);
map.addLayer(overlayLayers);

updateLegend();