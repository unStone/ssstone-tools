import { getCurrent } from '@tauri-apps/api/window';

import s from './index.module.css';

const Operators = () => {

  const onClose = async () => {
    await getCurrent()?.close()
  }

  const onMin = async () => {
    await getCurrent()?.minimize()
  }

  const onMax = async () => {
    const current = getCurrent();
    await current.isMaximized()? await current.unmaximize() : await current.maximize()
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

export default Operators