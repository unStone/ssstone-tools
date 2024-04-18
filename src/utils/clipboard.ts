import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';

export const readClipboard: () => Promise<[string | null, Error | null, string]> = async () => {
  try {
    const res = await readText();
    return [res, null, '读取剪切板成功']
  } catch (error: any) {
    return [null, error, error.message]
  }
}

export const writeClipboard: (text: string) => Promise<[void | null, Error | null, string]> = async (text) => {
  try {
    const res = await writeText(text);
    return [res, null, '复制成功']
  } catch (error: any) {
    return [null, error, error.message]
  }
}
