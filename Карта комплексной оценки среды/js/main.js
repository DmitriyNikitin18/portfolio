mapboxgl.accessToken = 'pk.eyJ1Ijoib2JzaWRhbiIsImEiOiJjazF4YndrZWYwNjQxM2NwYzZndjJydmI3In0.-x3-1Y2Z_noGxEaZlripAA';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/obsidan/ckpl7pkvq1ysy18quo5cosok2', // style URL
  center: [37.706601, 55.619662], // starting position [lng, lat]
  zoom: 12.8 // starting zoom
});

 // Управление навигацией
 map.addControl(new mapboxgl.NavigationControl());

 // Полноэкранный режим
 map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
 
 // Линейный масштаб
  const scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
    });
    map.addControl(scale);
    scale.setUnit('metric');

  
const itemsLegenda = ['obr', 'medicine', 'transport', 'trash', 'dosug', 'sport', 'trade'];
  
map.on ('load', function () {
  // Слой образование
  map.addSource('obrZona', {
    type: 'geojson',
    data: '../geojson/obr_zone.geojson'
  });
  
  map.addLayer ({
    id: 'obrZona',
    type: 'fill',
    source: 'obrZona',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'obr_box'],
        1, '#ff5252',
        2, '#fcab5a',
        3, '#fef548',
        4, '#71ea93',
        5, '#64aae3'
        ],
        'fill-opacity': 0.4,
    }
  });

  // Слой медицина
  map.addSource('phZone', {
    type: 'geojson',
    data: '../geojson/pharmacy_zone.geojson'
  });
  
  map.addLayer ({
    id: 'phZone',
    type: 'fill',
    source: 'phZone',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'ph_box'],
        1, '#ff5252',
        2, '#fcab5a',
        3, '#fef548',
        4, '#71ea93',
        5, '#64aae3'
        ],
        'fill-opacity': 0.4,
    }
  });
  
  // Слой ЖКХ
  map.addSource('trashZone', {
    type: 'geojson',
    data: '../geojson/trash_zone.geojson'
  });
  
  map.addLayer ({
    id: 'trashZone',
    type: 'fill',
    source: 'trashZone',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'trash_box'],
        1, '#ff5252',
        2, '#fcab5a',
        3, '#fef548',
        4, '#71ea93',
        5, '#64aae3'
        ],
        'fill-opacity': 0.4,
    }
  });

  // Слой Досуг
  map.addSource('dosugZone', {
    type: 'geojson',
    data: '../geojson/dosug_zone.geojson'
  });
  
  map.addLayer ({
    id: 'dosugZone',
    type: 'fill',
    source: 'dosugZone',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'dos_box'],
        1, '#ff5252',
        2, '#fcab5a',
        3, '#fef548',
        4, '#71ea93',
        5, '#64aae3'
        ],
        'fill-opacity': 0.4,
    }
  });

  // Слой Спортивные зоны
  map.addSource('sportZone', {
    type: 'geojson',
    data: '../geojson/sport_zone.geojson'
  });
  
  map.addLayer ({
    id: 'sportZone',
    type: 'fill',
    source: 'sportZone',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'sport_box'],
        1, '#ff5252',
        2, '#fcab5a',
        3, '#fef548',
        4, '#71ea93',
        5, '#64aae3'
        ],
        'fill-opacity': 0.4,
    }
  });

   // Слой Торговые зоны
   map.addSource('tradeZone', {
    type: 'geojson',
    data: '../geojson/trade_zone.geojson'
  });
  
  map.addLayer ({
    id: 'tradeZone',
    type: 'fill',
    source: 'tradeZone',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'trade_box'],
        1, '#ff5252',
        2, '#fcab5a',
        3, '#fef548',
        4, '#71ea93',
        5, '#64aae3'
        ],
        'fill-opacity': 0.4,
    }
  });

  const zoneId = ['obrZona', 'phZone', 'trashZone', 'dosugZone', 'sportZone', 'tradeZone'];

  for (let i = 0; i < zoneId.length; i++) {
    let checkboxZona = document.getElementById(zoneId[i]);

    function toggleLayerZona () {
      if(checkboxZona.checked == true) {
        // Включение слоя
        map.setLayoutProperty(zoneId[i], 'visibility', "visible");
        // Перемещение слоя на нижний уровень
        map.moveLayer(zoneId[i], 'tunnel-path');
      } else {
        map.setLayoutProperty(zoneId[i], 'visibility', "none");
      }
    }

    checkboxZona.addEventListener('click', toggleLayerZona);
  }

  // Включение слоев
  for (let key of itemsLegenda) {
    map.setLayoutProperty(key, 'visibility', "none");
  }

  for (let i = 0; i < itemsLegenda.length; i++) {
    let checkbox = document.getElementById(itemsLegenda[i]);
    let element = Array.from(document.querySelectorAll('.legenda__list'));

    let showBlock = (element) => element[i].style.display = 'block';
    let hideBlock = (element) => element[i].style.display = 'none';

    function toggleLayer () {
      if(checkbox.checked == true) {
        map.setLayoutProperty(itemsLegenda[i], 'visibility', "visible");
        showBlock (element);
      } else {
        map.setLayoutProperty(itemsLegenda[i], 'visibility', "none");
        hideBlock (element);
      }
    } 

    checkbox.addEventListener('click', toggleLayer);
  }
})
  