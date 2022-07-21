import React, { useState, useEffect, useRef, useCallback,useMemo } from 'react'
import { Button ,Input} from 'antd'
const Example = ()=>{
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState(0)

    const [searchForm, setSearchForm] = useState({ text: 'nihao', age: 0 });
    const inputRef = useRef<HTMLInputElement>(null);

    const addCount = useCallback(()=>{
        setCount(count+1)
    },[count])

    const getMessage = useMemo(()=>{
        return message+1
    },[message])

    const getUser = () => {
        console.log(searchForm);
    }

    const onChangeValue = (event: any) => {
        setSearchForm({ ...searchForm, text: event.target.value })
    }

    // 通过ref获取input的值
    const getInputRef = () => {
        console.log(inputRef.current?.value);
    }

    // 相当于 componentDidMount 和 componentDidUpdate:
    useEffect(() => {
        document.title = '改变页面标题'
        console.log('useEffect');
        return (()=>{
            console.log(1234);
        })
    },[])

    return (
        <div>
            <div>{count}</div>
            <Button onClick={addCount}>点击count+1</Button>
            <div>{message}</div>
            <Button>更新message{getMessage}</Button>
            <Button onClick={getUser}>获取searchForm</Button>
            <input type="text"  value={searchForm.text} onChange={onChangeValue} ref={inputRef} />
            <Input type="text" value={searchForm.text} onChange={onChangeValue}/>
            <Button onClick={getInputRef}>通过ref获取值</Button>
        </div>
    )
}

export default Example