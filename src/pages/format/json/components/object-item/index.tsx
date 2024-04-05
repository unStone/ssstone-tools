import React from "react";

import Item from "../item";
import { getJsonType } from "../../utils";


interface IObjectItemProps {
    data: {
      [key: string]: unknown;
    };
}

const ObjectItem: React.FC<IObjectItemProps> = ({ data }) => {
  const keys = Object.keys(data);

  return (
    <div style={{ paddingLeft: 20 }}>
      {keys.map((item, index) => {
        const value = data[item];
        return (
          <div key={index}>
            {item}: <Item type={getJsonType(value)} data={value} />
          </div>
        );
      })}
    </div>
  );
}

export default ObjectItem;
