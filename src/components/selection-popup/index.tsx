import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';

import { writeClipboard } from 'utils/clipboard';
import s from './index.module.css';

interface PopupState {
  show: boolean;
  text: string;
  x: number;
  y: number;
}

const INITIAL_STATE: PopupState = {
  show: false,
  text: '',
  x: 0,
  y: 0,
};

const SelectionPopup = () => {
  const [state, setState] = useState<PopupState>(INITIAL_STATE);

  const hide = () => {
    setState((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const onMouseUp = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (!selection || !text || selection.rangeCount === 0) {
        hide();
        return;
      }

      const anchorNode = selection.anchorNode;
      const element = (anchorNode?.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode) as HTMLElement | null;
      if (element && ['INPUT', 'TEXTAREA'].includes(element.tagName)) {
        hide();
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setState({
        show: true,
        text,
        x: Math.max(10, Math.min(rect.left + rect.width / 2 - 90, window.innerWidth - 330)),
        y: Math.max(10, rect.bottom + 10),
      });
    };

    const onSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) {
        hide();
      }
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('selectionchange', onSelectionChange);
    window.addEventListener('scroll', hide, true);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('selectionchange', onSelectionChange);
      window.removeEventListener('scroll', hide, true);
    };
  }, []);

  const textView = useMemo(() => {
    if (state.text.length > 120) {
      return `${state.text.slice(0, 120)}...`;
    }
    return state.text;
  }, [state.text]);

  const onCopy = async () => {
    const [_, error, msg] = await writeClipboard(state.text);
    if (error) {
      message.error(msg);
      return;
    }

    message.success('已复制划词内容');
    hide();
  };

  if (!state.show) {
    return null;
  }

  return (
    <div
      className={s.popup}
      style={{ left: state.x, top: state.y }}
      onMouseDown={(event) => event.preventDefault()}
    >
      <div className={s.text}>{textView}</div>
      <div className={s.actions}>
        <button type="button" className={`${s.button} ${s.secondary}`} onClick={hide}>关闭</button>
        <button type="button" className={s.button} onClick={onCopy}>复制</button>
      </div>
    </div>
  );
};

export default SelectionPopup;
