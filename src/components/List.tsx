import { useCallback, useState } from 'react';
import Dragdrop from './DragdropList';
import styles from  './styles/List.module.scss';

type ListProps = {
    list: Array<{
        title: string;
        color: string;
        id: number;
    }>
};

function List({ list }: ListProps) {

    const [items, setItems] = useState<Array<{ title: string; color: string; id: number }>>(list);
    const addItem = useCallback((item: any) => {
        setItems((items) => [...items, item]);
    }, []);
    const removeItem = useCallback((item: any) => {
        setItems((items) => {
            debugger;
            return items.filter((i) => i.id !== item.id).slice();
        });
    }, []);

    return (
    <Dragdrop.Container addItem={addItem} removeItem={removeItem}>
        <div className={styles.List}>
        {items.map((item) => (
            <Dragdrop.Item data={item} key={item.id}>
                <div className={styles.List__item} style={{ backgroundColor: item.color }}>
                    {item.title}
                </div>
            </Dragdrop.Item>
        ))}
        </div>
    </Dragdrop.Container>
  )
}

export default List;