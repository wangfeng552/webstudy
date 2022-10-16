import {useRef} from 'react'
import MhildComp from './getChild'

const FComp = () => {
    const childRef = useRef(null)
    const updateChildState = () => {
        // changeVal就是子组件暴露给父组件的方法
        childRef.current.changeVal(99);
    }
    
    return (
      <>
        <MhildComp ref={childRef}></MhildComp>
        <button onClick={updateChildState}>触发子组件方法</button>
      </>
    )
}
export default FComp 