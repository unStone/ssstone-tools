import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';

export async function readClipboard() {
  try {
    await readText();
    return [null, '读取剪切板成功']
  } catch (error: any) {
    return [error, error.message]
  }
}

export async function writeClipboard(text: string) {
  console.log('copy: writeClipboard', text)
  try {
    await writeText(text);
    return [null, '复制成功']
  } catch (error: any) {
    return [error, error.message]
  }
}
