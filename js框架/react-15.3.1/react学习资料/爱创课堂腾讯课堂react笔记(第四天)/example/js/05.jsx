// 创建组件
var Search = React.createClass({
	// 初始化状态
	getInitialState: function() {
		return {
			msg: '',
			error: ''
		}
	},
	// 搜索
	goSearch: function () {
		// 获取input的值，通过状态获取
		console.log(this.state.msg)
	},
	changeValue: function (e) {
		// 获取值，更新状态
		// console.log(e.target.value)
		var val = e.target.value;
		// 输入校验
		// 不能输入@符号
		// 如果判断有@我们就停止更新状态
		if (/@/.test(val)) {
			this.setState({
				error: '您输入了@符号，请重新输入'
			})
			return ;
		}
		// 更新状态
		this.setState({
			msg: val,
			error: ''
		})
	},
	render: function () {
		return (
			<div>
				<input value={this.state.msg} onChange={this.changeValue} type="text" />
				<button onClick={this.goSearch}>搜索</button>
				<p>{this.state.error}</p>
			</div>
		)
	}
})

// 将组建渲染到页面中
ReactDOM.render(<Search />, app)