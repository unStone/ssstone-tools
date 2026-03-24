import { useMemo, useState } from 'react';
import { Layout, Input, Empty } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOOL_MODULES } from 'constants/tools';
import Operators from './operators';
import s from './index.module.css'

const { Sider } = Layout;

const SiderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchMap, setSearchMap] = useState<Record<string, string>>({});

  const selectedPath = useMemo(() => {
    const path = location.pathname.replace(/^\//, '');
    return path || 'home';
  }, [location.pathname]);

  const onSearch = (moduleKey: string, value: string) => {
    setSearchMap((prev) => ({ ...prev, [moduleKey]: value }));
  };

  return (
    <Sider className={s.siderBox} data-tauri-drag-region>
      <Operators />

      <div className={s.homeEntry} onClick={() => navigate('/home')}>
        <HomeOutlined />
        <span>首页</span>
      </div>

      <div className={s.modules}>
        {TOOL_MODULES.map((module) => {
          const keyword = searchMap[module.key]?.trim().toLowerCase() || '';
          const filteredTools = module.tools.filter((item) => item.label.toLowerCase().includes(keyword) || item.key.toLowerCase().includes(keyword));

          return (
            <section className={s.moduleCard} key={module.key}>
              <div className={s.moduleTitle}>{module.title}</div>
              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder={`搜索${module.title}`}
                size="small"
                className={s.moduleSearch}
                value={searchMap[module.key] || ''}
                onChange={(event) => onSearch(module.key, event.target.value)}
              />

              {filteredTools.length ? (
                <div className={s.toolList}>
                  {filteredTools.map((tool) => {
                    const path = `${module.key}/${tool.key}`;
                    const active = selectedPath === path;
                    return (
                      <button
                        key={tool.key}
                        type="button"
                        className={`${s.toolButton} ${active ? s.active : ''}`}
                        onClick={() => navigate(`/${path}`)}
                      >
                        {tool.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有匹配工具" className={s.emptyBlock} />
              )}
            </section>
          );
        })}
      </div>
    </Sider>
  )
}

export default SiderLayout
