import React from "react";

interface IBooleanItemProps {
    data: boolean;
}

const BooleanItem: React.FC<IBooleanItemProps> = ({ data }) => {
    return (
        <span style={{ paddingLeft: 20 }}>
            {data ? "true": "false"}
        </span>
    );
}

export default BooleanItem;