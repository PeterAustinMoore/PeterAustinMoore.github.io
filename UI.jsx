var UI = React.createClass({
  getInitialState: function()
  {
     return ({
     		hostURL: '',
     		datasetId: '',
     		headerData:'',
     		dependent:'',
     		independent:'',
          	jsonData: ''
      })
  },
  render: function() {

    return (
      <div>
        Hello
        <Views />
      </div>
      )
  },
  onHostSubmit: function(data, URL, id){
  	console.log(data);
  	this.setState({
  		headerData: data,
  		hostURL: URL,
  		datasetId: id
  	});
  },
  onDataSubmit: function(data, dep, ind){
  	this.setState({
  		dependent: dep,
  		independent: ind,
  		jsonData: data
  	});
  }
  
});

ReactDOM.render(<UI/>, document.body);