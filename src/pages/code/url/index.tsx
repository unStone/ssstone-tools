import { ChangeEventHandler, useState } from "react"
import Store from 'store/index';
import CopyButton from "components/clipboard/copy-button";
import PasteButton from "components/clipboard/paste-button";

import s from './index.module.css';

const STORE_KEY = 'format/json';
const jsonStore = new Store(STORE_KEY);

const Url = () => {
  const [encodeUrl, setEncodeUrl] = useState(jsonStore.getData('encodeUrl') || '');
  const [decodeUrl, setDecodeUrl] = useState(jsonStore.getData('decodeUrl') || '');

  const setEncodeUrlValue = (value: string | null) => {
    setEncodeUrl(value || '');

    let currentValue = value || '';
    try {
      currentValue = decodeURIComponent(value || '');
    } catch (e) {
      console.error(e);
    }
    setDecodeUrl(currentValue);
    jsonStore.setData({ encodeUrl: value || '', decodeUrl: currentValue })
  }

  const setDecodeUrlValue = (value: string | null) => {
    setDecodeUrl(value || '');

    let currentValue = value || '';
    try {
      currentValue = encodeURIComponent(value || '');
    } catch (e) {
      console.error(e);
    }
    setEncodeUrl(currentValue);
    jsonStore.setData({ encodeUrl: currentValue || '', decodeUrl: value || '' })

  }

  const onChangeEncodeUrl: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setEncodeUrlValue(e.target.value);
  }

  const onChangeDecodeUrl: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDecodeUrlValue(e.target.value);
  }

  return (
    <div>
      <p>解码<CopyButton value={decodeUrl} /><PasteButton onCallback={setDecodeUrlValue} /></p>
      <textarea className={s.textarea} value={decodeUrl} onChange={onChangeDecodeUrl}/>
      <p>编码<CopyButton value={encodeUrl} /><PasteButton onCallback={setEncodeUrlValue} /></p>
      <textarea className={s.textarea} value={encodeUrl} onChange={onChangeEncodeUrl}/>
    </div>
  )
}

export default Url;
