<script>
	for(var i=0;i<geojsons.length;i++)
	{
		var url = "https://s3.amazonaws.com/sbma44-dc/plows/" + geojsons[i]
		var snowplow = new L.GeoJSON.AJAX(url)
		snowplow.addTo(map)
	}
	console.log("refreshed");
</script>