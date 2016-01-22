var UI = React.createClass({
  getInitialState: function()
  {
    return ({
      page: <Catalog changePage={this.changePage} />
    })
  },
  render: function() {
    console.log("rendering...");
    return (
      <div>
        {this.state.page}
      </div>
      );
  },
  changePage: function(page)
  {
    if(page=="Visualize")
    {
      this.setState({
        page: <Visualize changePage={this.changePage} />
      });
    }
  }
  
});

ReactDOM.render(<UI />, document.body);