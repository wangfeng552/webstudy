import React, { Component } from 'react'

import ChildUrl from './childUrl'

interface ParentProps {

}

interface ParentState {
    name:string
}

class Parent extends React.Component<ParentProps, ParentState> {
    state = {
        name: "我是父组件的名称",
    }

    showName = () => {
        console.log('触发了父组件的方法');
    }


    render() {
       const {name} = this.state
        return (<div>
            <ChildUrl userName={name} showName={this.showName} />
        </div>)
    }
}

export default Parent;