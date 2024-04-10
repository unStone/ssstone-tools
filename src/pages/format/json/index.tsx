import { Col, Row, Input } from "antd";
import { useState } from "react";
import ReactJson from "react-json-view";

const { TextArea } = Input;

function Json() {
  const [jsonData, setJsonData] = useState<object>();

  const onChangeJsonInput = (e: any) => {
    try {
      const json = JSON.parse(e.target.value);
      setJsonData(json);
    } catch (error) {
      setJsonData(e.target.value);
    }
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <TextArea
            style={{ height: "100vh", width: "100%" }}
            onChange={onChangeJsonInput}
            placeholder="请输入json数据..."
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
