var User = React.createClass({
  render: function() {
    console.log("rendering...")
    return (
      <div>
        Hello
        //<Views />
      </div>
      )
  }
  
});

ReactDOM.render(<User/>, document.getElementById('body'));