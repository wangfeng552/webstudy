import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
const Example = ()=>{
    const [count, setCount] = useState(0)
    const [searchForm, setSearchForm] = useState({ text: 'nihao', age: 0 });
    const inputRef = useRef<HTMLInputElement>(null);

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
        
    },[])

    return (
        <div>
            <div>{count}</div>
            <Button onClick={() => setCount(count + 1)}>点击count+1</Button>
            <Button onClick={getUser}>点击count+1</Button>
            <input type="text" value={searchForm.text} onChange={onChangeValue} ref={inputRef} />
            <Button onClick={getInputRef}>通过ref获取值</Button>
        </div>
    )
}

export default Example