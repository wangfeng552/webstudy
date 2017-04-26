// 换肤数据要有异步接口返回，所以我们要获取异步数据
// react只是一个视图框架，不能对数据获取以及维护，所以我们定义一个异步获取数据方法，用来获取数据
/**
 * 异步请求方法
 * @ulr 	表示请求地址
 * @fn 	请求成功时候的回调函数
 **/
function ajax(url, fn) {
	// 定义xhr对象
	var xhr = new XMLHttpRequest();
	// 监听状态改变
	xhr.onreadystatechange = function () {
		//监听readyState是4
		if (xhr.readyState === 4) {
			// 监听正确返回
			if (xhr.status === 200) {
				// 此时执行回调函数
				// 将数据转化成json对象
				fn && fn(JSON.parse(xhr.responseText));
			}
		}
	}
	// 发出请求
	xhr.open('GET', url, true);
	// 发送数据
	xhr.send(null)
}
// 测试方法
// ajax('data/skin.json', function (res) {
// 	console.log(res)
// })

// 定义换肤组件
var Skin = React.createClass({
	// 内部数据保存在状态中
	getInitialState: function () {
		// 返回初始化状态
		return {
			list: []
		}
	},
	// 定义回调函数
	changeBg: function (e) {
		// 我们希望在回调函数中访问到数据id，
		// 在react事件对象中获取绑定事件的dom元素用currentTarget
		var id = e.currentTarget.getAttribute('data-id')
		// 根据id创建一个大图片的地址，赋值body
		var url = 'img/skin/big_' + id + '.jpg';
		// 修改body的背景
		document.body.style.backgroundImage = 'url(' + url + ')';

	},
	// 创建子列表
	createList: function () {
		var me = this;
		// 根据内部数据list来渲染列表
		return this.state.list.map(function (value, index) {
			// 返回每一个成员的虚拟dom
			// 注意value是一个对象, id表示数据的id，src表示小图片的地址，title表示标题
			// 想在里面使用this，就要缓存组件实例化对象
			return (
				<li key={index} data-id={value.id} onClick={me.changeBg}>
					{/*图片的地址要做字符串的拼接*/}
					<img src={'img/skin/' + value.src} alt=""/>
					<p>{value.title}</p>
				</li>
			)
		})
	},
	// 通过render方法渲染虚拟dom
	render: function() {
		return (
			<div className="skin">
				<div className="container">
					<ul>{this.createList()}</ul>
				</div>
			</div>
		)
	},
	// 获取数据通常要等到组件构建完成
	componentDidMount: function () {
		// 缓存this
		var me = this;
		// 请求数据，并将结果保存在内部变量list中
		ajax('data/skin.json', function (res) {
			if (res && res.errno === 0) {
				// 将结果保存在组件中
				// console.log(me)
				me.setState({
					list: res.data
				})
			}
			// console.log(res)
		})
	}
})
// 将组件渲染到页面中
ReactDOM.render(<Skin />, document.getElementById('app'))