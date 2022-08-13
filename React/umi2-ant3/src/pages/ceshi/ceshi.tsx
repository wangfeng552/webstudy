import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

const Ceshi = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    useEffect(()=>{
        console.log(111);
        
    },[count,name])

    useEffect(()=>{
       return (
        ()=>{
            console.log('xizaila');
        }
       )
    },[])

    return (
        <div>
            <div>{count}</div>
            <Button onClick={() => { setCount(count + 1) }}>点击</Button>
            <Button onClick={() => { setName(name + 'a') }}>点击</Button>
        </div>
    )
}

export default Ceshi