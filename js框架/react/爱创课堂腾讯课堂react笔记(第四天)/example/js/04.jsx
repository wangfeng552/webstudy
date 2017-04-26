// 创建一个搜索组件
// 当点击按钮时候，获取input的值，然后根据这个值进行搜索
var Search = React.createClass({
	// 搜索方法
	goSearch: function () {
		// 获取input的值
		// console.log(this)
		var inp = this.refs.searchValue
		// 获取数据内容
		console.log(inp.value)
		// 设置非约束性组件内容，也要通过这个元素
		inp.value = '更新搜索内容'
	},
	render: function () {
		return (
			<div>
				<input ref="searchValue" defaultValue="在北京买房子" type="text"/>
				<button onClick={this.goSearch}>搜索</button>
			</div>
		)
	}
})

// 渲染组件
ReactDOM.render(<Search />, app)