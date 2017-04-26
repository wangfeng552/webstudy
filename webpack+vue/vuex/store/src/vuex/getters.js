//从数据库里取数据,不能修改数据，不会对原数据造成影响的函数，写在computed
const getters={
    name: state => state.name,
    age:state => state.age,
    username:state => state.username
}
export  default getters