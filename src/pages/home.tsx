import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLAT_TOOLS } from 'constants/tools';
import { getToolUsageMap } from 'utils/tool-usage';
import s from './home.module.css';

function Home() {
  const navigate = useNavigate();
  const usageMap = getToolUsageMap();

  const sortedTools = useMemo(() => {
    return [...FLAT_TOOLS]
      .map((tool) => ({
        ...tool,
        usage: Number(usageMap[tool.path] || 0),
      }))
      .sort((a, b) => {
        if (b.usage !== a.usage) {
          return b.usage - a.usage;
        }

        return a.label.localeCompare(b.label, 'zh-Hans-CN');
      });
  }, [usageMap]);

  return (
    <div className={s.home}>
      <div className={s.title}>常用工具</div>
      <div className={s.desc}>首页按使用频率优先，频率相同时按工具名称排序。</div>

      <div className={s.list}>
        {sortedTools.map((tool) => (
          <button key={tool.path} type="button" className={s.card} onClick={() => navigate(`/${tool.path}`)}>
            <div className={s.name}>{tool.label}</div>
            <div className={s.path}>{tool.moduleTitle} / {tool.path}</div>
            <div className={s.meta}>使用次数：{tool.usage}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
