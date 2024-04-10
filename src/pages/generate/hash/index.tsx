import { Input } from "antd";
import { useState } from "react";
import CryptoJS from "crypto-js";
// import sha1 from "crypto-js/sha1"
// import sha256 from "crypto-js/sha256"
// import sha512 from "crypto-js/sha512"

const { TextArea } = Input;

function Hash() {
  const [input, setInput] = useState<string>();

  const onChangeJsonInput = (e: any) => {
    setInput(e.target.value);
  };

  console.log('input', input)

  return (
    <div>
      <TextArea
          style={{ width: "100%" }}
          rows={4}
          onChange={onChangeJsonInput}
          placeholder="请输入..."
        />
        <h3>md5</h3>
        <div>{CryptoJS.MD5(input).toString()}</div>
        <h3>sh1</h3>
        <div>{CryptoJS.SHA1(input).toString()}</div>
        <h3>sh256</h3>
        <div>{CryptoJS.SHA256(input).toString()}</div>
        <h3>sh512</h3>
        <div>{CryptoJS.SHA512(input).toString()}</div>
    </div>
  );
}

export default Hash;
