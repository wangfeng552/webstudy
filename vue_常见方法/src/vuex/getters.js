//从数据库里取数据,不能修改数据，不会对原数据造成影响的函数，写在computed
const getters={
  count: state => state.user.count,
  getCount: state => {
    const limit = 5
    let end = state.user.history.length
    let begin = end - limit < 0 ? 0 : end - limit
    return state.user.history.slice(begin, end).toString().replace(/,/g, ' ')
  },
  selectText: state => state.admin.admin,
  city: state => state.city.city,
}
export default getters
