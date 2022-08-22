import React, { FC, memo } from 'react';
interface ChildProps {
  isShow: boolean;
  changeShow: () => void;
}
const Child: FC<ChildProps> = ({ isShow, changeShow }) => {
  
  let node;
  if (isShow) {
    node = <div>123</div>;
  } else {
    node = <div>222</div>;
  }

  return (
    <>
      {node}
      <button onClick={changeShow}>点击</button>
    </>
  );
};

export default memo(Child);
