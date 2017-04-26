// 捕获所有jsx语法文件处理
fis.match('**.jsx', {
	// 引入插件编译
	parser: 'babel2',
	// 更改后缀名称
	rExt: '.js'
})
// 编译less文件
fis.match('**.less', {
	parser: 'less',
	// 更改后缀名称
	rExt: '.css'
})