import React, { useMemo, useState } from 'react';


export default function memo() {
  const [age, setAge] = useState(0);
  const [area, setArea] = useState(0);

  const totalAge = useMemo(() => {
    return age + area;
  }, [age]);

  return (
    <div>
     
      <p>使用useMemo计算出来的值 --- {totalAge}</p>
      <div>age:{age}</div>
      <div>area:{area}</div>
      <button onClick={() => setAge(age + 1)}>age+1</button>
      <button onClick={() => setArea(area + 100)}>age+1</button>
    </div>
  );
}
