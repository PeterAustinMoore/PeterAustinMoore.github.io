getQuery = function(type, uid)
{
	this.data
	console.log("Getting Data...");
	constructQuery = "https://peter.demo.socrata.com/api/views.json"
	$.getJSON(constructQuery, function(data){
		console.log(data[0])
		this.data = data
	}.bind(this));
}