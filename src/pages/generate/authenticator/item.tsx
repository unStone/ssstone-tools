import { Card, message, Progress } from "antd";
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProgressProps } from 'antd';
import { Values } from './types'
import { writeClipboard } from 'utils/clipboard';
import useProgres from "./hooks/useProgres";


const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const { Meta } = Card;

interface IItemProps {
  data: Values;
  onDelete: () => void;
}

const Item: React.FC<IItemProps> = ({ data, onDelete }) => {
const { issuingParty='', userName='' } = data;
const { dynamicCode, percent } = useProgres(data);


  const onCopy = async () => {
    const [_, error, msg] = await writeClipboard(dynamicCode);
    if (error) {
      message.error(msg);
    } else {
      message.success(msg);
    }
  }

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <Progress 
          type="circle"
          trailColor="#e6f4ff"
          percent={percent}
          strokeWidth={20}
          size={14}
          strokeColor={twoColors}
          showInfo={false}
        />,
        <CopyOutlined onClick={onCopy} />,
        <DeleteOutlined onClick={onDelete} />
      ]}
    >
      <Meta
        title={dynamicCode}
        description={`${issuingParty} ${userName}`}
      />
    </Card>
  );
}

export default Item;
