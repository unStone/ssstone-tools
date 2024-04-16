import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Collapse } from 'antd';
import type { CollapseProps, FormInstance } from 'antd';

import { Values, Digit } from './types';

const digitOptions = [{
  label: Digit.Six,
  value: Digit.Six,
}, {
  label: Digit.Night,
  value: Digit.Night,
}]

interface ICreateModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  initialValues: Values;
}

const CreateModal: React.FC<ICreateModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues
}) => {
    const [form] = Form.useForm();
    const [formInstance, setFormInstance] = useState<FormInstance>();
    useEffect(() => {
      form.setFieldsValue(initialValues);
      setFormInstance(form)
    }, []);

    const items: CollapseProps['items'] = [
      {
        key: 'advancedOptions',
        label: '高级选项',
        children: <p>
          <Form.Item name="userName" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="cycle" label="周期">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="digit" label="位数">
            <Select options={digitOptions}  />
          </Form.Item>
          <Form.Item name="algorithm" label="算法">
            <Input />
          </Form.Item>
        </p>,
      },
    ];


    return (
      <Modal
        open={open}
        title="创建身份验证器"
        okText="创建"
        cancelText="取消"
        okButtonProps={{ autoFocus: true }}
        onCancel={onCancel}
        destroyOnClose
        onOk={async () => {
          try {
            const values = await formInstance?.validateFields();
            formInstance?.resetFields();
            onCreate(values);
          } catch (error) {
            console.log('Failed:', error);
          }
        }}
      >
        <Form layout="horizontal" form={form} name="form_in_modal" initialValues={initialValues}>
          <Form.Item
            name="issuingParty"
            label="签发方"
          >
            <Input />
          </Form.Item>
          <Form.Item name="secretKey" label="密钥" rules={[{ required: true, message: '请输入密钥' }]}>
            <Input />
          </Form.Item>
          <Collapse defaultActiveKey={[]} ghost items={items} />
        </Form>
      </Modal>
    );
};

export default CreateModal;