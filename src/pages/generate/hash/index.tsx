import { Input } from "antd";
import { ChangeEventHandler, useState } from "react";
import MD5 from "crypto-js/md5"
import SHA1 from "crypto-js/sha1"
import SHA256 from "crypto-js/sha256"
import SHA512 from "crypto-js/sha512"
import Store from "store/index";

const { TextArea } = Input;

const STORE_KEY = 'generate/hash';
const store = new Store(STORE_KEY);

function Hash() {
  const [input, setInput] = useState<string>(store.getData('input') || '');

  const onChangeJsonInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput(e.target.value);
    store.setData({ input: e.target.value });
  };

  return (
    <div>
      <TextArea
          style={{ width: "100%" }}
          rows={4}
          onChange={onChangeJsonInput}
          placeholder="请输入..."
          defaultValue={input}
        />
        <h3>md5</h3>
        <div>{MD5(input).toString()}</div>
        <h3>sh1</h3>
        <div>{SHA1(input).toString()}</div>
        <h3>sh256</h3>
        <div>{SHA256(input).toString()}</div>
        <h3>sh512</h3>
        <div>{SHA512(input).toString()}</div>
    </div>
  );
}

export default Hash;
