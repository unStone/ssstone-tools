import StringItem from "../string-item";
import ArrayItem from "../array-item";
import ObjectItem from "../object-item";
import NumberItem from "../number-item";
import BooleanItem from "../boolean-item";

import { TJsonType } from "../../types";

interface IItemProps {
    type: TJsonType;
    data: unknown;
}

const Item: React.FC<IItemProps> = ({ type, data }) => {
    switch (type) {
        case'string':
            return <StringItem data={data as string} />;
        case'boolean':
            return <BooleanItem data={data as boolean} />;
        case 'number':
            return <NumberItem data={data as number} />;
        case 'object':
            return <ObjectItem data={data as object} />;
        case 'array':
            return <ArrayItem data={data as unknown[]} />;
        default:
            return <StringItem data={data as any} />;
    }
}

export default Item;