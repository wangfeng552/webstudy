import { useState } from 'react';
import { Menu } from 'antd';
import { history } from 'umi';
import style from './index.less'
export default function home({ children, location, match }) {
  const [selectKey, setSelectKey] = useState(location.pathname);

  const changeMenu = (item: any) => {
    if (item.key === 'luntan') {
      window.open('http://www.baidu.com');
      return;
    }
    setSelectKey(item.key);
    history.push(item.key);
  };

  const menuItems = [
    {
      label: '新闻',
      key: '/menu/news',
      children: [{ label: '子菜单项', key: '/menu/dog' }],
    }, // 菜单项务必填写 key
    { label: '天气', key: '/menu/wether' },
  ];
  
  return (
    <>
      <div className={style.wfmenu}>
        <Menu
          theme="dark"
          onClick={changeMenu}
          selectedKeys={[selectKey]}
          mode="horizontal"
          items={menuItems}
        />
      </div>
      <div>{children}</div>
    </>
  );
}