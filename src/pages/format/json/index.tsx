import { Col, Row, Input } from "antd";
import { useState } from "react";
import ReactJson from "react-json-view";
import Store from 'store/index';

const { TextArea } = Input;

const STORE_KEY = 'format/json';
const jsonStore = new Store(STORE_KEY);

function Json() {
  const [jsonData, setJsonData] = useState<object>(jsonStore.getData('jsonData') || {});

  const onChangeJsonInput = (e: any) => {
    let value = e.target.value;
    try {
      value = JSON.parse(e.target.value);
    } catch (error) {}

    setJsonData(value);
    jsonStore.setData({ jsonData: value })
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <TextArea
            style={{ height: "100vh", width: "100%" }}
            onChange={onChangeJsonInput}
            placeholder="请输入json数据..."
            defaultValue={JSON.stringify(jsonData) || ''}
          />
        </Col>
        <Col span={12}>
          <ReactJson src={jsonData!} />
        </Col>
      </Row>
    </div>
  );
}

export default Json;
