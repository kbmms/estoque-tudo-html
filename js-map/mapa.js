var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];

function initialize() {
	var latlng = new google.maps.LatLng(-12.984538, -38.451741);

    var options = {
        zoom: 18,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
}

initialize();

function abrirInfoBox(id, marker) {
	if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
		infoBox[idInfoBoxAberto].close();
	}

	infoBox[id].open(map, marker);
	idInfoBoxAberto = id;
}

function carregarPontos() {

	$.getJSON('js-map/pontos.json', function(pontos) {

		var latlngbounds = new google.maps.LatLngBounds();

		$.each(pontos, function(index, ponto) {

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
				title: "Meu ponto personalizado! :-D",
				icon: 'marcador.png'
			});

			var myOptions = {
				content: "<p>" + ponto.Descricao + "</p>",
				pixelOffset: new google.maps.Size(-150, 0)
        	};

			infoBox[ponto.Id] = new InfoBox(myOptions);
			infoBox[ponto.Id].marker = marker;

			infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function (e) {
				abrirInfoBox(ponto.Id, marker);
			});

			markers.push(marker);

			latlngbounds.extend(marker.position);

		});

		var markerCluster = new MarkerClusterer(map, markers);

		map.fitBounds(latlngbounds);

	});

}

carregarPontos();
