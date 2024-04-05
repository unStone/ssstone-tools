interface IStringItemProps {
    data: string;
}

const StringItem: React.FC<IStringItemProps> = ({ data }) => {
    return (
        <span style={{ paddingLeft: 20 }}>
            {data}
        </span>
    );
}

export default StringItem;
