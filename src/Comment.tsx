import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import styles from "./Comment.module.scss";

interface ConnectorPoints {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Connector = React.memo(React.forwardRef<HTMLDivElement, ConnectorPoints>(({ x1, y1, x2, y2 }, ref) => {
    // Calculate control points for the curve
    const midY = (y1 + y2) / 2;
    
    // Create an S-curved path using cubic Bezier
    const path = `M ${x1} ${y1} 
                  C ${x1} ${midY},
                    ${x2} ${midY},
                    ${x2} ${y2}`;

    return (
        <div className={styles.connector} ref={ref}>
            <svg style={{width: "100%", height: "100%"}}>
                <path 
                    d={path}
                    stroke="#88c0d0"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
        </div>
    );
}));

//custom hook to generate connector points between two elements with a common parent element
const useConnector = (parentRef?: React.RefObject<HTMLDivElement>, fromRef?: React.RefObject<HTMLDivElement>, toRef?: React.RefObject<HTMLDivElement>) => {
    const [connectorPoints, setConnectorPoints] = useState<ConnectorPoints>({x1: 0, y1: 0, x2: 0, y2: 0});

    const {lastRecalculatedAt, triggerRecalculation} = useContext(ConnectorContext);

    useEffect(() => {
        if (!parentRef || !fromRef || !toRef) return;
        const fromBox = fromRef.current!.getBoundingClientRect();
        const toBox = toRef.current!.getBoundingClientRect();
        const parentBox = parentRef.current!.getBoundingClientRect();

        // debugger;
        // Calculate absolute positions

        const parentTop = parentBox.top + parseInt(getComputedStyle(parentRef.current!).borderTopWidth  || "0");
        const parentLeft = parentBox.left + parseInt(getComputedStyle(parentRef.current!).borderLeftWidth || "0");
        const startX = fromBox.left +  fromBox.width / 2 - parentLeft;
        const startY = fromBox.top +  fromBox.height - parentTop;
        const endX = toBox.left   + toBox.width / 2 - parentLeft;
        const endY = toBox.top  - parentTop;
        setConnectorPoints({ x1: startX, y1: startY, x2: endX, y2: endY });
    }, [parentRef, fromRef, toRef, lastRecalculatedAt]);

    return {connectorPoints, triggerRecalculation};
}

const Comment: React.FC<{ isTop?: boolean, data: Reply, parentRef?: React.RefObject<HTMLDivElement>, fromRef?: React.RefObject<HTMLDivElement> }> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toRef = useRef<HTMLDivElement>(null);
    const myContainerRef = useRef<HTMLDivElement>(null);
    const { data, parentRef, fromRef } = props;

    const {connectorPoints, triggerRecalculation} = useConnector(parentRef, fromRef, toRef);
    
    const collapseToggle = () => {
        setIsCollapsed(e => !e);
        triggerRecalculation();
    }

    return (
        <>
            {parentRef?.current && connectorPoints.x1 !== 0 && <Connector x1={connectorPoints.x1} y1={connectorPoints.y1} x2={connectorPoints.x2} y2={connectorPoints.y2} />}
            <div  className={styles.Comment +` ` + (props.isTop ? styles.top : "")} ref={myContainerRef}>
                <div className={styles.authorData + ` ` + (!data.replies?.length ? styles.notClickable : "") } onClick={collapseToggle} ref={toRef}>
                    <img src={data.author.avatar} />
                    <span>{data.author.name}</span>
                </div>
                <div className={styles.content + ` ` + (isCollapsed || !data.replies?.length ? styles.collapsed  : "")}>
                {
                    data.replies?.map((c, i) => i<3 && <Comment parentRef={myContainerRef} fromRef={toRef} data={c} key={i} />)  
                }
                </div>
            </div>
        </>
    );
}

const ConnectorContext  = createContext({
    lastRecalculatedAt: 0,
    triggerRecalculation: () => {}
})

const CommentTree : React.FC<{ data: Reply }> = (props) => {
    const [lastRecalculatedAt, setLastRecalculatedAt] = useState(() => Date.now());
    const triggerRecalculation = () => setLastRecalculatedAt(Date.now()); //forcing state update to trigger recalculation
    
    return (
        <ConnectorContext.Provider value={{ lastRecalculatedAt, triggerRecalculation }}>
            <Comment isTop={true} data={props.data} />
        </ConnectorContext.Provider>
    );
};

export default CommentTree;
