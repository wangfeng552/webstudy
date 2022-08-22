import React, { Component, useState } from 'react';
import { Link, history } from 'umi';
import { Button } from 'antd';

const Order = ({ location, match }) => {
  const [data, setData] = useState([]);

  const delOrder = () => {
    data.splice(0, 1);
    setData([...data]);
  };
  
  // 获取路径参数
  const { query } = location;
  const { params } = match;

  return (
    <div>
      order
      <Button
        onClick={() => {
          history.push('/');
        }}
      >
        使用history跳转
      </Button>
      <Link to="/">使用Link跳转</Link>
      <Button onClick={delOrder}>删除订单</Button>
    </div>
  );
};

export default Order;
