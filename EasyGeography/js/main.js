mapboxgl.accessToken = "pk.eyJ1IjoiZG1pdHJpeW5pa2l0aW4iLCJhIjoiY2tvZm82bGdqMG54ZDMxdHI5OWIwaTVxZSJ9.ZpeE9sQxbLrJS2x-fAvczg";

let map = new mapboxgl.Map ({
  container: 'map', // container ID
  style: 'mapbox://styles/dmitriynikitin/ckofpitgx2we717qe2jz0b5i0', // style URL
  center: [-10, 40], // starting position [lng, lat]
  zoom: 1 // starting zoom
});

// const countries = ['countriesGaz', 'countriesCoal'];
const toggleableLayerIds = ['countriesGaz', 'countriesCoal', 'countriesOil'];
const nameForLayers = ['добыча газа', 'добыча угля', 'добыча нефти'];

map.on ('load', function () {

  // Добыча газа
  map.addSource('countriesGaz', {
    type: 'geojson',
    data: '../geojson/gazProduction.geojson'
  });

  map.addLayer ({
    id: 'countriesGaz',
    type: 'fill',
    source: 'countriesGaz',
    layout: {
      'visibility': 'visible'
    },
    paint: {  
      'fill-color': [
        'step',
        ['get', 'gazProduct'],
        '#DFF2FD', 10,
        '#B4CEDF', 50,
        '#89AAC2', 100,
        '#5D85A4', 200,
        '#326187', 500,
        '#073D69'
        ],
      'fill-opacity': 0.65,
      'fill-outline-color': '#073D69'
    }
  });

  // Добыча угля
  map.addSource ('countriesCoal', {
    type: 'geojson',
    data: '../geojson/coalProduction.geojson'
  });

  map.addLayer ({
    id: 'countriesCoal',
    type: 'fill',
    source: 'countriesCoal',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'step',
        ['get', 'CoalProduc'],
        '#EAE7D3', 10,
        '#C1AF9E', 100,
        '#99776A', 500,
        '#703E35', 1000,
        '#470600'
        ],
      'fill-opacity': 0.6,
      'fill-outline-color': '#84390D'
    }
  });

   // Добыча нефти
   map.addSource ('countriesOil', {
    type: 'geojson',
    data: '../geojson/oilProduction.geojson'
  });

  map.addLayer ({
    id: 'countriesOil',
    type: 'fill',
    source: 'countriesOil',
    layout: {
      'visibility': 'none'
    },
    paint: {  
      'fill-color': [
        'step',
        ['get', 'oilProduct'],
        '#FDEEF5', 100,
        '#CFBBCF', 1000,
        '#A287A9', 5000,
        '#745482', 10000,
        '#46205C'
        ],
      'fill-opacity': 0.6,
      'fill-outline-color': '#46205C'
    }
  });

  // Информация о стране
  for (let i = 0; i < toggleableLayerIds.length; i++) {
    map.on('click', toggleableLayerIds[i], function (e) {
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.desc)
      .addTo(map);
      });
  }

  function toggleLayer(layerName) {
    if(map.getLayer(layerName)) {
      const layerButtonElement = document.getElementById(layerName);

      if(layerButtonElement) {
        Array.from(document.getElementsByClassName('layer-switcher-button')).forEach(el => {
          el.classList.remove('active');
        });
        layerButtonElement.classList.add('active');

        toggleableLayerIds.forEach(el => {
          map.setLayoutProperty(
            el,
            'visibility',
            'none'
          );
        });

        let visibility = map.getLayoutProperty(
          layerName,
          'visibility'
        );

        for (let i = 0; i < toggleableLayerIds.length; i++) {
          if (toggleableLayerIds[i] == 'countriesGaz') {
            layerName == 'countriesGaz' ? document.getElementById('gaz').style.display = 'flex' : document.getElementById('gaz').style.display = 'none';
          } else if (toggleableLayerIds[i] == 'countriesCoal') {
            layerName == 'countriesCoal' ? document.getElementById('coal').style.display = 'flex' : document.getElementById('coal').style.display = 'none';
          } else {
            layerName == 'countriesOil' ? document.getElementById('oil').style.display = 'flex' : document.getElementById('oil').style.display = 'none';
          }
        }
        
        if (visibility === 'visible') {
          map.setLayoutProperty(
            layerName,
            'visibility',
            'none'
          );
        } else {
          map.setLayoutProperty(
            layerName,
            'visibility',
            'visible'
          )
        }
      }
    }
  }

  function openLegenda (layerName) {
    if(map.getLayer(layerName)) {
      for (let i = 0; i < toggleableLayerIds.length; i++) {
        if (toggleableLayerIds[i] == 'countriesGaz') {
          layerName == 'countriesGaz' ? document.getElementById('legendaGaz').style.display = 'flex' : document.getElementById('legendaGaz').style.display = 'none';
        } else if (toggleableLayerIds[i] == 'countriesCoal') {
          layerName == 'countriesCoal' ? document.getElementById('legendaCoal').style.display = 'flex' : document.getElementById('legendaCoal').style.display = 'none';
        } else {
          layerName == 'countriesOil' ? document.getElementById('legendaOil').style.display = 'flex' : document.getElementById('legendaOil').style.display = 'none';
        }
      }
    }
  }

  // Выбор слоев
  map.on ('idle', function () {
    if (map.getLayer('countriesGaz') && map.getLayer('countriesCoal') && map.getLayer('countriesOil')) {
      
      for (let i = 0; i < toggleableLayerIds.length; i++) {
        let id = toggleableLayerIds[i];
          if (!document.getElementById(id)) {
          // Create a link.
            let link = document.createElement('a');
            link.id = id;
            link.classList.add('layer-switcher-button');
            link.href = '#';
            link.textContent = nameForLayers[i];

            if (toggleableLayerIds[i] === 'countriesGaz') {
              link.classList.add('active');
            }

            
            // Show or hide layer when the toggle is clicked.
            link.onclick = function (e) {
              let clickedLayer = this.id;
              e.preventDefault();
              e.stopPropagation();

              toggleLayer(clickedLayer);
              
              
              openLegenda(clickedLayer)
            };
          
          let layers = document.getElementById('menu');
          layers.appendChild(link);
          }
        }
    }
  });


  // Смена курсора при наведении
  for (let i = 0; i < toggleableLayerIds.length; i++) {
    map.on('mouseenter', toggleableLayerIds[i], function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', toggleableLayerIds[i], function () {
      map.getCanvas().style.cursor = '';
    });
  }

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

  // Информация при наведении
  let magDisplay = document.getElementById('mag');
  let locDisplay = document.getElementById('loc');

  let quakeID = null;

  for (let i = 0; i < toggleableLayerIds.length; i++) {
    map.on('mousemove', toggleableLayerIds[i], (e) => {
      let properties = e.features[0].properties;
      let meterCubeString = '3';
      let quakeMagnitude = properties.NAME_RU;
      let quakeLocation = (properties.gazProduct || properties.oilProduct || properties.CoalProduc) + 
        (properties.coalMeasuring || properties.oilMeasuring || ' млрд м' + meterCubeString.sup() + ' в год');
    
      if (e.features.length > 0) {
        magDisplay.textContent = quakeMagnitude;
        locDisplay.innerHTML = quakeLocation;
    
        if (quakeID) {
          map.removeFeatureState({
            source: toggleableLayerIds[i],
            id: quakeID
          });
        }
    
        quakeID = e.features[0].id;
      }
    });
  
    map.on("mouseleave", toggleableLayerIds[i], function() {
      if (quakeID) {
        map.setFeatureState({
          source: toggleableLayerIds[i],
          id: quakeID
        }, {
          hover: false
        });
      }
    
      quakeID = null;
      // Remove the information from the previously hovered feature from the sidebar
      magDisplay.textContent = '';
      locDisplay.textContent = '';
      // Reset the cursor style
      map.getCanvas().style.cursor = '';
    });
  }

  // Перемещение по нажатию на ссылку страны
  const pointCountriesGaz = [
    [[-63, 17], [-178, 72]], //USA
    [[35, 40], [160, 82]], //Russia 
    [[46, 23], [61, 41]], //Iran
    [[-145, 83], [-56, 42]], //Canada
    [[50, 24], [52, 27]], //Qatar
    [[70, 18], [136, 57]], //China
    [[115, -44], [152, -8]], //Australia
    [[6, 58], [28, 73]], //Norway
    [[41, 15], [50,35]], //Saudi
    [[-8, 18], [10, 38]], //Algeria
    [[-150, 85], [150, -70]] //otherWorld
  ];
  const pointCountriesCoal = [
    [[70, 18], [136, 57]], //China
    [[70, 7], [89, 37]], //India
    [[-63, 17], [-178, 72]], //USA
    [[91, -12], [140,19]], //Indonezy
    [[115, -44], [152, -8]], //Australia
    [[35, 40], [160, 82]], //Russia 
    [[16, -36], [34, -21]], //South Africa
    [[7, 47], [14, 55]], //Germany
    [[14, 49], [23, 55]], //Poland
    [[48, 39], [88, 56]], //Kazahstan
    [[-150, 85], [150, -70]] //otherWorld
  ];
  const pointCountriesOil = [
    [[-63, 17], [-178, 72]], //USA
    [[35, 40], [160, 82]], //Russia 
    [[41, 15], [50,35]], //Saudi
    [[39, 29], [46, 38]], //Irak
    [[70, 18], [136, 57]], //China
    [[52, 22], [56, 26]], //UEA
    [[-71, -34], [-36, 8]], //Brazil
    [[47, 28], [48, 30]], //Kuwait
    [[46, 23], [61, 41]], //Iran
    [[2, 4], [15, 14]], //Nigeria
    [[-150, 85], [150, -70]] //otherWorld
  ];

  const idCountriesGaz = ['flyUSA', 'flyRussia', 'flyIran', 'flyCanada', 'flyQatar', 'flyChina', 'flyAustralia', 'flyNorway', 'flySaudi', 'flyAlgeria', 'flyWorld'];
  const idCountriesCoal = ['flyChinaCoal', 'flyIndiaCoal', 'flyUSACoal', 'flyIndonezyCoal', 'flyAustraliaCoal', 'flyRussiaCoal', 'flySouthAfricaCoal', 'flyGermanyCoal', 'flyPolandCoal', 'flyKazastanCoal', 'flyWorldCoal'];
  const idCountriesOil = ['flyUSAOil', 'flyRussiaOil', 'flySaudiOil', 'flyIrakOil', 'flyChinaOil', 'flyEmirateOil', 'flyBrazilOil', 'flyKuwaitOil', 'flyIranOil', 'flyNigeriaOil', 'flyWorldOil'];

  for (let i = 0; i < idCountriesGaz.length; i++) {
    document.getElementById(idCountriesGaz[i]).addEventListener('click', function () {
      map.fitBounds(pointCountriesGaz[i], {
        padding: 20
      });      
    });

    document.getElementById(idCountriesCoal[i]).addEventListener('click', function () {
      map.fitBounds(pointCountriesCoal[i], {
        padding: 20
      });      
    });

    document.getElementById(idCountriesOil[i]).addEventListener('click', function () {
      map.fitBounds(pointCountriesOil[i], {
        padding: 20
      });      
    });
  }

  // Информация для графика 
  // График газ
  const grpahicGaz = ['gaz-1', 'gaz-2', 'gaz-3', 'gaz-4', 'gaz-5', 'gaz-6', 'gaz-7', 'gaz-8', 'gaz-9', 'gaz-10', 'gaz-11'];
  const persentCountriesGaz = ['США: 23,3%', 'Россия: 17,7%', 'Иран: 6.2%', 'Канада: 4,7%', 'Катар: 4,5%', 'Китай: 4,2%', 'Австралия: 3,7%', 'Норвегия: 2,9%', 'Саудовская Аравия: 2,9%', 'Алжир: 2,2%', 'Остальной мир: 30,5%'];
  persentCountriesGaz.reverse();
  // График уголь
  const grpahicCoal = ['coal-1', 'coal-2', 'coal-3', 'coal-4', 'coal-5', 'coal-6', 'coal-7', 'coal-8', 'coal-9', 'coal-10', 'coal-11'];
  const persentCountriesCoal = ['Китай: 48,1%', 'Индия: 10,0%', 'США: 8,9%', 'Индонезия: 7,2%', 'Австралия: 6,3%', 'Россия: 5,8%', 'ЮАР: 3,3%', 'Германия: 2,2%', 'Польша: 1,6%', 'Казахстан: 1,5%', 'Остальной мир: 5,1%'];
  persentCountriesCoal.reverse();
  // График нефть
  const grpahicOil = ['oil-1', 'oil-2', 'oil-3', 'oil-4', 'oil-5', 'oil-6', 'oil-7', 'oil-8', 'oil-9', 'oil-10', 'oil-11'];
  const persentCountriesOil = ['США: 16,3%', 'Россия: 14,1%', 'Саудовская Аравия: 13,0%', 'Ирак: 6,1%', 'Китай: 5,1%', 'ОАЭ: 4,1%', 'Бразилия: 3,7%', 'Кувейт: 3,6%', 'Иран: 3,1%', 'Нигерия: 2,3%', 'Остальной мир: 28,7%'];
  persentCountriesOil.reverse();

  let idGraphicGaz = document.getElementById('popupGaz');
  let idGraphicCoal = document.getElementById('popupCoal');
  let idGraphicOil = document.getElementById('popupOil');
  
  function openInfoForGrpaphic (grpahic, idGraphic, persentCountries) {
    for (let i = 0; i < grpahic.length; i++) {
      let item = grpahic[i];
      let graphicInfo = document.getElementById(item);
      graphicInfo.addEventListener("mouseover", showPopup);
      graphicInfo.addEventListener("mouseout", hidePopup);

      let link = document.createElement('a');
      link.href = '#';
      link.textContent = persentCountries[i];

      function showPopup(evt) {
        idGraphic.style.display = "block";
        idGraphic.appendChild(link);
      }
    
      function hidePopup(evt) {
        idGraphic.style.display = "none";
        idGraphic.removeChild(link);
      }
    }
  }

  openInfoForGrpaphic(grpahicGaz, idGraphicGaz, persentCountriesGaz);
  openInfoForGrpaphic(grpahicCoal, idGraphicCoal, persentCountriesCoal);
  openInfoForGrpaphic(grpahicOil, idGraphicOil, persentCountriesOil);
});