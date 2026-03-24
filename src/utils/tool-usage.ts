import Store from 'store/index';
import { FLAT_TOOLS } from 'constants/tools';

const TOOL_USAGE_STORE_KEY = 'TOOL_USAGE_STORE_KEY';
const toolUsageStore = new Store(TOOL_USAGE_STORE_KEY);

export const getToolUsageMap = (): Record<string, number> => {
  const usage = toolUsageStore.getAllData();
  return usage || {};
};

export const increaseToolUsage = (path: string) => {
  if (!FLAT_TOOLS.some((tool) => tool.path === path)) {
    return;
  }

  const current = Number(toolUsageStore.getData(path) || 0);
  toolUsageStore.setData({ [path]: current + 1 });
};
