var People=React.createClass({
	getInitialState:function(){
		return {name:true}
	},
	handelClick:function(event){
		this.setState({name:!this.state.name})
	},
	render:function(){
		var name=this.state.name?"点击":"不点击";
		return (
			<div>
				<button onClick={this.handelClick}>{name}</button>
			</div>
		)
	}
});
ReactDOM.render(
	<People />,wf
)