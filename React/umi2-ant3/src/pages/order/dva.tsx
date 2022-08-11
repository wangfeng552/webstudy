import React, { Component,useState } from 'react'
import { connect } from "dva"
import { ConnectState } from '@/models/connect';
import {Input} from 'antd'
const DvaDemo = (props:any)=>{
    console.log(props);
    return (
        <div>

        </div>
    )
}

export default connect(( {loading,user}:ConnectState) => ({
    user
  }))(DvaDemo);