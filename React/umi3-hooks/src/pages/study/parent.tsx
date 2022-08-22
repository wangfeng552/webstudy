import React, { useCallback, useState } from 'react';
import Child from './child';

export default function parent() {
  const [isShow, setIsShow] = useState(false);

  // 既然使用useCallback减少了函数式参数不必要的更新，子组件收到的参数不变，自然也不会更新，从而减少了组件间不必要的更新
  const changeShow = useCallback(() => {
    let show = isShow === true ? false : true;
    setIsShow(show);
  }, [isShow]);

  console.log("isShow",isShow);
  
  return (
    <div>
      <Child changeShow={changeShow} isShow={isShow}></Child>
    </div>
  );
}
