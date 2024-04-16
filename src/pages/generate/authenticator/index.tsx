import { Button } from "antd";
import { useState } from "react";
import Store from "store/index";

import CreateItem from './create-item'
import Item from './item';
import { Values } from './types';
import { defaultCreateData } from './constant';

const STORE_KEY = 'generate/authenticator';
const store = new Store(STORE_KEY);

function Authenticator() {
  const [items, setItems] = useState<Values[]>(store.getData('authenticator') || []);
  const [open, setOpen] = useState(false);

  const onCreate = (values: Values) => {
    setOpen(false);
    const itemList = [...items, values];
    setItems(itemList);
    store.setData({ authenticator: itemList })
  };

  const onDelete = (index: number) => {
    const itemList = [...items];
    itemList.splice(index, 1);
    setItems(itemList);
    store.setData({ authenticator: itemList })

  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>新增</Button>
      {
        items?.map((item, index) => <Item data={item} onDelete={() => {onDelete(index)}} />)
      }
      <CreateItem
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={defaultCreateData()}
      />
    </div>
  );
}

export default Authenticator;
