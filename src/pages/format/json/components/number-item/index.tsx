import React from "react";

interface INumberItemProps {
    data: number;
}

const NumberItem: React.FC<INumberItemProps> = ({ data }) => {
    return (
        <span style={{ paddingLeft: 20 }}>
            {data}
        </span>
    );
}

export default NumberItem;