import React, { useState } from 'react';
import { Link, history, Prompt, useParams, useLocation, } from 'umi';
import { Button } from 'antd';

const Order = ({ location, match }) => {
  const [data, setData] = useState([]);

  const delOrder = () => {
    data.splice(0, 1);
    setData([...data]);
  };

  // 方法 1 props
  // 获取路径参数
  const { query } = location;
  const { params } = match;

  // 方法2获取路径参数
  // hooks，获取 params 对象。 params 对象为动态路由（例如：/users/:id）里的参数键值对。
  const routerParams = useParams();
  console.log('routerParams', routerParams);

  // 获取query参数
  const matchData = useLocation();
  console.log('matchData', matchData);
  

  return (
    <div>
      <Prompt message="你确定要离开么？" />
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
