// 一个子组件输入内容
var Child = React.createClass({
	render: function () {
		return (
			<div>
				<input type="text" onChange={this.props.changeValue}/>
			</div>
		)
	}
})
// 一个子组件显示内容
var Brother = React.createClass({
	render: function () {
		return (
			<div>
				<h1>{this.props.msg}</h1>
			</div>
		)
	}
})
// 要让这两个组件通信
var Parent = React.createClass({
	// 初始化msg
	getInitialState: function() {
		return {
			msg: ''
		}
	},
	// 定义获取子组件内容的方法
	parentGetChildMsg: function (e) {
		//当子组件发送数据的时候，我们将数据存储父组件状态中 
		this.setState({
			msg: e.target.value
		})
	},
	render: function() {
		return (
			<div>
				<Child changeValue={this.parentGetChildMsg}></Child>
				<Brother msg={this.state.msg}></Brother>
			</div>
		)
	}
})

// 将组件渲染到页面中
ReactDOM.render(<Parent />, app)