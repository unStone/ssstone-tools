import React from "react";

import Item from "../item";
import { getJsonType } from "../../utils";

interface IArrayItemProps {
    data: Array<unknown>;
}

const ArrayItem: React.FC<IArrayItemProps> = ({ data }) => {
    return (
        <div style={{ paddingLeft: 20 }}>
            {data.map((item, index) => {
                return (
                    <div key={index}>
                        <Item type={getJsonType(item)} data={item} />
                    </div>
                );
            })}
        </div>
    );
}

export default ArrayItem;