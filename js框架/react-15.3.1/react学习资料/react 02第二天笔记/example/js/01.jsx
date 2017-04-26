// 定义mystyle变量
// var myStyle = {
// 	// 字体颜色是绿色
// 	color: 'green',
// 	// 字体大小是50px
// 	fontSize: '50px',
// 	// 设置投影
// 	WebkitBoxShadow: '10px 10px red'
// };
// // 在jsx语法中使用js对象，要使用插值，插值的语法就是{变量}
// // var h1 = (<h1 style={myStyle}>爱创课堂</h1>);
// // 插值语法中允许使用表达式
// var h1 = (<h1 style={{
// 	color: 'pink',
// 	fontSize: '100px'
// }}>爱创课堂</h1>);
// 将h1虚拟dom渲染到页面中
// ReactDOM.render(h1, document.getElementById('app'))


// 创建一个组件
var Demo = React.createClass({
	// 定义默认状态
	getInitialState: function() {
		// 必须通过return 返回初始化状态
		return {
			// 表示点击的次数
			num: 0
		}	
	},
	// 定义一个事件回调函数方法
	clickBtn: function () {
		// console.log('success')
		// console.log(this)
		// console.log(arguments)
		// 触发交互，我们要改变状态中存储的数据
		this.setState({
			// 改变的状态数据
			num: ++this.state.num
		})
	},
	// 虚拟DOM数输出方法
	render: function() {
		// 必须通过return返回虚拟dom树
		console.log(this)
		return (
			<div>
				/*这些这里的多行注释会当作文本节点渲染*/
				// 写在这里的单行注释也会当作文本节点渲染
				{/*react的jsx语法中，写注释，一定要写插值符号中*/}
				<button onClick={this.clickBtn}>按钮</button>
				<p>点击了{this.state.num}次</p>
			</div>
		)
	}
})

// 将组件渲染到页面中 将组件转化成虚拟
ReactDOM.render(<Demo />, document.getElementById('app'))