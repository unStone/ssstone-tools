import { writeClipboard } from 'utils/clipboard';

interface ICopyButtonProps {
  value: string;
  onCallback?: (res: void | null, error: Error | null, msg: string) => void;
}

const CopyButton: React.FC<ICopyButtonProps> = ({ value, onCallback }) => {
  const onCopy = async () => {
    const [res, error, msg] = await writeClipboard(value);
    onCallback?.(res, error, msg);
  }

  return <button onClick={onCopy}>复制</button>
}

export default CopyButton;