// 方法1传统用法
// 代码中用useRef创建了couterRef对象，并将其赋给了button的ref属性。这样，通过访问couterRef.current就可以访问到button对应的DOM对象。
import React, { useState, useEffect, useMemo, useRef } from 'react';
export default function App(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const couterRef = useRef();

  useEffect(() => {
    document.title = `The value is ${count}`;
    console.log(couterRef.current);
  }, [count]);
  
  return (
    <>
      <button ref={couterRef} onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}</button>
    </>
  );
}




// ref 方法2 跨渲染周期”保存数据。
// import React, { useState, useEffect, useMemo, useRef } from 'react';

// export default function App(props){
//   const [count, setCount] = useState(0);

//   const doubleCount = useMemo(() => {
//     return 2 * count;
//   }, [count]);

//   const timerID = useRef();
  
//   useEffect(() => {
//     timerID.current = setInterval(()=>{
//         setCount(count => count + 1);
//     }, 1000); 
//   }, []);
  
//   useEffect(()=>{
//       if(count > 10){
//           clearInterval(timerID.current);
//       }
//   });
  
//   return (
//     <>
//       <button ref={couterRef} onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}</button>
//     </>
//   );
// }