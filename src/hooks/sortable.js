import { useState } from "react";

const setCss = (item, css) =>
  Object.keys(css).forEach((key) => (item.style[key] = css[key]));

export const useSortable = (
  data,
  listRef,
  itemsRef,
  separatorsRef,
  onReorder,
  transitionDuration
) => {
  const [active, setActive] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(data.map((d, i) => i));

  const onSortStart = (event) => {
    if (itemsRef.current.length < 2) return;

    if (event.type === "mousedown" && event.button > 0) return;
    if (event.type === "touchstart" && event.touches.length > 1) return;

    const list = listRef.current;
    if (list.classList.contains("is-sorting")) return;
    list.classList.add("is-sorting");

    setCss(list, {
      position: "relative",
      height: list.offsetHeight + "px",
      width: list.offsetWidth + "px",
    });

    const separators = separatorsRef.current
      .filter((ref) => ref.current)
      .map((ref, index) => {
        const separator = ref.current;
        return {
          index: index,
          separator: separator,
          left: separator.offsetLeft,
          top: separator.offsetTop,
          width: separator.offsetWidth,
          height: separator.offsetHeight,
        };
      });

    const items = itemsRef.current
      .filter((ref) => ref.current)
      .map((ref, index) => {
        const listItem = ref.current;
        return {
          index: index,
          listItem: listItem,
          left: listItem.offsetLeft,
          top: listItem.offsetTop,
          width: listItem.offsetWidth,
          height: listItem.offsetHeight,
          x: listItem.offsetLeft,
          y: listItem.offsetTop,
          dragged: listItem.contains(event.target),
        };
      });

    const dragged = items.find((item) => item.dragged);
    const spacing = items[1].top - (items[0].top + items[0].height);

    let curIndex = items.indexOf(dragged);
    let newOrder = items.map((item) => item.index);

    //---------------------------------------------------------------------------
    const onStartDrag = () => {
      separators.forEach((separator) =>
        setCss(separator.separator, {
          position: "absolute",
          width: `${separator.width}px`,
          height: `${separator.height}px`,
          left: `${separator.left}px`,
          //top: `${separator.top}px`,
          zIndex: 1,
        })
      );

      items.forEach((item) => {
        setCss(item.listItem, {
          position: "absolute",
          width: `${item.width}px`,
          height: `${item.height}px`,
          transform: `translateX(${item.x}px) translateY(${item.y}px)`,
          zIndex: 2,
        });

        setTimeout(() => {
          if (item.dragged) return;
          setCss(item.listItem, {
            transition: `transform ${transitionDuration}ms ease`,
          });
        }, 0);
      });

      setCss(dragged.listItem, { zIndex: 3 });
    };

    //---------------------------------------------------------------------------
    const onDrag = (delta) => {
      const draggX = dragged.left + delta.x;
      const draggY = dragged.top + delta.y;

      const dragIndex = items.reduce((acc, item) => {
        if (item.index === 0) return acc;
        const itemCenter = draggY + dragged.height / 2;
        const itemStart = item.top - spacing / 2;
        return (acc += itemCenter > itemStart ? 1 : 0);
      }, 0);

      if (dragIndex !== curIndex) {
        newOrder[dragIndex] = newOrder.splice(
          curIndex,
          1,
          newOrder[dragIndex]
        )[0];

        curIndex = dragIndex;

        newOrder.reduce((acc, index) => {
          const item = items[index];
          item.y = acc;
          setCss(item.listItem, {
            transform: `translateX(${item.x}) translateY(${item.y}px)`,
          });
          return (acc += item.height + spacing);
        }, 0);

        setCurrentOrder(
          newOrder.reduce((acc, cur, idx) => {
            acc[newOrder[idx]] = idx;
            return acc;
          }, [])
        );
      }

      setCss(dragged.listItem, {
        transform: `translateX(${draggX}px) translateY(${draggY}px)`,
      });
    };

    //---------------------------------------------------------------------------
    const onEndDrag = () => {
      setActive(null);

      setCss(dragged.listItem, {
        transition: `all ${transitionDuration}ms ease`, //all
        transform: `translateX(${dragged.x}) translateY(${dragged.y}px)`,
      });

      setTimeout(() => {
        list.style = null;
        list.classList.remove("is-sorting");
        items.forEach((item) => (item.listItem.style = null));
        separators.forEach((sep, idx) => (sep.separator.style = null));
        setCurrentOrder(items.map((item) => item.index));
        onReorder(
          items.reduce((acc, cur, idx) => {
            acc[idx] = data[newOrder[idx]];
            return acc;
          }, [])
        );
      }, transitionDuration);
    };

    //-----------------------------------------------------------------------------
    setActive(curIndex);
    drag(event, { onStartDrag, onDrag, onEndDrag });
  };

  return { active, currentOrder, onSortStart };
};

//------------------------------------------------------------------------------------
//Drag Function
const drag = (e, handlers) => {
  let startPosition;

  //---------------------------------------------------------------------------
  const getPosition = (e) => {
    const dragEvent = e.touches ? e.touches[0] || e.changedTouches[0] : e;
    return { x: dragEvent.pageX, y: dragEvent.pageY };
  };

  //---------------------------------------------------------------------------
  const onDragStart = (e) => {
    const currentPosition = getPosition(e);
    handlers.onStartDrag(startPosition);
    startPosition = currentPosition;
    const touch = e.type === "touchstart";
    window.addEventListener(touch ? "touchmove" : "mousemove", onDragMove, {
      passive: false,
    });
    window.addEventListener(touch ? "touchend" : "mouseup", onDragEnd, false);
  };

  //---------------------------------------------------------------------------
  const onDragMove = (e) => {
    const currentPosition = getPosition(e);
    const deltaPosition = {
      x: currentPosition.x - startPosition.x,
      y: currentPosition.y - startPosition.y,
    };
    handlers.onDrag(deltaPosition, currentPosition);
    e.preventDefault();
  };

  //---------------------------------------------------------------------------
  const onDragEnd = (e) => {
    const currentPosition = getPosition(e);
    handlers.onEndDrag(currentPosition);
    const touch = e.type === "touchend";
    window.removeEventListener(touch ? "touchmove" : "mousemove", onDragMove, {
      passive: false,
    });
    window.removeEventListener(
      touch ? "touchend" : "mouseup",
      onDragEnd,
      false
    );
  };

  onDragStart(e);
};
