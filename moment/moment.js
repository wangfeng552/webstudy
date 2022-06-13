moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') // 当天0点的时间格式
moment().startOf('day').format('X') // 当天0点的时间缀，以10位Unix时间戳输出(秒）
moment().endOf('day').format('YYYY-MM-DD HH:mm:ss') // 当天23点59分59秒的时间格式
moment().endOf('day').format('x') //当天23点59分59秒以13位Unix时间戳输出（毫秒）

moment('2020-06-30').startOf('day').format('x') // 2020-06-30当天0点的以13位Unix时间戳输出（毫秒）
moment('2020-06-30').endOf('day').format('x') // 2020-06-30当天24点的以13位Unix时间戳输出（毫秒）
