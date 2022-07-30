import React, { Component } from 'react'
import { connect } from "dva"
import { ConnectState } from '@/models/connect';
const DvaDemo = (props:any)=>{
    console.log(props);
    return (
        <div>123</div>
    )
}

export default connect(( {loading,user}:ConnectState) => ({
    user
  }))(DvaDemo);