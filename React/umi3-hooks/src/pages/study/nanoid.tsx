import React, { useRef } from 'react';
import { nanoid, customAlphabet } from 'nanoid';

export default function NanoidDemo() {
  // useRef
  const refText: any = useRef();
  const handlerFocusText = ()=>{
    refText.current.focus()
  }

  console.log('refText',refText);
  
  // 使用自定义字符生成nanoid
  const nanoid = customAlphabet('1234567890', 5);
  console.log(-nanoid());



  return (
    <div>
      <input ref={refText} type="text" />
      <button onClick={handlerFocusText}>点击</button>
    </div>
  );
}
