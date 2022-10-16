import React, { Component } from "react"

class Item extends Component {
    constructor(props){
        super(props)
    }
    // 组件第一次存在于Dom中，函数是不会被执行的
    // 如果已经存在于Dom中，函数才会执行
    // 子组件接收到父组件传递过来的参数，父组件render函数重新被执行，这个生命周期就会被执行。
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    render(){
        console.log(this.props);
        return (
            <li>123</li>
        )
    }
}

class Life extends Component {
  // A 初始化
  constructor(props) {
    super(props)
    this.state = {
      name: "",
    }
  }

  getInputName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }


  // B 挂载阶段
  // componentWillMount
  // render
  // componentDidMount
  componentWillMount() {
    console.log("页面即将挂载")
  }
  componentDidMount() {
    console.log("页面已经挂载")
  }
  // C 更新阶段
  // shoudComponentUpdate 组件发生改变前 返回true 和false
  // compoentWillUpdate 组件即将更新前
  // render // 更新中
  // componentDidUpdate 组件更新完
  shouldComponentUpdate(nextProps,nextState) {
    console.log('nextProps',nextProps.name);
    console.log('nextState',nextState);
    console.log("shouldComponentUpdate---组件发生改变前执行 返回true 和false")
    // 要求返回 true 和 false
    return true
  }
  componentWillUpdate() {
    console.log("2 componentWillUpdate---组件即将更新前")
  }
  componentDidUpdate() {
    console.log("3 render---- 开始挂载渲染")
    console.log("4 componentDidUpdate----组件更新之后执行")
  }


//   D 卸载阶段
componentWillUnmount(){
    console.log('componentWillUnmount----组件卸载阶段');
}

  render() {
    console.log("render-组件挂载中")
    return (
      <div>
        <input
          onChange={(e) => {
            this.getInputName(e)
          }}
        />
        <Item name={this.state.name}></Item>
      </div>
    )
  }
}

export default Life
