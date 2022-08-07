import React, { useEffect, useRef } from 'react'
import E from 'wangeditor'
import fileMenu from './FileMenu'
const RichEditor = (props:any) => {
    let editRef:any = useRef()

    useEffect(()=>{
        let editor = new E(editRef.current)
        editor.config.zIndex = 10
        editor.config.onblur = function (newHtml:any) {
            console.log('onblur', newHtml) // 获取最新的 html 内容
            props.onChange(newHtml)
        }
        editor.create()
        // 要放在editor实例化之后创建上传菜单
    fileMenu(editor, editRef.current);
    },[])

    return (
        
        <div ref={editRef}></div>
    )
}

export default RichEditor