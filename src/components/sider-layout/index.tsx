
import { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

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
    getItem('格式类', 'format', null, [getItem('JSON转换', 'json')]),
];

const SiderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick: MenuProps['onClick'] = ({ keyPath }) => {
    navigate([...keyPath].reverse().join('/'));
  };

  const selectedKeys = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname]);

  return (
    <Sider
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, background: '#fff', paddingTop: 20 }}
    >
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