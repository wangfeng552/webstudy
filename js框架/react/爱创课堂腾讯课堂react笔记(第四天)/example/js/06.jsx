// 定义注册组件  约束性组件
var Regist = React.createClass({
	// 初始化状态
	getInitialState: function() {
		return {
			form: {
				username: '',
				telephone: '',
				code: '',
				password: ''
			}
		}
	},
	// 表单元素改变都会执行这个方法
	changeValue: function (e) {
		// 获取数据，保存在状态中
		var value = e.target.value;
		// 如果事件回调被公用了，我们可以为每一个元素绑定一个name属性，来区别于每一个元素
		// 访问name属性更方便
		var key = e.target.name;
		// console.log(e.target.value)
		// 更新状态，在原有对象上修改
		// var form = {}; form[key] = value; 更新状态，这种方式是不对的
		var form = this.state.form;
		form[key] = value;
		// 更新状态
		this.setState({
			form: form
		})
	},
	// 去登陆
	gotoLogin: function () {
		// 我们用约束性组件完成项目，那么此时我们获取的就是状态
		$.post('data/regist.json', this.state.form, function (res) {
			if (res && res.errno === 0){
				// 成功了
				console.log('success')
			}
		})

	},
	render: function () {
		// 缓存状态数据
		var form = this.state.form;
		// 渲染输出虚拟DOM
		return (
			<div className="container">
				<div className="form-horizontal">
					<div className="form-group">
						<label htmlFor="" className="control-label col-lg-3">用户名</label>
						<div className="col-lg-4">
							<input value={form.username} name="username" onChange={this.changeValue} type="text" className="form-control" placeholder="请设置用户名"/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="control-label col-lg-3">手机号</label>
						<div className="col-lg-4">
							<input value={form.telephone} name="telephone" onChange={this.changeValue} type="text" className="form-control" placeholder="可用于登录和找回密码"/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="control-label col-lg-3">验证码</label>
						<div className="col-lg-4">
							<input value={form.code} name="code" onChange={this.changeValue} type="text" className="form-control" placeholder="请输入验证码"/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="control-label col-lg-3">密码</label>
						<div className="col-lg-4">
							<input value={form.password} name="password" onChange={this.changeValue} type="text" className="form-control" placeholder="请设置登录密码"/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-lg-4 col-lg-offset-3">
							<div className="checkbox">
								<label htmlFor="">
									<input type="checkbox"/>阅读并接受
									<a href="">《百度用户协议》</a>
								</label>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-lg-4 col-lg-offset-3">
							<button onClick={this.gotoLogin} className="btn btn-lg btn-primary btn-block">注册</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

// 渲染组件
ReactDOM.render(<Regist />, app)