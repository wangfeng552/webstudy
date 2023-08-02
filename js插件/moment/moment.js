moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') // 当天0点的时间格式
moment().startOf('day').format('X') // 当天0点的时间缀，以10位Unix时间戳输出(秒）
moment().endOf('day').format('YYYY-MM-DD HH:mm:ss') // 当天23点59分59秒的时间格式
moment().endOf('day').format('x') //当天23点59分59秒以13位Unix时间戳输出（毫秒）

moment('2020-06-30').startOf('day').format('x') // 2020-06-30当天0点的以13位Unix时间戳输出（毫秒）
moment('2020-06-30').endOf('day').format('x') // 2020-06-30当天24点的以13位Unix时间戳输出（毫秒）

moment().startOf('day').subtract(6, 'days') //往前6天

// 获取时间戳(当前时间转时间戳)
moment().format('X') // （大写X）以秒为单位，返回值为字符串类型
moment().format('x') // （小写x）以毫秒为单位，返回值为字符串类型
moment().valueOf()   //   以毫秒为单位，返回值为数值型

moment().add(1,'days').format() // 加一天
moment().add(1,'y').format() // 加一年
