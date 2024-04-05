
import { Col, Row, Input } from 'antd';
import { useState } from 'react';

import { TJsonType } from './types';
import { getJsonType } from './utils';
import Item from './components/item';

const { TextArea } = Input;

function Json() {
    const [jsonData, setJsonData] = useState<unknown>('');
    const [jsonType, setJsonType] = useState<TJsonType>('string');
    
    const onChangeJsonInput = (e: any) => {
        try {
            const json = JSON.parse(e.target.value);
            setJsonData(json);
            setJsonType(getJsonType(json));
        } catch (error) {
            console.error(error);
            setJsonData(e.target.value)
            setJsonType(getJsonType(e.target.value));
        }
    };

    return (
        <div>
            <Row>
                <Col span={12}>
                    <TextArea
                        style={{ height: '100vh', width: '100%' }}
                        onChange={onChangeJsonInput}
                        placeholder="请输入json数据..."
                    />
                </Col>
                <Col span={12}>
                    <Item type={jsonType} data={jsonData} />
                </Col>
            </Row>
        </div>
    );
}

export default Json;
