title: (Untitled)
permalink: untitled-2
id: 137
updated: '2017-08-23 12:58:11'
date: 2018-01-12 12:07:40
tags:
---

	<div id="wrap" class="my-map">
		<div id="mapContainer"></div>
	</div>
	<script src="//webapi.amap.com/maps?v=1.3&key=8325164e247e15eea68b59e89200988b"></script>
	<script>
	!function(){
		var infoWindow, map, level = 12,
			center = {lng: 104.775372, lat: 29.347392},
			features = [];

		function loadFeatures(){
			for(var feature, data, i = 0, len = features.length, j, jl, path; i < len; i++){
				data = features[i];
				switch(data.type){
					case "Marker":
						feature = new AMap.Marker({ map: map, position: new AMap.LngLat(data.lnglat.lng, data.lnglat.lat),
							zIndex: 3, extData: data, offset: new AMap.Pixel(data.offset.x, data.offset.y), title: data.name,
							content: '<div class="icon icon-' + data.icon + ' icon-'+ data.icon +'-' + data.color +'"></div>' });
						break;
					case "Polyline":
						for(j = 0, jl = data.lnglat.length, path = []; j < jl; j++){
							path.push(new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat));
						}
						feature = new AMap.Polyline({ map: map, path: path, extData: data, zIndex: 2,
							strokeWeight: data.strokeWeight, strokeColor: data.strokeColor, strokeOpacity: data.strokeOpacity });
						break;
					case "Polygon":
						for(j = 0, jl = data.lnglat.length, path = []; j < jl; j++){
							path.push(new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat));
						}
						feature = new AMap.Polygon({ map: map, path: path, extData: data, zIndex: 1,
							strokeWeight: data.strokeWeight, strokeColor: data.strokeColor, strokeOpacity: data.strokeOpacity,
							fillColor: data.fillColor, fillOpacity: data.fillOpacity });
						break;
					default: feature = null;
				}
				if(feature){ AMap.event.addListener(feature, "click", mapFeatureClick); }
			}
		}

		function mapFeatureClick(e){
			if(!infoWindow){ infoWindow = new AMap.InfoWindow({autoMove: true}); }
			var extData = e.target.getExtData();
			infoWindow.setContent("<h5>" + extData.name + "</h5><div>" + extData.desc + "</div>");
			infoWindow.open(map, e.lnglat);
		}

		map = new AMap.Map("mapContainer", {center: new AMap.LngLat(center.lng, center.lat), level: level, keyboardEnable: false, dragEnable: false, doubleClickZoom: false});
		
		loadFeatures();

		map.on('complete', function(){
			map.plugin(["AMap.ToolBar"], function(){
				map.addControl(new AMap.ToolBar);
			});	
		})
		
	}();
	</script>