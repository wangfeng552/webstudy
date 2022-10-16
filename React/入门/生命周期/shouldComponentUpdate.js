import React, { Component } from "react"

class Item extends Component {
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(nextProps,nextState) {
      console.log(this.props);
      console.log('即将变化的nextProps',nextProps);
      if(nextProps.name !== this.props.name){
        return true
      }
      return false
    }
    render(){
      console.log('子组件渲染');
        return (
            <li>{this.props.name}</li>
        )
    }
}

class Life extends Component {
  // A 初始化
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      list:[]
    }
  }

  getInputName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  setList = ()=>{
    this.setState({
      list:[...this.state.list,this.state.name]
    })
  }


  render() {
    return (
      <div>
        <input
          onChange={(e) => {
            this.getInputName(e)
          }}
        />
        <button onClick={this.setList}>添加list</button>
        <Item name={this.state.list}></Item>
      </div>
    )
  }
}

export default Life
