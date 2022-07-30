import React, { Component,useState } from 'react'
import { Button } from 'antd'


interface SearchForm {
    name: string;
    age: number;
}

interface StateStudyProps {

}

interface StateStudyState {
    isShow: boolean;
    count: number;
    searchForm: SearchForm
}

class StateStudy extends React.Component<StateStudyProps, StateStudyState> {
    state = {
        isShow: false,
        count: 0,
        searchForm: {
            name: '',
            age: 0
        }
    }

    changeStateValue = () => {
        // 方法1 接收对象
        // let t = this.state.searchForm
        // t.name='12'
        // this.setState({
        //     searchForm:t
        // })

        // 方法2 接收对象
        // let age=10
        // this.setState({
        //     searchForm:{
        //         name:'111',
        //         age
        //     }
        // })

        // 方法3 接收函数
        // 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
        this.setState((prevState,props) => ({
            isShow: !prevState.isShow,
            searchForm: {
                name: '123',
                age: 10
            }
        }))
    }
    render() {
        let t = null
        if (this.state.isShow) {
            t = <h2 style={{ fontSize: 30 }}>我是主标题</h2>
        } else {
            t = <h2 style={{ fontSize: 30 }}>我是副标题</h2>
        }

        console.log(this.state);
        

        return (<div>
            <div>{t}</div>
            <h3>state接收一个函数 <Button onClick={this.changeStateValue}>改变state的值</Button></h3>
            <div>{this.state.count}</div>
        </div>);
    }
}

export default StateStudy;