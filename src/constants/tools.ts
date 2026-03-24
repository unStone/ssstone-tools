export interface ToolItem {
  key: string;
  label: string;
}

export interface ToolModule {
  key: string;
  title: string;
  tools: ToolItem[];
}

export const TOOL_MODULES: ToolModule[] = [
  { key: 'convert', title: '转换类', tools: [{ key: 'number', label: '数字类型' }] },
  { key: 'code', title: '编码/转码类', tools: [{ key: 'url', label: 'URL' }] },
  { key: 'format', title: '格式类', tools: [{ key: 'json', label: 'JSON转换' }] },
  {
    key: 'generate',
    title: '生成类',
    tools: [
      { key: 'hash', label: 'Hash' },
      { key: 'authenticator', label: 'GA' },
    ],
  },
];

export const FLAT_TOOLS = TOOL_MODULES.flatMap((module) => {
  return module.tools.map((tool) => ({
    ...tool,
    moduleKey: module.key,
    moduleTitle: module.title,
    path: `${module.key}/${tool.key}`,
  }));
});
