import React, { useCallback, useEffect, useState } from 'react'

const Child=({onClick,name})=>{
    const [list,setList] = useState()

    useEffect(()=>{
        // 未使用会一直触发这里的方法
        console.log('update');
        setList(onClick())
    },[onClick])

    console.log(name);

    return (
        <div>
            <ul>
                {
                    list?.map((item,index)=>{
                        return (
                            <li key={index}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default function UseCallback() {
    const [count,setCount] = useState(1)
    const [val,setVal] = useState(1)
    // 未使用useCallback
    // const show = ()=>{
    //     return [count,count+1,count+2]
    // }

    // 使用useCallback 传给子组件的方法需要使用useCallback来避免重复执行
    const show = useCallback(()=>{
        return [count,count+1,count+2]
    },[count])
  return (
    <div>
        <button onClick={()=>setCount(count+1)}>{count}添加Count</button>
        <button onClick={()=>setVal(val+1)}>{val}添加Val</button>

        <Child onClick={show} name="lisi"></Child>

    </div>
  )
}
