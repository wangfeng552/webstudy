import {useState, useImperativeHandle,forwardRef} from 'react'
//props子组件需要接收 ref

const ChildComp = (props, ref) => {

    const [val, setVal] = useState('')
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    useImperativeHandle(ref, () => ({
        // changeVal 就是暴露给父组件的方法, newVal是父组件传递的参数
        changeVal: (newVal) => {
          setVal(newVal)
        }
    }))
  return (
    <div>{val}</div>
 )
}
let MhildComp = forwardRef(ChildComp)

export default MhildComp