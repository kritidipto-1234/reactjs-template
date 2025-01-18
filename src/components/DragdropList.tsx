import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles/DragdropList.module.scss';

const DragdropContext = React.createContext<{
    isDragging: boolean,
    setIsDragging: (isDragging: boolean) => void,
    registerContainer: (addItem: Function, removeItem: Function) => number,
    unregisterContainer: (containerid: number) => void,
    containers: {id: number, addItem: Function, removeItem: Function}[]
}>({
    isDragging: false,
    setIsDragging: (isDragging: boolean) => {},
    registerContainer: (addItem: Function, removeItem: Function):number => 0,
    unregisterContainer: (containerid: number) => {},
    containers: [{id: 0, addItem: (i:any)=>{}, removeItem: (i:any)=>{}}]
});

function Dragdrop({ children }: { children: React.ReactNode }) {
    const [isDragging, setIsDragging] = useState(false);
    const [containers, setContainers] = useState<Array<{id: number, addItem: Function, removeItem: Function}>>([]);

    const registerContainer = useCallback((addItem: Function, removeItem: Function):number => {
        const containerid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        setContainers(containers=>[...containers, {id: containerid, addItem, removeItem}]);
        return containerid;
    }, []);

    const unregisterContainer = useCallback((containerid: number) => {
        setContainers(containers=>containers.filter(container => container.id !== containerid));
    }, []);

    return (
        <DragdropContext.Provider value={{isDragging,  setIsDragging, registerContainer, unregisterContainer,containers: containers }}>
            <div>
                {children}
            </div>
        </DragdropContext.Provider>
    )
}

const DropdownContainerContext = React.createContext({
    containerid: 0,
});

Dragdrop.Container  = function Container<T>({ children, addItem , removeItem }: { children: React.ReactElement, addItem: (item: T) => any, removeItem: (item: T) => any }) {

    const { setIsDragging, registerContainer, unregisterContainer,containers } = React.useContext(DragdropContext);
    const [containerid, setContainerid] = useState(0);

    useEffect(() => {
        const id = registerContainer(addItem, removeItem);
        setContainerid(id);
        return () => unregisterContainer(id);
    }, [registerContainer, unregisterContainer, addItem, removeItem]);

    function onDrop(event: React.DragEvent<HTMLDivElement>) {
        setIsDragging(false);
        setIsDraggedOver(false);
        const data = JSON.parse(event.dataTransfer.getData('source'));
        const sourceContainer = containers.find(container => container.id === data.containerid);
        if (sourceContainer?.id === containerid) return;
        addItem(data.item);
        if (sourceContainer) {
            sourceContainer.removeItem(data.item);
        }
    }

    const [isDraggedOver, setIsDraggedOver] = useState(false);

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        setIsDraggedOver(true);
    }

    function onDragEnter(event: React.DragEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) return;
        setIsDraggedOver(true);
    }

    function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) return;
        setIsDraggedOver(false);
    }
    
    return <DropdownContainerContext.Provider value={{containerid: containerid}}>
        {React.cloneElement(children, { 
            onDrop, 
            onDragEnter, 
            onDragLeave, 
            onDragOver,
            className: `${styles.dragdropContainer} ${children.props.className} ${isDraggedOver ? styles.draggedOver : ''}`
        })}
    </DropdownContainerContext.Provider>;
}

Dragdrop.Item = function Item({ children , data }: { children: React.ReactElement, data: any }) {
    const { isDragging, setIsDragging } = React.useContext(DragdropContext);
    const [isGettingDragged, setIsGettingDragged] = useState(false);
    const { containerid } = React.useContext(DropdownContainerContext);

    function onDragStart(event: React.DragEvent<HTMLDivElement>) {
        setIsDragging(true);
        setIsGettingDragged(true);
        // requestAnimationFrame(() => setIsGettingDragged(true));
        event.dataTransfer.setData('source', JSON.stringify({item: data, containerid: containerid}));
    }

    function onDragEnd(event: React.DragEvent<HTMLDivElement>) {
        setIsDragging(false);
        setIsGettingDragged(false);
    }

    return <>
    {React.cloneElement(children, { 
        draggable: true, 
        onDragStart, 
        onDragEnd,
        className: `${styles.dragdropItem} ${children.props.className} ${isDragging && !isGettingDragged ? styles.dragging : ''} ${isGettingDragged ? styles.beingDraggedOver : ''}`
    })}</>
}

export default Dragdrop;