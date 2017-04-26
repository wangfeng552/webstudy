// 创建子组件
var Child = React.createClass({
	// 定义子组件的方法
	changeInp: function (e) {
		// console.log(arguments)
		// 获取input的内容，所以要访问input元素，通过value属性获取
		var val = e.target.value
		// 访问input的内容
		// 通过ref（），通过事件对象访问input
		// console.log(this)
		// 在子组件执行父组件的方法，父组件方法执行时候的作用域？
		this.props.method(val)
	},
	render: function () {
		// 渲染虚拟DOM
		return (
			<div>
				{/*<input type="text" onChange={this.changeInp}/>*/}
				{/*input元素可以绑定事件回调函数，如果回调函数式父组件传递的方法*/}
				<input type="text" onChange={this.props.method}/>

			</div>
		)
	}
})
// 创建父组件
var Parent = React.createClass({
	// 初始化状态
	getInitialState: function () {
		return {
			msg: '默认的数据'
		}
	},
	// 在父组件中创建一个方法
	parentMethod: function () {
		// 父组件方法传递给子组件的时候，执行时候的作用域就是父组件的
		console.log('parent fn')
		console.log(this, 'parent', arguments)
	},
	render: function () {
		// 渲染虚拟DOM
		return (
			<div>
				<Child method={this.parentMethod}></Child>
				<h1>{this.state.msg}</h1>
			</div>
		)
	}
})

// 渲染组件
ReactDOM.render(<Parent />, document.getElementById('app'))