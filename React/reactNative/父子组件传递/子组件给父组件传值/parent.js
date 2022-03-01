import Child from './child'
export default class Child extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      text:''
    }
  }
  _parentClick = (v)=>{
    this.setState({
      text:v
    })
  }
  render(){
    return (
      <View style={styles.layout}>
        <Text>{this.state.text}</Text>
        <ChildNews title="我是父组件的标题" parentClick={this._parentClick} />
      </View>
    )
  }
}

// 1.在父组件中定义方法   parentClick= ()=>{}
// 2.在子组件上传递方法   parentClick={this._parentClick}