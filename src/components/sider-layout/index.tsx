
import { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Operators from './operators';
import s from './index.module.css'

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('首页', 'home', <HomeOutlined />),
    getItem('转换类', 'convert', null, [getItem('数字类型', 'number')]),
    getItem('格式类', 'format', null, [getItem('JSON转换', 'json')]),
    getItem('生成类', 'generate', null, [getItem('hash', 'hash'), getItem('GA', 'authenticator')]),
];

const SiderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick: MenuProps['onClick'] = ({ keyPath }) => {
    navigate([...keyPath].reverse().join('/'));
  };

  const selectedKeys = useMemo(() => {
    const keys = location.pathname.split('/').filter(Boolean);
    return keys.length ? keys : ['home'];
  }, [location.pathname]);

  return (
    <Sider
      className={s.siderBox}
      data-tauri-drag-region
    >
      <Operators />
      <Menu
        onClick={onClick}
        defaultOpenKeys={items.map((item) => item?.key as string)}
        selectedKeys={selectedKeys}
        style={{ width: 200 }}
        mode="inline"
        items={items}
      />
    </Sider>
  )
}

export default SiderLayout