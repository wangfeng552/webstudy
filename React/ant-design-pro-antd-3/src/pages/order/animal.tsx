import React, { Component } from 'react'
import {Button} from 'antd'
import router, { RouteData } from 'umi/router'
interface AnimalProps {
    
}
 
interface AnimalState {
    
}
 
class Animal extends React.Component<AnimalProps, AnimalState> {
    state = { name:1  }

    goDetail= ()=>{
        router.push("/order/shopDetail/1")
    }
    render() { 
        return ( <div>animal

            <Button onClick={this.goDetail}>去详情</Button>


        </div> );
    }
}
 
export default Animal;