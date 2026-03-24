import { getCurrentWindow } from '@tauri-apps/api/window';

import s from './index.module.css';

const Operators = () => {
  const onClose = async () => {
    await getCurrentWindow().close();
  }

  const onMin = async () => {
    await getCurrentWindow().minimize();
  }

  const onMax = async () => {
    const current = getCurrentWindow();
    const maximized = await current.isMaximized();

    if (maximized) {
      await current.unmaximize();
      return;
    }

    await current.maximize();
  }

  return (
    <div className={s.operators} data-tauri-drag-region>
      <div className={s.iconBox}>
        <div className={`${s.icon} ${s.close}`} onClick={onClose} />
      </div>
      <div className={s.iconBox}>
        <div className={`${s.icon} ${s.min}`} onClick={onMin} />
      </div>
      <div className={s.iconBox}>
        <div className={`${s.icon} ${s.max}`} onClick={onMax} />
      </div>
    </div>
  )
}

export default Operators;
