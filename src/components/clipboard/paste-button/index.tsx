import { readClipboard } from 'utils/clipboard';

interface IPasteButtonProps {
  onCallback: (res: string | null, error: Error | null, msg: string) => void;
}

const PasteButton: React.FC<IPasteButtonProps> = ({ onCallback }) => {
  const onPaste = async () => {
    const [res, error, msg] = await readClipboard();
    onCallback(res, error, msg);
  }

  return <button onClick={onPaste}>粘贴</button>
}

export default PasteButton;