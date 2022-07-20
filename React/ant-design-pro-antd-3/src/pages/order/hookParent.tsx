import React, { useContext,useState } from 'react'
import {Button} from 'antd'
import HookChild from './hookChild'
export const TestContext = React.createContext()
const HookParent = ()=>{
    const [value,setValue] = useState(0);
    return(
        <div>
            {(()=>{console.log("Parent-render")})()}
            <Button onClick={()=>{setValue(value+1)}}>value: {value}</Button>
            <TestContext.Provider value={value}>
                <Child1></Child1>
                <Child2></Child2>
                <HookChild></HookChild>
            </TestContext.Provider>
        </div>
    )
}

const Child1 = ()=>{
    const value = useContext(TestContext)
    return (
        <div>
            <h3>Child1-value:{value}</h3>
        </div>
    )
}

const Child2 = ()=>{
    const value = useContext(TestContext)
    return (
        <div>
            <h3>Child2-value:{value}</h3>
        </div>
    )
}

export default HookParent