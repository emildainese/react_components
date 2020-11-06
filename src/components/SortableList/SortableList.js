import React, { useRef } from "react";
import { useSortable } from "../../hooks/sortable";
import ListItem from "./ListItem/ListItem";
import Separator from "./Separator/Separator";
import classes from "./SortableList.module.scss";

const SortableList = (props) => {
  const listRef = useRef(null);
  const separatorsRef = useRef(props.data.map(() => React.createRef()));
  const itemsRef = useRef(props.data.map(() => React.createRef()));

  const { active, currentOrder, onSortStart } = useSortable(
    props.data,
    listRef,
    itemsRef,
    separatorsRef,
    props.onReorder,
    props.transitionDuration ? props.transitionDuration : 300
  );

  return (
    <div ref={listRef} className={classes.SortableList}>
      {props.data.map((item, idx) => {
        return (
          <DraggableItem
            key={idx}
            onMouseDown={onSortStart}
            onTouchStart={onSortStart}
            itemRef={itemsRef.current[idx]}
          >
            <ListItem
              data={item}
              idx={currentOrder[idx]}
              active={active === idx}
            />
            {props.separator && (
              <Separator separatorRef={separatorsRef.current[idx]} />
            )}
          </DraggableItem>
        );
      })}
    </div>
  );
};

const DraggableItem = (props) => {
  return (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      ref={props.itemRef}
      className={classes.DraggableItem}
    >
      {props.children}
    </div>
  );
};

export default SortableList;
