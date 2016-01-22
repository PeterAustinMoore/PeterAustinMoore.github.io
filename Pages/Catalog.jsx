var Catalog = React.createClass({
	getInitialState: function()
	{
		return({
			data: []
		})
	},
	render: function()
	{
		var catalog = []
		if(this.state.data)
		{
			for(i=0;i<this.state.data.length;i++)
			{
				catalog.push(<CatalogList name={this.state.data[i]['id']} updated={this.state.data[i]['createdAt']}/>)
			}
		}
		return(
			<div>
			<button onClick={this.getCatalog}>Catalog</button>
			<table>
			<tr><th>Name</th><th>Updated</th></tr>
			{catalog}
			</table>
			</div>
			)

	},
	changePage: function()
	{
		this.props.changePage("Visualize")
	},
	getCatalog: function()
	{
	console.log("Getting Data...");
	constructQuery = "https://peter.demo.socrata.com/api/views.json"
	$.getJSON(constructQuery, function(data){
		console.log(data[0]['id']);
		this.setState({data:data});
	}.bind(this));
	}
});

var CatalogList = React.createClass({
	render: function()
	{
		var updateDate = new Date(this.props.updated*1000).toString()
		return(<tr><td>{this.props.name}</td><td>{updateDate}</td></tr>)
	}
});