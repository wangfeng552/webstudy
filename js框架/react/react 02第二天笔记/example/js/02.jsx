// 创建导航组件
var Nav = React.createClass({
	// num是内部维护的一个变量的，所以要写在状态中
	getInitialState: function() {
		return {
			// num起始是0
			num: 0
		}
	},
	// 定义改变num的回调函数
	changeNum: function () {
		// num + 1
		this.setState({
			num: ++this.state.num
		})
	},
	// 定义render方法渲染虚拟dom
	render: function () {
		// 每次获取num书写太麻烦了，所以我们缓存一下
		var num = this.state.num;
		return (
			<ul>
				{/*点击换一换相当于对num+1*/}
				<span onClick={this.changeNum}>换一换</span>
				{/*这三组li元素不能同时出现，比如我们内部维护一个num，只需要让每个li的显隐对num求余就可实现需求*/}
				{/*设置每个li的样式*/}
				<li style={{display: num % 3 === 0 ? 'block' : 'none'}}>
					<a href="">我要卖车</a>
					<a href="">加盟店排行</a>
					<a href="">炒金微信群</a>
				</li>
				<li style={{display: num % 3 === 1 ? 'block' : 'none'}}>
					<a href="">整形特惠</a>
					<a href="">玻尿酸美容</a>
					<a href="">双眼皮钜惠</a>
				</li>
				<li style={{display: num % 3 === 2 ? 'block' : 'none'}}>
					<a href="">新房装修</a>
					<a href="">北京新楼盘</a>
					<a href="">北京买新房</a>
				</li>
			</ul>
		)
	}
})

// 将组件渲染那到页面中
ReactDOM.render(<Nav />, document.getElementById('app'))
// 渲染第二个组件
ReactDOM.render(<Nav />, document.getElementById('app2'))